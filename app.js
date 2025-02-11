// app.js
const express = require('express');
const api = require('/workspaces/is-5600-week-04/api.js'); // Import the API module
const middleware = require('/workspaces/is-5600-week-04/middleware.js'); // Import the middleware module
const bodyParser = require('body-parser'); // Import body-parser

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Register our CORS middleware
app.use(middleware.cors);

// Root route
app.get('/', api.handleRoot);

// Route to list products (with pagination and filtering)
app.get('/products', api.listProducts);

// Route to get a single product by its ID
app.get('/products/:id', api.getProduct);

// Add new route for creating products
app.post('/products', api.createProduct);

// Add new route for updating products
app.put('/products/:id', api.updateProduct);

// Add new route for deleting products
app.delete('/products/:id', api.deleteProduct);

// Error handling middleware for 404 and other errors
app.use((req, res) => {
  res.status(404).json({ message: 'Product not found' });
});

// Global error handling for unexpected errors
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
