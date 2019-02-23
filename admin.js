const express = require('express');

const { ensureLoggedIn, catchErrors } = require('./utils');
const { selectUsers } = require('./db');

const router = express.Router();

async function showUsers(req, res) {
  const users = await selectUsers();
  res.render('admin', { users, title: 'Notendur' });
}

router.get('/admin', ensureLoggedIn, catchErrors(showUsers));

module.exports = router;
