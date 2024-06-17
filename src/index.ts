import { writeFile } from 'node:fs/promises';
import { Transform, pipeline } from 'node:stream';
import readline from 'node:readline/promises';
import { createReadStream, createWriteStream } from 'node:fs';

import Big from 'big.js';
import winston from 'winston';

import type { Logger } from 'winston';

function CSVParser(this: CSVParser): CSVParser {
  // to calculate total expensures of a customer without re-reading the file
  this.customersSpents = new Map();
  this.initLogger();
  return this;
}

CSVParser.prototype.initLogger = function (this: CSVParser) {
  this.logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.json(),
    defaultMeta: { service: 'csv-parser' },
/*
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
*/
  });
  if (process.env.NODE_ENV !== 'production') {
    this.logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
  }
};

CSVParser.prototype.PRODUCTS_CSV =
  <string>process.env.PRODUCTS_CSV ?? './data/products.csv';
CSVParser.prototype.CUSTOMERS_CSV =
  <string>process.env.CUSTOMERS_CSV ?? './data/customers.csv';
CSVParser.prototype.ORDERS_CSV =
  <string>process.env.ORDERS_CSV ?? './data/orders.csv';
CSVParser.prototype.OUT_TOTAL_ORDERS =
  <string>process.env.OUT_TOTAL_ORDERS ?? './data/order_prices.csv';
CSVParser.prototype.CUSTOMER_PRODUCTS =
  <string>process.env.CUSTOMER_PRODUCTS ?? './data/product_customers.csv';
CSVParser.prototype.CUSTOMER_RANKING =
  <string>process.env.CUSTOMER_RANKING ?? './data/customer_ranking.csv';
CSVParser.prototype.CURRENCY_DECIMALS = process.env.CURRENCY_DECIMALS
  ? parseInt(process.env.CURRENCY_DECIMALS)
  : 16;

CSVParser.prototype.errLog = function (this: CSVParser, error: Error) {
  this.logger.error(error.message);
};

// helper, creates a Map with the products ids as keys and { name, price } as value
CSVParser.prototype.readProducts = async function (this: CSVParser) {
  const products = new Map();
  const readable = createReadStream(this.PRODUCTS_CSV);
  const rl = readline.createInterface({
    input: readable,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    if (line.includes('id') || !line) continue;
    const [id, name, price] = line.split(',');
    const roundedPrice = new Big(price).round(this.CURRENCY_DECIMALS);
    products.set(parseInt(id), { name, price: roundedPrice });
  }
  return products;
};

CSVParser.prototype.ordersTransform = function (
  this: CSVParser,
  mappedProducts: Map<number, Record<string, string | Big>>,
) {
  const customersSpents = this.customersSpents;
  return new Transform({
    transform(chunk, encoding, callback) {
      const str = chunk.toString();
      const isFirstLine = str.toLowerCase().includes('id');
      if (isFirstLine) {
        callback(null, 'id,euros\n');
        return;
      }
      const [orderId, customerId, productsStr] = str.split(',');
      const products = productsStr.split(' ');
      let cost = Big(0.0);
      for (const productId of products) {
        cost = cost.add(mappedProducts.get(parseInt(productId))?.price as Big);
      }
      const cId = parseInt(customerId);
      const customerSpent = Big(customersSpents.get(cId) ?? 0.0).add(cost);
      customersSpents.set(cId, customerSpent);
      callback(null, `${orderId},${cost.toNumber()}\n`);
    },
  });
};

// - reads products and creates a map with their info
// - streams orders.csv line by line, parses the line, extracts
// product ids for each order and calculates the total price by using
// first step's data
// - writes the calculated data to a file, line by line
CSVParser.prototype.processOrders = function (this: CSVParser) {
  this.logger.log('info', `${new Date().toISOString()} processing orders.csv`);
  return this.readProducts().then((products) => {
    const readable = createReadStream(this.ORDERS_CSV);
    const rl = readline.createInterface({
      input: readable,
      crlfDelay: Infinity,
    });
    const calcPrice = this.ordersTransform(products);
    const writable = createWriteStream(this.OUT_TOTAL_ORDERS);
    return new Promise((resolve, reject) => {
      pipeline(rl, calcPrice, writable, (err) => {
        if (err) reject(err);
        this.logger.log('info', 'finished processing orders.csv');
        resolve();
      });
    });
  });
};

CSVParser.prototype.customerProducts = async function (this: CSVParser) {
  const res = new Map();
  const readable = createReadStream(this.ORDERS_CSV);
  const rl = readline.createInterface({
    input: readable,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    if (line.includes('id') || !line) continue;
    const [, customerId, orderProducts] = line.split(',');
    for (const product of orderProducts.split(' ')) {
      const pId = parseInt(product);
      const existingCustomers = res.get(pId);
      if (existingCustomers?.includes(customerId)) continue;
      const line = existingCustomers
        ? `${customerId} ${existingCustomers}`
        : customerId.toString();
      res.set(pId, line);
    }
  }
  let text = 'id,customer_ids\n';
  for (const entry of res.entries()) {
    text += `${entry[0]},${entry[1]}\n`;
  }
  return writeFile(this.CUSTOMER_PRODUCTS, text);
};

CSVParser.prototype.customerRanking = async function (this: CSVParser) {
  this.logger.log('info', 'processing customers.csv to calculate rankings');
  const readable = createReadStream(this.CUSTOMERS_CSV);
  const rl = readline.createInterface({
    input: readable,
    crlfDelay: Infinity,
  });
  const cInfo = [];
  for await (const line of rl) {
    if (line.toLowerCase().includes('id') || !line) {
      continue;
    }
    const [id, firstname, lastname] = line.split(',');
    const customerSpent = this.customersSpents.get(parseInt(id)) ?? 0.0;
    cInfo.push([parseInt(id), Big(customerSpent), firstname, lastname]);
    this.customersSpents.delete(parseInt(id));
  }

  this.logger.log('info', `writing rankings to ${this.CUSTOMER_RANKING}`);
  cInfo.sort((a, b) => (b[1] as Big).minus(a[1]).toNumber());
  const output =
    'id,firstname,lastname,total_euros\n' +
    cInfo.map((a) => `${a[0]},${a[1]},${a[2]},${a[3]}`).join('\n');
  return writeFile(this.CUSTOMER_RANKING, output)
    .then(() => {
      this.logger.log('info', `${new Date().toISOString()} done`);
    });
};

declare class CSVParser {
  PRODUCTS_CSV: string;
  CUSTOMERS_CSV: string;
  ORDERS_CSV: string;
  OUT_TOTAL_ORDERS: string;
  CUSTOMER_PRODUCTS: string;
  CUSTOMER_RANKING: string;
  CURRENCY_DECIMALS: number;
  logger: Logger;
  customersSpents: Map<number, Big>;
  readProducts: () => Promise<Map<number, Record<string, string | Big>>>;
  processOrders: () => Promise<void>;
  ordersTransform: (
    mappedProducts: Map<number, Record<string, string | Big>>,
  ) => Transform;
  customerProducts: () => Promise<void>;
  customerRanking: () => Promise<void>;
  roundPrice: (price: string | number) => number;
  errLog: (error: Error) => void;
  initLogger: () => void;
}

export { CSVParser };
