const express = require('express');
const axios = require('axios');
const _ = require('lodash');
const { z } = require('zod');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Zod schema to validate the numbers - using coerce to convert strings to numbers
const sumSchema = z.object({
  num1: z.coerce.number(),
  num2: z.coerce.number(),
});

// Endpoint to sum two numbers
app.get('/sum', async (req, res) => {
  try {
    // Validate query parameters using zod
    const validation = sumSchema.safeParse(req.query);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid input. Please provide two valid numbers.',
        details: validation.error.issues 
      });
    }

    const { num1, num2 } = validation.data;

    // Calculate sum using lodash
    const sum = _.add(num1, num2);

    // Fetch data from a free API (using JSONPlaceholder)
    let externalApiData;
    try {
      const apiResponse = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      externalApiData = apiResponse.data;
    } catch (apiError) {
      // If external API fails, use a fallback message
      externalApiData = { 
        message: 'External API unavailable', 
        fallback: true 
      };
    }
    
    // Return the result
    res.json({
      sum: sum,
      num1: num1,
      num2: num2,
      externalApiData: externalApiData
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'An error occurred while processing your request.',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Sum API',
    usage: 'GET /sum?num1=5&num2=10'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
