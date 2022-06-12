import mongoose from "mongoose"

export const productSchema = mongoose.Schema({
  productCategory: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
    default: 0
  },
  contact: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})