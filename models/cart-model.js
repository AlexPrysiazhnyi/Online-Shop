const Product = require("./product-model");

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
        cartItem.quantity = +item.quantity + 1;
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
        const cartItem = { ...item };
        const quantityChange = updatedQuantity - item.quantity;
        cartItem.quantity = updatedQuantity;
        cartItem.totalPrice = updatedQuantity * item.product.price;
        this.items[i] = cartItem;

        this.totalQuantity += quantityChange;
        this.totalPrice += quantityChange * item.product.price;
        return this.items[i].totalPrice;
      } else if (item.product.id === productId && updatedQuantity <= 0) {
        this.items.splice(i, 1);
        this.totalQuantity -= item.quantity;
        this.totalPrice -= item.totalPrice;
        return;
      }
    }
  }

  async updatePrices() {
    const productIds = this.items.map(item => item.product.id);

    const products = await Product.findMultipleProducts(productIds);

    const deletableCartItemProductIds = [];

    for (const cartItem of this.items) {
      const product = products.find(prod => prod.id === cartItem.product.id);

      if (!product) {
        deletableCartItemProductIds.push(cartItem.product.id);
        continue;
      }

      cartItem.product = product;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    }

    if (deletableCartItemProductIds.length > 0) {
      this.items = this.items.filter(
        item => deletableCartItemProductIds.indexOf(item.product.id) < 0
      );
    }

    this.totalQuantity = 0;
    this.totalPrice = 0;

    this.items.forEach((item) => {
      this.totalQuantity = this.totalQuantity + item.quantity;
      this.totalPrice = this.totalPrice + item.totalPrice;
    });
  }
}

module.exports = Cart;
