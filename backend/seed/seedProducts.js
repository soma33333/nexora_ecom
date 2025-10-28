require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Product = require('../models/Product')
const sample = require('../data/product')

async function seed() {
  try {
    await connectDB()
    console.log('Seeding products...')

    await Product.deleteMany({})
    const created = await Product.insertMany(sample)
    console.log(`Inserted ${created.length} products`)
    process.exit(0)
  } catch (err) {
    console.error('Seeding error', err)
    process.exit(1)
  }
}

seed()
