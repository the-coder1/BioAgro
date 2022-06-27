import Category from "../models/categoryModel.js"

// PRODUCT
const createProduct = async (req, res) => {
  const { nameProduct, brandProduct, priceProduct, contactProduct, infoProduct } = req.body

  const category = await Category.findById(req.params.id)

  if(nameProduct && brandProduct && priceProduct && contactProduct && infoProduct){
    if(category){
      const product = {
        productName: nameProduct[0].toUpperCase() + nameProduct.slice(1).toLowerCase(),
        brand: brandProduct[0].toUpperCase() + brandProduct.slice(1).toLowerCase(),
        image: req.file.filename,
        productCategory: category.categoryName,
        price: priceProduct,
        contact: contactProduct,
        description: infoProduct[0].toUpperCase() + infoProduct.slice(1).toLowerCase()
      }
  
      category.products.push(product);
      const lengthProducts = category.products.length
  
      await category.save()
      res.redirect(`/product/${category.products[lengthProducts - 1]._id}`)
    } else {
      res.status(400)
      res.render('pages/error', { error: 'Categoria pentru acest produs nu exista!' })
    }
  } else {
    res.status(400)
    res.render('pages/error', { error: 'Completeaza toata campurile pentru adaugarea produsului!' })
  }
}

const getProductById = async (req, res) => {
  const { id } = req.params
  const category = await Category.findOne({ product: id })

  if(category) {
    res.render(`pages/product`, { category, id })
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
  const { nameProduct, brandProduct, priceProduct, contactProduct, infoProduct } = req.body
  const category = await Category.findOne({ product: req.params.id })

  
  if(nameProduct && brandProduct && priceProduct && contactProduct && infoProduct){
    if(category){
      category.products[0].productName = nameProduct[0].toUpperCase() + nameProduct.slice(1).toLowerCase()
      category.products[0].brand = brandProduct[0].toUpperCase() + brandProduct.slice(1).toLowerCase()
      category.products[0].price = priceProduct
      category.products[0].contact = contactProduct
      category.products[0].description = infoProduct[0].toUpperCase() + infoProduct.slice(1).toLowerCase()
  
      await category.save()
  
      if(!category.products[0]){
        res.status(400)
        res.render('pages/error', {error: 'Datele produsului nu exista!'})
      }
  
      res.redirect(`/product/${category.products[0]._id}`)
    }
  } else {
    res.render('pages/error', { error: "Completeaza toate campurile pentru a actualiza produsul!" })
  }
}

export { createProduct, getProductById, deleteProduct, updateProduct }