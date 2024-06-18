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

// Main function to generate order prices and write them to an output CSV file
const generateOrderPrices = async (ordersPath, productsPath, outputPath) => {
  try {
    // Parse orders and products concurrently
    const [orders, products] = await Promise.all([
      parseOrders(ordersPath),
      parseProducts(productsPath),
    ])

    // Calculate total cost for each order
    const orderPrices = orders.map((order) => {
      const productIds = order.products.split(' ')
      const totalCost = productIds.reduce(
        (total, productId) => total + (products[productId] || 0),
        0,
      )
      return { id: order.id, euros: totalCost.toFixed(2) }
    })

    // Configure CSV writer and write the calculated order prices
    const csvWriter = createObjectCsvWriter({
      path: outputPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'euros', title: 'EUROS' },
      ],
    })

    await csvWriter.writeRecords(orderPrices)
    logger.info('Order prices generated successfully.')
  } catch (error) {
    logger.error(`Error generating order prices: ${error.message}`)
  }
}

export { generateOrderPrices }
