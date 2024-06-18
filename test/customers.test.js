import { expect } from 'chai';
import { generateCustomerRanking } from '../scripts/customers.js';
import fs from 'fs';

// simple test to generate the customer ranking correctly based on the expected data
describe('Customer Ranking', () => {
  it('should generate customer ranking correctly', async () => {
    const ordersPath = './test/data/orders.csv';
    const productsPath = './test/data/products.csv';
    const customersPath = './test/data/customers.csv';
    const outputPath = './test/data/customer_ranking.csv';

    await generateCustomerRanking(ordersPath, productsPath, customersPath, outputPath);

    const output = fs.readFileSync(outputPath, 'utf8');
    const expected = fs.readFileSync('./test/expected/customer_ranking.csv', 'utf8');

    expect(output).to.equal(expected);
  });
});
