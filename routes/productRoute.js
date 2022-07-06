// Create the route
import express from "express"
import { createProduct, getProductById, deleteProduct, updateProduct } from "../controllers/productController.js"
import upload from '../controllers/uploadController.js'

const router = express.Router()

router
  .route('/category/:id')
  .post(upload  , createProduct)

router
  .route('/product/:id')
  .get(getProductById)

router
  .route('/delete_product/:id')
  .post(deleteProduct)

router
  .route('/update_product/:id')
  .post(upload, updateProduct)

export default router