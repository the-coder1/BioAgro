import Category from "../models/categoryModel.js"

// CATEGORY
const getCategories = async (req, res) => {
  const categories = await Category.find()

  function publicDate(date){
    let day = date.getDay()
    let month = date.getMonth()
    let year = date.getFullYear()

    if(day < 10){
      day = '0' + day
    }
    if(month < 10){
      month = '0' + month
    }
    
    return day + '-' + month + '-' + year;
  }

  function publicHour(date){
    let minute = date.getMinutes()
    let hour = date.getHours()

    if(minute < 10){
      minute = '0' + minute
    }
    if(hour < 10){
      hour = '0' + hour
    }

    return hour + ':' + minute;
  }

  res.render('pages/index', {
    categories,
    publicDate, 
    publicHour
  })
}

const createCategory = async (req, res) => {
  const { categoryName } = req.body

  const categoryExists = await Category.findOne({ categoryName })

  if(categoryName){
    if(categoryExists){
      res.status(400)
      res.render('pages/error', { error: 'Categoria este deja adaugata!' })
    } else {
      let category = await new Category({
        categoryName: categoryName[0].toUpperCase() + categoryName.slice(1).toLowerCase()
      })
    
      category = await category.save()
      res.redirect(`/category/${category._id}`)
    }
  } else {
    res.status(400)
    res.render('pages/error', { error: 'Te rugam introdu o categorie!' })
  }
}

const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id)

  if(category) {
    res.render(`pages/category`, { category })
  } else {
    res.status(404)
    res.render('pages/error', { error: 'Categoria nu a putut fi gasita!' })
  }
}

const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id)

  if(category){
    await category.remove()
    res.redirect('/')
  } else {
    res.status(404)
    res.render('pages/error', { error: 'Categoria nu a putut fi stearsa!' })
  }
}

const updateCategory = async (req, res) => {
  const { categoryName } = req.body

  const category = await Category.findByIdAndUpdate(req.params.id, {
    categoryName: categoryName[0].toUpperCase() + categoryName.slice(1).toLowerCase()
  })

  if(categoryName){
    if(!category) {
      res.status(400)
      res.render('pages/error', { error: 'Categoria nu a putut fi schimbata!' })
    }

    res.redirect(`/category/${category._id}`)
  } else {
    res.render('pages/error', { error: 'Completeaza formularul pentru a actualiza categoria!' })
  }
}

export { getCategories, createCategory, getCategoryById, deleteCategory, updateCategory }