// api.js
const Products = require('/workspaces/is-5600-week-04/data/products.json'); // Import the Products module

// List all products with pagination and optional filtering by tag
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;

  try {
    // Pass pagination and filtering parameters to the Products service
    const products = await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag
    });

    // Return the filtered list of products along with the total count
    res.json({ products, totalCount: products.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get a single product by ID
async function getProduct(req, res, next) {
  const { id } = req.params;

  try {
    // Fetch the product using the Products.get() method
    const product = await Products.get(id);

    if (!product) {
      // If product not found, pass control to the next middleware (404 handler)
      return next();
    }

    // Send the found product as a response
    return res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Handle root route
function handleRoot(req, res) {
  res.send('Welcome to the Products API!');
}

// Create a new product
async function createProduct(req, res) {
  console.log('request body:', req.body); // Log the request body to the console for testing
  res.json(req.body); // Send the request body back as a response (for testing)
}

// Update a product (for testing, logs a message)
async function updateProduct(req, res) {
  const { id } = req.params;
  console.log(`Product with ID ${id} is being updated`); // Log the product update
  res.status(200).json({ message: `Product with ID ${id} updated successfully.` }); // Respond with a 200 status
}

// Delete a product (for testing, logs a message)
async function deleteProduct(req, res) {
  const { id } = req.params;
  console.log(`Product with ID ${id} is being deleted`); // Log the product deletion
  res.status(202).json({ message: `Product with ID ${id} deleted successfully.` }); // Respond with a 202 status
}

// Export functions to be used in other modules
module.exports = {
  listProducts,
  getProduct,
  handleRoot,
  createProduct,
  updateProduct, // Export the updateProduct function
  deleteProduct // Export the deleteProduct function
};
