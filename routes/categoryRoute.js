// Create the route
import express from "express"
import { getCategories, createCategory, getCategoryById, deleteCategory, updateCategory } from "../controllers/categoryController.js"

const router = express.Router()

router
  .route('/')
  .get(getCategories)
  .post(createCategory)

router
  .route('/category/:id')
  .get(getCategoryById)

router
  .route('/deleteCategory/:id')
  .post(deleteCategory)

router
  .route('/updateCategory/:id')
  .post(updateCategory)

export default router