//category.ejs
const editCategory = document.querySelector('#edit_category')
const formEditCategory = document.querySelector('#form_edit_category')
const deleteCategory = document.querySelector('#delete_category')
const titleCategory = document.querySelector('#title_category')

const addProduct = document.querySelector('#add_product')
const formProduct = document.querySelector('#form_product')

// function
const showFormCategory = (flex, none) => {
  flex.style.display = 'flex'
  none.style.display = 'none'
}

// error.ejs
const error = document.querySelector('#error')
const errorProduct = document.querySelector('#error_product')

if(editCategory){
  editCategory.addEventListener('click', function(){
    showFormCategory(formEditCategory, editCategory)
    showFormCategory(formEditCategory, deleteCategory)
    showFormCategory(formEditCategory, titleCategory)
  })

  if(error){
    showFormCategory(formEditCategory, editCategory)
    showFormCategory(formEditCategory, deleteCategory)
    showFormCategory(formEditCategory, titleCategory)
  }
}

if(addProduct){
  addProduct.addEventListener('click', function(){
    showFormCategory(formProduct, addProduct)
  })

  if(errorProduct){
    showFormCategory(formProduct, addProduct)
  }
}