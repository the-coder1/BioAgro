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
  .route('/delete_category/:id')
  .post(deleteCategory)

router
  .route('/update_category/:id')
  .post(updateCategory)

export default router