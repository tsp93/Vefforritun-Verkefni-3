const bcrypt = require('bcrypt');
const { query } = require('./db');

async function findByUsername(username) {
  const q = 'SELECT * FROM users WHERE username = $1';
  const user = await query(q, [username]);
  
  return user;
}

async function findById(id) {
  const q = 'SELECT * FROM users WHERE id = $1';
  const user = await query(q, [id]);
  
  return user;
}

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 11);

  const q = `
  INSERT INTO users
  (name, email, username, password)
  VALUES
  ($1, $2, $3, $4)`;
  const values = [data.name, data.email, data.username, hashedPassword];

  const result = await query(q, values);

  return result.rows[0];
}

async function comparePasswords(password, user) {
  const ok = await bcrypt.compare(password, user.password);

  if (ok) {
    return user;
  }

  return false;
}

module.exports = {
  findByUsername,
  findById,
  createUser,
  comparePasswords,
};
