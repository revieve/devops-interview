const fs = require('fs');
const csv = require('csv-parser');

const orderData = [];
const productData = {};

// Read data from products.csv
fs.createReadStream('products.csv')
  .pipe(csv())
  .on('data', (data) => {
    productData[data.id] = parseFloat(data.cost);
  })
  .on('end', () => {
    // Read data from orders.csv
    fs.createReadStream('orders.csv')
      .pipe(csv())
      .on('data', (data) => {
        const order = {
          id: data.id,
          euros: 0,
        };

        const productIds = data.products.split(' ');
        for (const productId of productIds) {
          if (productData[productId]) {
            order.euros += productData[productId];
          }
        }

        orderData.push(order);
      })
      .on('end', () => {
        // Create order_prices.csv
        const csvData = orderData.map((order) => ({
          id: order.id,
          euros: order.euros,
        }));

        fs.writeFile('order_prices.csv', 'id,euros\n', (err) => {
          if (err) throw err;

          csvData.forEach((order) => {
            fs.appendFile('order_prices.csv', `${order.id},${order.euros}\n`, (err) => {
              if (err) throw err;
            });
          });
        });
      });
  });
