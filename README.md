# HB-Node-2
This repository is built with NodeJS to mimic a project without any security issues.

## Description
A simple Node.js Express API that provides a sum endpoint to add two numbers with input validation.

## Features
- Express server with REST API endpoints
- Input validation using Zod
- Integration with external APIs using Axios
- Utility functions using Lodash

## Installation
```bash
npm install
```

## Usage
Start the server:
```bash
npm start
```

The server will run on port 3000 by default.

## API Endpoints

### GET /
Health check endpoint that returns API information.

### GET /sum
Adds two numbers and returns the result along with data from an external API.

**Query Parameters:**
- `num1` (number, required): First number to add
- `num2` (number, required): Second number to add

**Example:**
```bash
curl "http://localhost:3000/sum?num1=5&num2=10"
```

**Response:**
```json
{
  "sum": 15,
  "num1": 5,
  "num2": 10,
  "externalApiData": { "message": "External API unavailable", "fallback": true }
}
```

## Dependencies
- express: Web framework
- axios: HTTP client for API requests
- lodash: Utility library
- zod: Input validation
