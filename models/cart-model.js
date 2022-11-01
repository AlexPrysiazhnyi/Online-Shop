class Cart {
  constructor(items = []) {
    this.items = items;
  }

  addItem(product) {
    const cartItem = {
      product,
      quantity: 1,
      totalPrice: product.price * quantity,
    };

    this.items.forEach((item) => {
      if (item.product.id === product.id) {
        cartItem.quantity++;
        item = cartItem;
        return;
      }
    });

    this.items.push(cartItem);
  }
}

module.exports = Cart;
