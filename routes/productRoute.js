// Create the route
import express from "express"
import { createProduct, getProductById, deleteProduct, updateProduct } from "../controllers/productController.js"

const router = express.Router()

router
  .route('/category/:id')
  .post(createProduct)

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