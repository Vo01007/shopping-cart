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
          <p className="price">$${this.price}</p>
          <p>Category: ${this.category}</p>
        </div>
        <div class="buttonsContainer">
          <button>Add to cart</button>
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

const ui = new UI()

const handleListener = () =>{
  cartButtonElement.addEventListener("click",ui.toggleVisibility)
}
const initialSetup = () =>{
  const ui = new UI()
  const products = new Products()
  main.innerHTML=products.getItems()
  handleListener()
}

initialSetup()