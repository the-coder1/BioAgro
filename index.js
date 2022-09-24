// Config values
import dotenv from 'dotenv'

dotenv.config()

// Move to the directories
import path, { dirname } from 'path'
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


// Connect to database
import connectDB from './config/db.js'
connectDB()


// Create the app
import express from "express"

const app = express()
const port = 3000

app.set('view engine', 'ejs')


// Use static files
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use(express.static(path.join(__dirname, 'src')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))


// Middlewares for parsing data and load resources
import cors from 'cors'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Run the app
app.listen(port || 3001, () => {
  console.log(`App listening on port ${port}`)
})


// Import and use the routes
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import errorRoute from './routes/errorRoute.js'

app.use('/', categoryRoute)
app.use('/', productRoute)
app.use('/', errorRoute)