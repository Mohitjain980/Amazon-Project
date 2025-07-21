import {cart , saveToStorage , updateCartQuantityDisplay} from '../data/cart.js'
import {products} from '../data/products.js'
import { formatCurrency } from './utils/formatCurrency.js';

let productHTML = '';
products.forEach((product) => {
  productHTML += `
       <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">

            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>

          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container product-quantity">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-addto-cart " data-product-ref = "${product.id}">
            Add to Cart
          </button>
        </div>`
});


    document.querySelector('.js-products-grid').innerHTML = productHTML



    // Add to cart starts from here.......................

    document.querySelectorAll('.js-addto-cart').forEach((button) =>{
          button.addEventListener('click', () => {

            let productId = button.dataset.productRef;
            let matchingItem; //saving matching item in the cart to variable

            //checking the cart for matching item
            cart.forEach((item) => {
              if (productId === item.productId){
                  matchingItem = item;
              }
            })


             // Find the quantity selector inside this specific product container
                let productContainer = button.closest('.product-container');
                const quantitySelect = productContainer.querySelector('select');
                const selectedQuantity = parseInt(quantitySelect.value);


              // If found, increase quantity; else add new item
                if (matchingItem){
                    matchingItem.quantity += selectedQuantity ;
                } else {
                  cart.push({
                  productId : productId,
                  quantity : selectedQuantity
                  
                })

                
                
                }
                saveToStorage();
            
                //Added to card message appears (productContainer uper se lia hai clossest wale se)
                
                const  addedMessage = productContainer.querySelector('.added-to-cart')

                //checking if timeout is running then cancel it
                if (addedMessage.timeoutId){
                   clearTimeout(addedMessage.timeoutId);
                }

                addedMessage.classList.add('added-to-cart-new')


                addedMessage.timeoutId = setTimeout(() => {
                addedMessage.classList.remove('added-to-cart-new');
                addedMessage.timeoutId = null ;
                }, 1500);
            
            console.log(cart)
            updateCartQuantityDisplay();
          })
        
    })

updateCartQuantityDisplay();
   
