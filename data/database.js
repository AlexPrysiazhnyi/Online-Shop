const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

let database;
let mongoDBUrl = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_URL) {
  mongoDBUrl = process.env.MONGODB_URL;
}

const connectToDB = async () => {
  const client = await MongoClient.connect(mongoDBUrl);
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