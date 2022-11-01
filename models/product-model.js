const mongo = require("mongodb");
const db = require("../data/database");

class Product {
  constructor(productInfo) {
    this.title = productInfo.title;
    this.summary = productInfo.summary;
    this.price = +productInfo.price;
    this.description = productInfo.description;
    this.image = productInfo.image;
    if (productInfo._id) {
      this.id = productInfo._id.toString();
    }
    this.setImagePathAndUrl();
  }

  setImagePathAndUrl() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/data/multimedia/images/${this.image}`;
  }

  replaceImage(newImageFile) {
    this.image = newImageFile.filename;
    this.setImagePathAndUrl();
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

  static async fetchProducts() {
    const products = await db.getDB().collection("products").find().toArray();
    return products.map((productDocument) => {
      return new Product(productDocument);
    });
  }

  static async findSingleProduct(id) {
    let ObjectId;
    try {
      ObjectId = mongo.ObjectId;
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const singleProduct = await db
      .getDB()
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!singleProduct) {
      const error = new Error("Product with provided ID not found!");
      error.code = 404;
      throw error;
    }
    return new Product(singleProduct);
  }

  async updateProduct(product) {
    const ObjectId = mongo.ObjectId;
    await db
      .getDB()
      .collection("products")
      .updateOne(
        { _id: new ObjectId(this.id) },
        {
          $set: product,
        }
      );
  }

  static async deleteProduct(id) {
    const ObjectId = mongo.ObjectId;
    await db
      .getDB()
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Product;
