class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }

    this.totalQuantity++;
    this.totalPrice += product.price;
    this.items.push(cartItem);
  }

  updateItem(productId, updatedQuantity) {

    for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];

        if (item.product.id === productId && updatedQuantity > 0) {
            const cartItem = {...item};
            const quantityChange = updatedQuantity - item.quantity;
            cartItem.quantity = updatedQuantity;
            cartItem.totalPrice = updatedQuantity * item.product.price;
            this.items[i] = cartItem;
  
            this.totalQuantity += quantityChange;
            this.totalPrice += quantityChange * item.product.price;
            return;
        } else if (item.product.id === productId && updatedQuantity <= 0) {

        }
      }
    }
  }

module.exports = Cart;
