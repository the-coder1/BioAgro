// Create the route
import express from "express"

const router = express.Router()

router.use((req, res) => {
  res.status(404).render('pages/error', { error: 'Pagina nu a fost gasita!' })
})

export default router