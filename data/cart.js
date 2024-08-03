export  const cart=[{
    product_id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2
    },
    {
        product_id:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity:1
    }
];

export function addtocart(product_id){
    let matchingItem;
  
    cart.forEach((cartItem)=>{
    if(product_id===cartItem.product_id){
       matchingItem=cartItem
    }
    });
     
    if(matchingItem){
      matchingItem.quantity+=1;
    }else{
      cart.push({
        product_id:product_id,
        quantity:1
      });
    }
  }
  