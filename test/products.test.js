import { expect } from 'chai';
import { generateProductCustomers } from '../scripts/products.js';
import fs from 'fs';

// simple test to generate the product customers correctly based on the expected data
describe('Product Customers', () => {
  it('should generate product customers correctly', async () => {
    const ordersPath = './test/data/orders.csv';
    const outputPath = './test/data/product_customers.csv';

    await generateProductCustomers(ordersPath, outputPath);

    const output = fs.readFileSync(outputPath, 'utf8');
    const expected = fs.readFileSync('./test/expected/product_customers.csv', 'utf8');

    expect(output).to.equal(expected);
  });
});
