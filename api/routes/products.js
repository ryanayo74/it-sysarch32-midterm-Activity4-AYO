// routes/products.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth'); // Import the middleware
const ProductsController = require('../controllers/products');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Middleware to check authentication before accessing product routes
router.use(checkAuth);

// Route for getting all products
router.get("/", ProductsController.products_get_all);

// Route for creating a new product
router.post("/", upload.single('productImage'), ProductsController.products_create_product);

// Route for getting a single product
router.get("/:productId", ProductsController.products_get_product);

// Route for updating a product
router.patch("/:productId", ProductsController.products_update_product);

// Route for deleting a product
router.delete("/:productId", ProductsController.products_delete);

module.exports = router;