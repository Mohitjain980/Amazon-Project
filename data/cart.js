
export let cart = JSON.parse(localStorage.getItem('cart')) || [];




// saving cart to local storage 

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

//only saving those items to cart which are not matching with deleteing item id 
export function deleteCartItem(productID) {
  cart = cart.filter(cartItem => cartItem.productId != productID);
  saveToStorage();

}

// calculate the quantity of cart
export function updateCartQuantityDisplay() {
  let totalQuantity = 0;
  cart.forEach((itemQuantity) => {
    totalQuantity += itemQuantity.quantity

  })

  document.querySelector('.js-cart-quantity').innerHTML = totalQuantity
  console.log(totalQuantity)

}


console.log(JSON.parse(localStorage.getItem('cart')))


export function updateCheckoutHeaderQuantity() {

  let totalQuantity = 0;
  cart.forEach((itemQuantity) => {
    totalQuantity += itemQuantity.quantity

  })

  const returnToHomeLink = document.querySelector('.js-return-to-home-link');
  if (returnToHomeLink) {
    returnToHomeLink.innerHTML = `${totalQuantity} item${totalQuantity !== 1 ? 's' : ''}`;
  }
}

