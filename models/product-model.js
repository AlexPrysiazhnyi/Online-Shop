const db = require("../data/database");

class Product {
  constructor(productInfo) {
    this.title = productInfo.title;
    this.summary = productInfo.summary;
    this.price = +productInfo.price;
    this.description = productInfo.description;
    this.image = productInfo.image;
    this.imagePath = `product-data/images/${productInfo.image}`;
    this.imageUrl = `/products/assets/images/${productInfo.image}`;
    if (productInfo._id) {
      this.id = productInfo._id.toString();
    }
  }

  async save() {
    const productDocument = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    await db.getDB().collection("products").insertOne(productDocument);
  }

  static async fetchProducts() {}
}

module.exports = Product;
