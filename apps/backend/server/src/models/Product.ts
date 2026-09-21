import { Schema, model, Document } from 'mongoose'

export interface IProduct extends Document {
  _id: string
  name: string
  description: string
  price: number
  category: 'quran' | 'hadith' | 'dua' | 'story' | 'course' | 'other'
  image?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      enum: ['quran', 'hadith', 'dua', 'story', 'course', 'other'],
      required: [true, 'Category is required'],
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'products',
  }
)

// Create indexes
ProductSchema.index({ category: 1 })
ProductSchema.index({ isActive: 1 })
ProductSchema.index({ createdAt: -1 })
ProductSchema.index({ name: 'text', description: 'text' }) // Text search

export const Product = model<IProduct>('Product', ProductSchema)
