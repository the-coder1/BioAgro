import fs from 'fs'
import Category from "../models/categoryModel.js"

// PRODUCT
const createProduct = async (req, res) => {
  const { nameProduct, brandProduct, priceProduct, contactProduct, infoProduct } = req.body

  const category = await Category.findById(req.params.id)

  const imageProduct = req.file.filename || ""
  console.log(imageProduct)

  if(category){
    if(nameProduct !== '' && brandProduct !== '' && priceProduct !== '' && contactProduct !== '' && infoProduct !== '' && imageProduct !== ''){
      const processNameProduct = nameProduct[0].toUpperCase() + nameProduct.slice(1).toLowerCase()
      const processBrand = brandProduct[0].toUpperCase() + brandProduct.slice(1).toLowerCase()
      const processInfoProduct = infoProduct[0].toUpperCase() + infoProduct.slice(1).toLowerCase()

      const product = {
        productName: processNameProduct,
        brand: processBrand,
        image: imageProduct,
        productCategory: category.categoryName,
        price: priceProduct,
        contact: contactProduct,
        description: processInfoProduct
      }
    
      category.products.push(product);

      await category.save()
      const lengthProducts = category.products.length

      res.redirect(`/product/${category.products[lengthProducts - 1]._id}`)
    } else {
      res.status(400)
      res.render(`pages/category`, {
        page: 'category',
        category,
        valueName: nameProduct,
        valueBrand: brandProduct,
        valueCategory: category.categoryName,
        valueImage: imageProduct,
        valuePrice: priceProduct,
        valueContact: contactProduct,
        valueDescription: infoProduct,
        error: {
          nameProduct: 'Trebuie sa adaugi numele produsului!',
          brandProduct: 'Trebuie sa adaugi brand-ul produsului!',
          imageProduct: 'Trebuie sa adaugi poza produsului!',
          priceProduct: 'Trebuie sa adaugi pretul produsului!',
          contactProduct: 'Trebuie sa adaugi numarul de telefon pentru a fi contactat!',
          infoProduct: 'Trebuie sa adaugi o descriere pentru produsul tau!'
        }
      })
    }
  } else {
    res.status(404)
    res.render('pages/error', { error: 'Categoria pentru acest produs nu exista!' })
  }
}

const getProductById = async (req, res) => {
  const { id } = req.params
  const category = await Category.find()

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

  let showProduct = ''
  category.forEach(item => {
    item.products.forEach(product => {
      if(product._id == id){
        showProduct = product
      }
    })
  })

  if(category) {
    res.render(`pages/product`, {
      page: 'product', 
      showProduct,
      error: {},
      valueName: '',
      valueBrand: '',
      valueImage: '',
      valuePrice: '',
      valueContact: '',
      valueDescription: ''
    })
  } else {
    res.status(404)
    res.render('pages/error', { error: 'Produsul nu exista!' })
  }
}

const deleteProduct = async (req, res) => {
  const category = await Category.findOne({ product: req.params.id })

  if(category){
    await category.products[0].remove()
    await category.save()
    res.redirect(`/category/${category._id}`)
  } else {
    res.status(400)
    res.render('pages/error', { error: 'Produsul nu a putut fi sters!' })
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const { nameProduct, brandProduct, priceProduct, contactProduct, infoProduct } = req.body

  let showProduct = ''
  const category = await Category.find()
  category.forEach(item => {
    item.products.forEach(product => {
      if(product._id == id){
        showProduct = product
      }
    })
  })

  
  if(nameProduct && brandProduct && priceProduct && contactProduct && infoProduct){
    if(category){
      showProduct.productName = nameProduct[0].toUpperCase() + nameProduct.slice(1).toLowerCase()
      showProduct.brand = brandProduct[0].toUpperCase() + brandProduct.slice(1).toLowerCase()
      showProduct.price = priceProduct
      showProduct.contact = contactProduct
      showProduct.description = infoProduct[0].toUpperCase() + infoProduct.slice(1).toLowerCase()
  
      if(!showProduct){
        res.status(400)
        res.render('pages/error', { error: 'Actualizarea acestui produs nu se poate executa!' })
      }

      if(req.file){
        showProduct.image = req.file.filename
        category.forEach(item => {
          item.save()
        })
      }
  
      res.redirect(`/product/${showProduct._id}`)
    }
  } else {
    res.render('pages/product', {
      page: 'product',
      showProduct,
      valueName: nameProduct,
      valueBrand: brandProduct,
      valueImage: req.file,
      valuePrice: priceProduct,
      valueContact: contactProduct,
      valueDescription: infoProduct,
      error: {
        nameProduct: 'Introdu numele produsului pentru a actualiza produsul!',
        brandProduct: 'Introdu brand-ul produsului pentru a actualiza produsul!',
        priceProduct: 'Introdu pretul produsului pentru a actualiza produsul!',
        contactProduct: 'Introdu numarul de telefon pentru a actualiza produsul!',
        infoProduct: 'Introdu descrierea produsului pentru a actualiza produsul!'
      }
    })
  }
}

export { createProduct, getProductById, deleteProduct, updateProduct }