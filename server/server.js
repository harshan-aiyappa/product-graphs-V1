const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const winston = require('winston');
require('dotenv').config();

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});

const app = express();
app.use(cors());
app.use(express.json());

// Custom middleware for logging HTTP requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Test API route
app.get('/api/test', (req, res) => {
  const testResponse = {
    message: 'Test API is working!',
    timestamp: new Date().toISOString()
  };
  logger.info('Test API endpoint was hit');
  res.status(200).json(testResponse);
});

// Route to get data from ConjVE_AR table
app.get('/api/conjar', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."ConjVE_AR"');
    res.status(200).json({ conjar: result.rows });
  } catch (err) {
    logger.error('Error executing query:', err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
