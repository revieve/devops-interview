import fs from 'fs'
import csv from 'csv-parser'
import { createObjectCsvWriter } from 'csv-writer'
import logger from '../logger.js'

// Generic CSV parser function to parse any CSV file and apply a custom row parser
const parseCsv = (filePath, parser) => {
  return new Promise((resolve, reject) => {
    const results = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        parser(row, results)
      })
      .on('end', () => {
        resolve(results)
      })
      .on('error', (error) => {
        logger.error(`Error parsing file: ${filePath}, ${error.message}`)
        reject(error)
      })
  })
}

// Parse the orders CSV file and return a list of orders
const parseOrders = async (filePath) => {
  return parseCsv(filePath, (row, results) => results.push(row))
}

// Parse the products CSV file and return an object with product ID as key and product cost as value
const parseProducts = async (filePath) => {
  const products = {}
  await parseCsv(filePath, (row) => {
    products[row.id] = parseFloat(row.cost)
  })
  return products
}

// Parse the customers CSV file and return an object with customer ID as key and customer details as value
const parseCustomers = async (filePath) => {
  const customers = {}
  await parseCsv(filePath, (row) => {
    customers[row.id] = row
  })
  return customers
}

// Main function to generate customer ranking based on total spending and write to an output CSV file
const generateCustomerRanking = async (
  ordersPath,
  productsPath,
  customersPath,
  outputPath,
) => {
  try {
    // Parse orders, products, and customers concurrently
    const [orders, products, customers] = await Promise.all([
      parseOrders(ordersPath),
      parseProducts(productsPath),
      parseCustomers(customersPath),
    ])

    // Calculate total spending for each customer
    const customerSpending = {}

    orders.forEach((order) => {
      const customerId = order.customer
      const productIds = order.products.split(' ')

      const totalCost = productIds.reduce(
        (total, productId) => total + (products[productId] || 0),
        0,
      )

      if (!customerSpending[customerId]) {
        customerSpending[customerId] = 0
      }
      customerSpending[customerId] += totalCost
    })

    // Create a ranking array and sort by total spending in descending order
    const ranking = Object.keys(customerSpending)
      .map((customerId) => ({
        id: customerId,
        firstname: customers[customerId].firstname,
        lastname: customers[customerId].lastname,
        total_euros: customerSpending[customerId].toFixed(2),
      }))
      .sort((a, b) => b.total_euros - a.total_euros)

    // Configure CSV writer and write the customer ranking
    const csvWriter = createObjectCsvWriter({
      path: outputPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'firstname', title: 'FIRSTNAME' },
        { id: 'lastname', title: 'LASTNAME' },
        { id: 'total_euros', title: 'TOTAL_EUROS' },
      ],
    })

    await csvWriter.writeRecords(ranking)
    logger.info('Customer ranking generated successfully.')
  } catch (error) {
    logger.error(`Error generating customer ranking: ${error.message}`)
  }
}

export { generateCustomerRanking }
