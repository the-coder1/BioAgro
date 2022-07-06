// index.ejs
const addCategory = document.querySelector("#add_category")
const formCategory = document.querySelector('#form_category')

// function
const showFormCategory = (flex, none) => {
  flex.style.display = 'flex'
  none.style.display = 'none'
}

// error.ejs
const error = document.querySelector('#error')

if(addCategory){
  addCategory.addEventListener('click', function(){
    showFormCategory(formCategory, addCategory)
  })

  if(error){
    showFormCategory(formCategory, addCategory)
  }
}