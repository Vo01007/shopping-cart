import {items} from "../data/products.js"
console.log(items)

const cartButtonElement = document.querySelector('.cartButton')
const shoppingCartElement = document.querySelector('.shoppingCart')
const main = document.querySelector('main')

class Products{
  getItems(){
    return items.map((item)=>{
        const product = new Product(item.id, item.title, item.price, item.image, item.category)
        return product.getHtml()
    }).join('')
  }
}
class Product{
  constructor(id, title,price,image,category) {
    this.id = id 
    this.title = title 
    this.price = price 
    this.image = image 
    this.category = category 
  }
  getHtml = () => {
    return `
      <div class="productContainer" >
        <div class="productImages" >
          <img src = ${this.image} alt = "" >
        </div>
        <div>
          <h2>${this.title}</h2>
          <p class="price">$${this.price}</p>
          <p>Category: ${this.category}</p>
        </div>
        <div class="buttonsContainer">
          <button class="addButton" data-product-id=${this.id}>Add to cart</button>
        </div>
      </div>`
  }
}



class UI {
  toggleVisibility = () => {
    if (shoppingCartElement.style.display === 'none' || shoppingCartElement.style.display === '') {
      shoppingCartElement.style.display = 'block'
      cartButtonElement.textContent = 'Hide Cart'
    }else {
      shoppingCartElement.style.display = 'none'
      cartButtonElement.textContent = 'Show Cart'
    }
  }
}
class Storage {
  constructor() {
    this.totalItems = 0
    this.subtotal = 0
    this.taxes = 0
    this.total = 0
  }
  addToCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

    cartItems.push(item)

    localStorage.setItem('cartItems',JSON.stringify(cartItems))
    this.updateTCartDisplay()
  }

  updateTCartDisplay = () => {
    const itemCountElement = document.getElementById('itemCount')
    const subtotalElement = document.getElementById('subtotal')
    const taxesElement = document.getElementById('taxes')
    const totalPriceElement = document.getElementById('totalPrice')

    let total = 0
    let itemCount = 0

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []

    const cartItemsHTML = cartItems.map((item) => {
      itemCount += 1
      total += item.price

      return `
      <div class="cartItem">
        <p><strong>${item.title}</strong>: $${item.price}</p>
      </div>`
    }).join('')

    shoppingCartElement.innerHTML = `
    <div class="buttonsContainer">
      <button id="clearCart">Clear Cart</button>
    </div>
    ${cartItemsHTML}
    <div class="cartSummary">
      <p id="itemCount">Total number of items: ${itemCount}</p>
      <p id="subtotal">Subtotal: $${total.toFixed(2)}</p>
      <p id="taxes">Taxes: $${(total * 0.0725).toFixed(2)}</p>
      <p id="totalPrice">Total: $${(total * 1.0725).toFixed(2)}</p>
    </div>`
  }
}

const ui = new UI()
const storage = new Storage()

const handleListener = () =>{
  cartButtonElement.addEventListener("click",ui.toggleVisibility)
  const addToCartButtons = document.getElementsByClassName('addButton')
  for (let button of addToCartButtons) {
    button.addEventListener("click", (event) => {
      const itemToAdd = items.find(item => item.id === parseInt(event.target.getAttribute('data-product-id')))
      storage.addToCart(itemToAdd)
    })
  }
}
const initialSetup = () =>{
  const products = new Products()
  main.innerHTML=products.getItems()
  storage.updateTCartDisplay()

  handleListener()
}

initialSetup()