import {cart,removeFromCart} from '../data/cart.js'
import { products } from '../data/products.js'
import { formatCurrency } from '../utils/money.js';
import { calculateCartQuantity } from '../data/cart.js';
import  dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from '../data/deliveryOptions.js';

const today=dayjs();
const deliveryDate=today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM D'));

let CardSummaryHtml='';
cart.forEach((cartItem)=>{
  const product_id=cartItem.product_id;
 
  let matchingProduct;

  products.forEach((product)=>{
    if(product.id===product_id){
        matchingProduct=product;
    }
  });
  
  const deliveryOptionId=cartItem.deliveryOptionId;
  
  let deliveryOption;

  deliveryOptions.forEach((option)=>{
    if(option.id===deliveryOptionId){
      deliveryOption=option;
    }
  });

const today=dayjs();
    const deliveryDate=today.add(
    deliveryOption.deliveryDays,
    'days'
    );
    const dateString=deliveryDate.format('dddd, MMMM D');

CardSummaryHtml+=`
 <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"data-update-product=${matchingProduct.id}>
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary">Save</span>
                  
                  <span class="delete-quantity-link link-primary js-delete-link"data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>
            <div class="delivery-options">
             <div class="delivery-options-title">
               Choose a delivery option:
             </div>
              ${deliveryOptionsHTML(matchingProduct , cartItem)}
              </div>
            </div>
          </div>
`
})

function deliveryOptionsHTML(matchingProduct,cartItem){
  let html=' ';
   deliveryOptions.forEach((deliveryOptions)=>{
     const today=dayjs();
     const deliveryDate=today.add(
      deliveryOptions.deliveryDays,
      'days'
     );
     const dateString=deliveryDate.format('dddd, MMMM D');
    const priceString =deliveryOptions.priceCents===0 ? "FREE"  : `$${formatCurrency(deliveryOptions.priceCents)} -`;
    
    const isChecked = deliveryOptions.id===cartItem.deliveryOptionId;
    html+=
  `
    <div class="delivery-option">
      <input type="radio" 
      ${ isChecked ? 'checked':''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
         ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>`
   })
   return html;
}

document.querySelector('.order-summary').innerHTML=CardSummaryHtml;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
  const productId= link.dataset.productId;
  removeFromCart(productId);

 const container= document.querySelector(`.js-cart-item-container-${productId}`);
 container.remove();
 update_Checkout();

  })
})

document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const updateProductId = link.dataset.updateProduct;
    const container = document.querySelector(`.js-cart-item-container-${updateProductId}`);
    container.classList.add('is-editing-quantity');
  })
})

update_Checkout();

function update_Checkout(){
  let cart_quantity=calculateCartQuantity();
  document.querySelector('.js-checkout').innerHTML=`Checkout ${cart_quantity}`;
}