const fs = require('fs');
const csv = require('csv-parser');

const customers = {};
const customerOrders = {};

// Read data from customers.csv
fs.createReadStream('customers.csv')
  .pipe(csv())
  .on('data', (data) => {
    const customerId = data.id;
    customers[customerId] = {
      id: customerId,
      firstname: data.firstname,
      lastname: data.lastname,
      total_euros: 0,
    };
  })
  .on('end', () => {
    // Read data from orders.csv
    fs.createReadStream('orders.csv')
      .pipe(csv())
      .on('data', (data) => {
        const customerId = data.customer;
        const orderTotalEuros = data.products.split(' ').reduce((acc, productId) => {
          return acc + (productData[productId] || 0);
        }, 0);

        if (customerOrders[customerId]) {
          customerOrders[customerId].total_euros += orderTotalEuros;
        } else {
          customerOrders[customerId] = {
            id: customerId,
            total_euros: orderTotalEuros,
          };
        }
      })
      .on('end', () => {
        // Sort customers by total euros spent (descending order)
        const sortedCustomers = Object.values(customerOrders).sort((a, b) => b.total_euros - a.total_euros);

        // Create customer_ranking.csv
        fs.writeFile('customer_ranking.csv', 'id,firstname,lastname,total_euros\n', (err) => {
          if (err) throw err;

          sortedCustomers.forEach((customer) => {
            const { id, firstname, lastname, total_euros } = customers[customer.id];
            fs.appendFile('customer_ranking.csv', `${id},${firstname},${lastname},${total_euros}\n`, (err) => {
              if (err) throw err;
            });
          });
        });
      });
  });
