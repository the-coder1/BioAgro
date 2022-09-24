import fs from 'fs'
import Category from "../models/categoryModel.js"

// CATEGORY
const getCategories = async (req, res) => {
  const categories = await Category.find()

  fs.readdir('./uploads', (err, files) => {
    files?.forEach(file => {
      let keepImage = ''

      categories.forEach(item => {
        item.products.forEach(product => {
          if(file === product.image){
            keepImage = file
          }
        })
      })

      if(keepImage === ''){
        fs.unlinkSync(`./uploads/${file}`)
      }
    })
  })

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

  res.render('pages', { 
    page: 'main',
    categories,
    publicDate,
    publicHour,
    error: {},
    valueCategory: ''
  })
}

const createCategory = async (req, res) => {
  const { categoryName } = req.body
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

  if(categoryName){
    const processCategoryName = categoryName[0].toUpperCase() + categoryName.slice(1).toLowerCase()

    const categoryExists = await Category.findOne({ categoryName: processCategoryName })

    if(categoryExists){
      res.status(400)
      res.render('pages', { 
        page: 'main',
        categories,
        publicDate,
        publicHour,
        error: {
          category: 'Categoria este deja adaugata!'
        },
        valueCategory: categoryName
      })
    } else {
      let category = await new Category({
        categoryName: processCategoryName
      })
    
      category = await category.save()
      res.redirect(`/category/${category._id}`)
    }
  } else {
    res.status(400)
    res.render('pages', { 
      page: 'main',
      categories,
      publicDate,
      publicHour,
      error: {
        category: 'Te rugam introdu o categorie!'
      },
      valueCategory: categoryName
    })
  }
}

const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id)
  
  const categories = await Category.find()
  fs.readdir('./uploads', (err, files) => {
    files?.forEach(file => {
      let keepImage = ''

      categories.forEach(item => {
        item.products.forEach(product => {
          if(file === product.image){
            keepImage = file
          }
        })
      })

      if(keepImage === ''){
        fs.unlinkSync(`./uploads/${file}`)
      }
    })
  })

  if(category) {
    res.render(`pages/category`, { 
      page: 'category',
      category,
      error: {},
      valueCategory: category.categoryName,
      valueName: '',
      valueBrand: '',
      valueImage: '',
      valuePrice: '',
      valueContact: '',
      valueDescription: ''
    })
  } else {
    res.status(404)
    res.render('pages/error', { 
      error: 'Categoria nu a putut fi gasita!' 
    })
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
  const category = await Category.findById(req.params.id)

  if(categoryName){
    const processCategoryName = categoryName[0].toUpperCase() + categoryName.slice(1).toLowerCase()

    const categoryUpdateExists = await Category.findOne({ categoryName: processCategoryName })

    if(categoryUpdateExists){
      res.status(400)
      res.render('pages/category', { 
        page: 'category',
        category,
        error: {
          updateCategory: 'Categoria este deja adaugata!'
        },
        valueCategory: processCategoryName,
        valueName: '',
        valueBrand: '',
        valueImage: '',
        valuePrice: '',
        valueContact: '',
        valueDescription: ''
      })
    } else {
      const categoryUpdate = await Category.findByIdAndUpdate(req.params.id, {
        categoryName: processCategoryName
      })
      
      if(!categoryUpdate) {
        res.status(400)
        res.render('pages/error', { 
          error: {
            updateCategory: 'Categoria nu a putut fi schimbata!' 
          },
        })
      }
      
      res.redirect(`/category/${category._id}`)
    }
  } else {
    res.render('pages/category', { 
      page: 'category',
      category,
      error: {
        updateCategory: 'Completeaza formularul pentru a actualiza categoria!'
      },
      valueCategory: categoryName,
      valueName: '',
      valueBrand: '',
      valueImage: '',
      valuePrice: '',
      valueContact: '',
      valueDescription: ''
    })
  }
}

export { getCategories, createCategory, getCategoryById, deleteCategory, updateCategory }