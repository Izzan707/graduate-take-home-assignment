const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const [newUser] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return newUser;
  }

  static async findUserByUsernameOrEmail (username, email)  {
    const [result] = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
    return result[0];
  }
}

module.exports = User;
