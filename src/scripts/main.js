const cartButtonElement = document.querySelector('.cartButton')
const shoppingCartElement = document.querySelector('.shoppingCart')

class Products{

}

class UI{
  toggleVisibility = () =>{
    
    shoppingCartElement.style.display = (shoppingCartElement.style.display === 'none') ? 'block' : 'none'
  }
}

const ui = new UI()

const handleListener = () =>{
  cartButtonElement.addEventListener("click",ui.toggleVisibility)
  console.log("click",cartButtonElement)
}

handleListener()