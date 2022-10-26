const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session");

const mongoDBStore = mongoDBSession(session);
const sessionStore = new mongoDBStore({
  uri: "mongodb://127.0.0.1:27017",
  databaseName: "online-shop",
  collection: "sessions",
});

const configSession = () => {
  return session({
    secret: "This is an amazingly super-secret random-generated key!",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  });
};

module.exports = configSession;
