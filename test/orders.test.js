import { expect } from 'chai';
import { generateOrderPrices } from '../scripts/orders.js';
import fs from 'fs';

// simple test to generate the order prices correctly based on the expected data
describe('Order Prices', () => {
  it('should generate order prices correctly', async () => {
    const ordersPath = './test/data/orders.csv';
    const productsPath = './test/data/products.csv';
    const outputPath = './test/data/order_prices.csv';

    await generateOrderPrices(ordersPath, productsPath, outputPath);

    const output = fs.readFileSync(outputPath, 'utf8');
    const expected = fs.readFileSync('./test/expected/order_prices.csv', 'utf8');

    expect(output).to.equal(expected);
  });
});
