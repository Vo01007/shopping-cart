const cartButtonElement = document.querySelector('.cartButton')
const shoppingCartElement = document.querySelector('.shoppingCart')

class Products{

}

class UI{
  toggleVisibility = () =>{
    if (shoppingCartElement.style.display === 'none' || shoppingCartElement.style.display === ''){
      shoppingCartElement.style.display = 'block'
      cartButtonElement.textContent = 'Hide Cart'
    }else {
      shoppingCartElement.style.display = 'none'
      cartButtonElement.textContent = 'Show Cart'
    }
    // shoppingCartElement.style.display = (shoppingCartElement.style.display === 'none') ? 'block' : 'none'
  }
}

const ui = new UI()

const handleListener = () =>{
  cartButtonElement.addEventListener("click",ui.toggleVisibility)
}

handleListener()