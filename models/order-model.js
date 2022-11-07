const mongodb = require("mongodb");
const db = require("../data/database");

class Order {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  static transformDocument(dbDocument) {
    return new Order(
      dbDocument.productData,
      dbDocument.userData,
      dbDocument.status,
      dbDocument.date,
      dbDocument._id
    );
  }

  static transformMultipleDocuments(dbDocuments) {
    return dbDocuments.map(this.transformDocument);
  }
  async save() {
    const orderDocument = {
      productData: this.productData,
      userData: this.userData,
      date: new Date(),
      status: this.status,
    };
    await db.getDB().collection("orders").insertOne(orderDocument);
  }

  async update() {
    const ObjectId = mongodb.ObjectId;
    await db
      .getDB()
      .collection("orders")
      .updateOne(
        { _id: new ObjectId(this.id) },
        { $set: { status: this.status } }
      );
  }

  static async findAllOrders() {
    const orders = await db
      .getDB()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();
    return this.transformMultipleDocuments(orders);
  }

  static async findAllOrdersForUser(userId) {
    const ObjectId = mongodb.ObjectId;
    const orders = await db
      .getDB()
      .collection("orders")
      .find({ "userData._id": new ObjectId(userId) })
      .sort({ _id: -1 })
      .toArray();

    return this.transformMultipleDocuments(orders);
  }

  static async findOrderById(orderId) {
    const ObjectId = mongodb.ObjectId;
    const order = await db
      .getDB()
      .collection("orders")
      .findOne({ _id: new ObjectId(orderId) });
    return new Order(
      order.productData,
      order.userData,
      order.status,
      order.date,
      order._id
    );
  }
}

module.exports = Order;
