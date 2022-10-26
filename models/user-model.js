const bcrypt = require("bcryptjs");
const db = require("../data/database");

class User {
  constructor(email, password, name, address, city, province, postal, unit) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.address = {
      address,
      city,
      province,
      "postal-code": postal,
      unit,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const user = {
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    };
    await db.getDB().collection("users").insertOne(user);
  }

  async userExists() {
    this.existingUser = await db
      .getDB()
      .collection("users")
      .findOne({ email: this.email });
    return this.existingUser;
  }

  async passwordIsCorrect() {
    const passwordIsCorrect = await bcrypt.compare(
      this.password,
      this.existingUser.password
    );
    return passwordIsCorrect;
  }

  async login() {}
}

module.exports = User;
