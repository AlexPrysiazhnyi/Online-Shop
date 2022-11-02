class Cart {
  constructor(items = []) {
    this.items = items;
  }

  addItem(productToAdd) {
    const cartItem = {
      product: productToAdd,
      quantity: 1,
      totalPrice: product.price * quantity,
    };

    this.items.forEach((item) => {
      if (item.product.id === productToAdd.id) {
        cartItem.quantity++;
        console.log(cartItem);
        // item = cartItem;
        return;
      }
    });

    this.items.push(cartItem);
  }
}

module.exports = Cart;
