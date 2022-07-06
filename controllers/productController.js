import { verify } from 'crypto'
import fs from 'fs'
import Category from "../models/categoryModel.js"

// PRODUCT
const createProduct = async (req, res) => {
  const { nameProduct, brandProduct, priceProduct, contactProduct, infoProduct } = req.body
  let imageProduct = ''

  const category = await Category.findById(req.params.id)

  if(typeof(req.file) != 'undefined' && req.file != null){
    imageProduct = req.file.filename
  }

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
      const lengthProducts = category.products.length

      const searchImage = await Category.findOne()

      fs.readdir('./uploads', (err, files) => {
        let deleteImage = ''
        let verify = 0

        if(searchImage.products.length !== 0){
          for(const product of searchImage.products){
            for(const file of files) {
              if(file !== product.image){
                deleteImage = file
              } else {
                deleteImage = ''
                verify = verify + 1
              }
              console.log(deleteImage)

              if(verify !== 0 && deleteImage !== '' && deleteImage !== imageProduct){
                fs.unlinkSync(`./uploads/${deleteImage}`)
              }
            }
          }
        } else {
          for(const file of files){
            if(file !== imageProduct){
              fs.unlinkSync(`./uploads/${file}`)
            }
          }
        }
      })

      await category.save()
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
  const category = await Category.findOne({ product: id })

  if(category) {
    res.render(`pages/product`, {
      page: 'product', 
      category, 
      id,
      error: {},
      valueName: '',
      valueBrand: '',
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
  
  const deleteImage = category.products[0].image

  if(category){
    fs.unlinkSync(`./uploads/${deleteImage}`)

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

  const category = await Category.findOne({ product: id })
  const deleteImage = category.products[0].image
  
  if(nameProduct && brandProduct && priceProduct && contactProduct && infoProduct){
    if(category){
      category.products[0].productName = nameProduct[0].toUpperCase() + nameProduct.slice(1).toLowerCase()
      category.products[0].brand = brandProduct[0].toUpperCase() + brandProduct.slice(1).toLowerCase()
      category.products[0].price = priceProduct
      category.products[0].contact = contactProduct
      category.products[0].description = infoProduct[0].toUpperCase() + infoProduct.slice(1).toLowerCase()
  
      if(!category.products[0]){
        res.status(400)
        res.render('pages/error', { error: 'Actualizarea acestui produs nu se poate executa!' })
      }

      if(req.file){
        category.products[0].image = req.file.filename
        
        fs.unlinkSync(`./uploads/${deleteImage}`)
      }

      await category.save()
  
      res.redirect(`/product/${category.products[0]._id}`)
    }
  } else {
    res.render('pages/product', {
      page: 'product',
      category,
      id,
      valueName: nameProduct,
      valueBrand: brandProduct,
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