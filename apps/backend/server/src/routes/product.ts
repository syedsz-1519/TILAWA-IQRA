import { Router } from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} from '../controllers/productController'

const router = Router()

/**
 * GET /api/products
 * Get all products
 */
router.get('/api/products', getAllProducts)

/**
 * GET /api/products/search
 * Search products by query and category
 */
router.get('/api/products/search', searchProducts)

/**
 * GET /api/products/:id
 * Get product by ID
 */
router.get('/api/products/:id', getProductById)

/**
 * POST /api/products
 * Create new product
 */
router.post('/api/products', createProduct)

/**
 * PUT /api/products/:id
 * Update product
 */
router.put('/api/products/:id', updateProduct)

/**
 * DELETE /api/products/:id
 * Delete product
 */
router.delete('/api/products/:id', deleteProduct)

export default router
