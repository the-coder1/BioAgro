function viewPhoto(id){
  document.querySelector(`#${id}`).addEventListener('change', (e) => {
    if(e.target.files == 0){
      return
    }

    let file = e.target.files[0]
    let url = URL.createObjectURL(file)

    document.querySelector(`#${id}-preview img`).src = url
  })
}

viewPhoto('imageProduct')