// Create the route
import express from "express"
import { createProduct, getProductById, deleteProduct, updateProduct } from "../controllers/productController.js"
import upload from "../controllers/uploadController.js"

const router = express.Router()

router.post('/category/:id', upload, createProduct)

router
  .route('/product/:id')
  .get(getProductById)

router
  .route('/deleteProduct/:id')
  .post(deleteProduct)

router
  .route('/updateProduct/:id')
  .post(updateProduct)

export default router