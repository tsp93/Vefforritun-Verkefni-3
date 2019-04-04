const express = require('express');

const { catchErrors, ensureLoggedIn, isAdmin } = require('./utils');
const { selectUsers, updateUsers } = require('./db');

const router = express.Router();

// Birtir alla notendur
async function showUsers(req, res) {
  const users = await selectUsers();
  res.render('admin', { users, title: 'Notendur' });
}

// Flokkar allt í fylki af fylkjum [[id], [admin]]
// þar sem admin er boolean gildi fyrir tilsvarandi user id
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

// Uppfærir notendur með ný admin gildi
async function updateAdmin(req, res) {
  const { admin } = req.body;
  const sortedAdmin = sortUsers(admin);

  await updateUsers(sortedAdmin[0], sortedAdmin[1]);

  return res.redirect('/admin');
}

router.get('/admin', ensureLoggedIn, isAdmin, catchErrors(showUsers));
router.post('/admin', ensureLoggedIn, isAdmin, catchErrors(updateAdmin));

module.exports = router;
