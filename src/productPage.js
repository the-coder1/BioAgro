// product.ejs
const editProduct = document.querySelector('#edit_product')
const formEditProduct = document.querySelector('#form_edit_product')
const deleteProduct = document.querySelector('#delete_product')
const infoProduct = document.querySelector('#info_product')

// function
const showFormCategory = (flex, none) => {
  flex.style.display = 'flex'
  none.style.display = 'none'
}

// error.ejs
const errorProduct = document.querySelector('#error_product')

if(editProduct) {
  editProduct.addEventListener('click', function(){
    showFormCategory(formEditProduct, editProduct)
    showFormCategory(formEditProduct, deleteProduct)
    showFormCategory(formEditProduct, infoProduct)
  })

  if(errorProduct){
    showFormCategory(formEditProduct, editProduct)
    showFormCategory(formEditProduct, deleteProduct)
    showFormCategory(formEditProduct, infoProduct)
  }
}