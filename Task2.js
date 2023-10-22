const fs = require('fs');
const csv = require('csv-parser');

const productCustomers = {};

// Read data from orders.csv
fs.createReadStream('orders.csv')
  .pipe(csv())
  .on('data', (data) => {
    const orderProductIds = data.products.split(' ');
    const customerId = data.customer;

    orderProductIds.forEach((productId) => {
      if (!productCustomers[productId]) {
        productCustomers[productId] = new Set();
      }
      productCustomers[productId].add(customerId);
    });
  })
  .on('end', () => {
    // Create product_customers.csv
    fs.writeFile('product_customers.csv', 'id,customer_ids\n', (err) => {
      if (err) throw err;

      for (const productId in productCustomers) {
        const customerIds = Array.from(productCustomers[productId]).join(' ');
        fs.appendFile('product_customers.csv', `${productId},${customerIds}\n`, (err) => {
          if (err) throw err;
        });
      }
    });
  });
