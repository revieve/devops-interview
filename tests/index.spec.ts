
import { CSVParser } from '../src/index';

describe('End to end', () => {
  test('Updates CSVs', () => {
    const ex = new CSVParser();
    ex.OUT_TOTAL_ORDERS = './data/test_order_prices.csv';
    ex.CUSTOMER_PRODUCTS = './data/test_product_customers.csv';
    ex.CUSTOMER_RANKING = './data/test_customer_ranking.csv';
    return ex.processOrders()
      .then(() => ex.customerProducts())
      .then(() => ex.customerRanking());
  });
  test('Nonexistent directory for order_prices.csv', () => {
    const ex = new CSVParser();
    ex.OUT_TOTAL_ORDERS = './data1/test_order_prices.csv';
    return expect(ex.processOrders()).rejects.toThrow()
  });
  test('Nonexistent directory for product_costumers.csv', () => {
    const ex = new CSVParser();
    ex.OUT_TOTAL_ORDERS = './data/test_order_prices.csv';
    ex.CUSTOMER_PRODUCTS = './data1/test_product_customers.csv';
    const promise = ex.processOrders().then(() => ex.customerProducts())
    return expect(promise).rejects.toThrow()
  });
  test('Github actions script', () => {
    return import('../src/github-actions')
  });
});
