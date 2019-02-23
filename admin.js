const express = require('express');

const { ensureLoggedIn, catchErrors } = require('./utils');
const { selectUsers, updateUsers } = require('./db');

const router = express.Router();

async function showUsers(req, res) {
  const users = await selectUsers();
  res.render('admin', { users, title: 'Notendur' });
}

function sortUsers(admin) {
  const a = [];
  const b = [];
  let prev;
  for (let i = 0; i < admin.length; i += 1) {
    if (admin[i] !== prev) {
      a.push(parseInt(admin[i], 10));
      b.push(false);
    } else {
      b[b.length - 1] = true;
    }
    prev = admin[i];
  }
  return [a, b];
}

async function updateAdmin(req, res) {
  const { admin } = req.body;
  const sortedAdmin = sortUsers(admin);

  await updateUsers(sortedAdmin[0], sortedAdmin[1]);

  return res.redirect('/admin');
}

router.get('/admin', ensureLoggedIn, catchErrors(showUsers));
router.post('/admin', catchErrors(updateAdmin));

module.exports = router;
