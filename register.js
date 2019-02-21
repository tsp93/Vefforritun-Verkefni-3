const xss = require('xss');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const { findUser, insertUser } = require('./db');
const { catchErrors } = require('./utils');

const router = express.Router();

const formValidation = [
  check('name')
    .isLength({ min: 1 })
    .withMessage('Nafn má ekki vera tómt'),

  check('email')
    .isLength({ min: 1 })
    .withMessage('Netfang má ekki vera tómt'),

  check('email')
    .isEmail()
    .withMessage('Netfang verður að vera netfang'),

  check('username')
    .isLength({ min: 1 })
    .withMessage('Notendanafn má ekki vera tómt'),

  check('username')
    .custom(value => value !== findUser(value))
    .withMessage('Notendanafn er ekki laust'),

  check('password')
    .isLength({ min: 8 })
    .withMessage('Lykilorð verður að vera a.m.k. 8 stafir'),

  check('password2')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Lykilorð verða að vera eins'),

  sanitize('name')
    .trim()
    .escape(),
  sanitize('username')
    .trim()
    .escape(),
  sanitize('email')
    .normalizeEmail(),
];

/**
 * Route handler fyrir form nýskráningar
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @returns {string} Formi fyrir umsókn
 */
function form(req, res) {
  const data = {
    title: 'Nýskráning',
    name: '',
    email: '',
    username: '',
    errors: [],
  };
  res.render('register', data);
}

async function formPost(req, res) {
  const {
    body: {
      name, email, username, password, password2,
    } = {},
  } = req;

  let data = {
    title: 'Atvinnuumsókn',
    name: xss(name),
    email: xss(email),
    username: xss(username),
    password: xss(password),
    password2: xss(password2),
    errors: [],
  };

  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    data.errors = validation.array();
    return res.render('register', data);
  }

  await insertUser(data);

  data = {};
  return res.redirect('/thanks');
}

function thanks(req, res) {
  return res.render('thanks', { title: 'Takk fyrir' });
}

router.get('/register', form);
router.post('/register', formValidation, catchErrors(formPost));
router.get('/thanks', thanks);

module.exports = router;
