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
    this.updateTotalItems()
  }
  addToCart = (item) => {
    localStorage.setItem(item.id, JSON.stringify(item))
    this.updateTotalItems()
    this.updateCartHtml()
  }
  updateTotalItems = () => {
    this.totalItems = localStorage.length
  }
  updateCartHtml = () => {
    shoppingCartElement.innerHTML = this.getHtml()
  }
  getHtml = () => {
    return `
    <div class="buttonsContainer">
      <button>Clear Cart</button>
    </div>
    <div>
      <h2>${this.title}</h2>
      <p>Total number of items: ${this.totalItems}</p>
      <p>Subtotal: $0</p>
      <p>Taxes: $0</p>
      <p>Total: $0</p>
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
  storage.updateCartHtml()
  handleListener()
}

initialSetup()