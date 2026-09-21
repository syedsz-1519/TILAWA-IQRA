import { Request, Response } from 'express'
import { Product } from '../models'

// Get all products
export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 })

    res.json({
      success: true,
      data: products,
      count: products.length,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

// Get product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const product = await Product.findById(id)

    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    res.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}

// Create new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, category, image } = req.body

    // Validation
    if (!name || price === undefined || !category) {
      res.status(400).json({
        error: 'Missing required fields: name, price, category',
      })
      return
    }

    if (typeof price !== 'number' || price < 0) {
      res.status(400).json({ error: 'Price must be a non-negative number' })
      return
    }

    if (!['quran', 'hadith', 'dua', 'story', 'course', 'other'].includes(category)) {
      res.status(400).json({ error: 'Invalid category' })
      return
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      isActive: true,
    })

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    })
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
}

// Update product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { name, description, price, category, image, isActive } = req.body

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, image, isActive },
      { new: true, runValidators: true }
    )

    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    })
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ error: 'Failed to update product' })
  }
}

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params

    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      res.status(404).json({ error: 'Product not found' })
      return
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
      deletedId: id,
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
}

// Search products
export const searchProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, category } = req.query

    if (!q || typeof q !== 'string') {
      res.status(400).json({ error: 'Search query is required' })
      return
    }

    const searchQuery: any = {
      isActive: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    }

    if (category && typeof category === 'string') {
      searchQuery.category = category
    }

    const results = await Product.find(searchQuery).limit(20)

    res.json({
      success: true,
      data: results,
      count: results.length,
    })
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).json({ error: 'Failed to search products' })
  }
}
