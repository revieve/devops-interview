import { generateOrderPrices } from './scripts/orders.js'
import { generateProductCustomers } from './scripts/products.js'
import { generateCustomerRanking } from './scripts/customers.js'
;(async () => {
  await generateOrderPrices(
    'data/orders.csv',
    'data/products.csv',
    'data/order_prices.csv',
  )
  await generateProductCustomers(
    'data/orders.csv',
    'data/product_customers.csv',
  )
  await generateCustomerRanking(
    'data/orders.csv',
    'data/products.csv',
    'data/customers.csv',
    'data/customer_ranking.csv',
  )

  console.log('All tasks completed successfully.')
})()
