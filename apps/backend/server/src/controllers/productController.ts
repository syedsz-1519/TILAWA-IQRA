import { Request, Response } from 'express'

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Mock implementation - replace with MongoDB queries when integrated
    const products = [
      {
        id: '1',
        name: 'Quran Bundle',
        description: 'Complete Quran with translations',
        price: 29.99,
        category: 'quran',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Hadith Collection',
        description: 'Comprehensive hadith collection',
        price: 19.99,
        category: 'hadith',
        createdAt: new Date(),
      },
    ]

    res.json({
      success: true,
      data: products,
      count: products.length,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Mock implementation
    const product = {
      id,
      name: 'Quran Bundle',
      description: 'Complete Quran with translations',
      price: 29.99,
      category: 'quran',
      createdAt: new Date(),
    }

    res.json({
      success: true,
      data: product,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}

// Create new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({
        error: 'Missing required fields: name, price, category',
      })
    }

    // Mock implementation
    const product = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      price,
      category,
      createdAt: new Date(),
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' })
  }
}

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, description, price, category } = req.body

    // Mock implementation
    const updatedProduct = {
      id,
      name,
      description,
      price,
      category,
      updatedAt: new Date(),
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' })
  }
}

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Mock implementation
    res.json({
      success: true,
      message: 'Product deleted successfully',
      deletedId: id,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' })
  }
}

// Search products
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { q, category } = req.query

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query is required' })
    }

    // Mock implementation
    const results = [
      {
        id: '1',
        name: 'Quran Bundle',
        description: 'Complete Quran with translations',
        price: 29.99,
        category: category || 'quran',
        createdAt: new Date(),
      },
    ]

    res.json({
      success: true,
      data: results,
      count: results.length,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to search products' })
  }
}
