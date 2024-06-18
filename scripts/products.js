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

// Main function to generate product-customer relationships and write to an output CSV file
const generateProductCustomers = async (ordersPath, outputPath) => {
  try {
    const orders = await parseOrders(ordersPath)

    // Create a map of product IDs to unique customer IDs
    const productCustomers = {}

    orders.forEach((order) => {
      const customerId = order.customer
      const productIds = order.products.split(' ')

      productIds.forEach((productId) => {
        if (!productCustomers[productId]) {
          productCustomers[productId] = []
        }
        if (!productCustomers[productId].includes(customerId)) {
          productCustomers[productId].push(customerId)
        }
      })
    })

    // Convert the product-customer map to an array of records for CSV writing
    const records = Object.keys(productCustomers).map((productId) => ({
      id: productId,
      customer_ids: productCustomers[productId].join(' '),
    }))

    // Configure CSV writer and write the product-customer relationships
    const csvWriter = createObjectCsvWriter({
      path: outputPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'customer_ids', title: 'CUSTOMER_IDS' },
      ],
    })

    await csvWriter.writeRecords(records)
    logger.info('Product customers generated successfully.')
  } catch (error) {
    logger.error(`Error generating product customers: ${error.message}`)
  }
}

export { generateProductCustomers }
