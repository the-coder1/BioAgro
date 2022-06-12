// index.ejs
const addCategory = document.querySelector("#add_category")
const formCategory = document.querySelector('#form_category')

//category.ejs
const editCategory = document.querySelector('#edit_category')
const formEditCategory = document.querySelector('#form_edit_category')
const deleteCategory = document.querySelector('#delete_category')
const titleCategory = document.querySelector('#title_category')

const addProduct = document.querySelector('#add_product')
const formProduct = document.querySelector('#form_product')

// product.ejs
const editProduct = document.querySelector('#edit_product')
const formEditProduct = document.querySelector('#form_edit_product')
const deleteProduct = document.querySelector('#delete_product')
const infoProduct = document.querySelector('#info_product')

// error.ejs
const errorInfo = document.querySelector('#error_info')

// function
const showFormCategory = (flex, none) => {
  flex.style.display = 'flex'
  none.style.display = 'none'
}

if(addCategory){
  addCategory.addEventListener('click', function(){
    showFormCategory(formCategory, addCategory)
  })
} else if(editCategory || addProduct){
  editCategory.addEventListener('click', function(){
    showFormCategory(formEditCategory, editCategory)
    showFormCategory(formEditCategory, deleteCategory)
    showFormCategory(formEditCategory, titleCategory)
  })

  addProduct.addEventListener('click', function(){
    showFormCategory(formProduct, addProduct)
  })
} else if(editProduct) {
  editProduct.addEventListener('click', function(){
    showFormCategory(formEditProduct, editProduct)
    showFormCategory(formEditProduct, deleteProduct)
    showFormCategory(formEditProduct, infoProduct)
  })
} else if(errorInfo){
  console.log(errorInfo)
}