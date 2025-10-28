require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const checkoutRoutes = require('./routes/checkoutRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// connect DB
connectDB()

// middlewares
app.use(cors({ origin: true })) // allow all origins for dev; restrict in prod
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/checkout', checkoutRoutes)

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
