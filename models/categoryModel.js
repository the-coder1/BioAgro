import mongoose from 'mongoose'
import { productSchema } from './productModel.js'

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  products: [productSchema]
},
{
  timestamps: true
})

const Category= mongoose.model('Category', categorySchema)

export default Category