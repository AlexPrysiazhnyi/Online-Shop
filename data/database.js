const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

let database;

const connectToDB = async () => {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("online-shop");
};

const getDB = () => {
  if (!database) {
    throw new Error("You must connect first!");
  }
  return database;
};

module.exports = {
    connectToDB,
    getDB,
}