function viewPhoto(id){
  const inputImage = document.querySelector(`#${id}`)
  const valueInputImage = inputImage.attributes.value.nodeValue

  if(valueInputImage !== '/' ){
    let urlExists = valueInputImage

    document.querySelector(`#${id}-preview img`).src = urlExists
  }
  
  inputImage.addEventListener('change', (e) => {
    if(e.target.files == 0){
      return
    }

    let file = e.target.files[0]
    let url = URL.createObjectURL(file)

    document.querySelector(`#${id}-preview img`).src = url
  })
}

viewPhoto('imageProduct')