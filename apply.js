const xss = require('xss');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const { insert } = require('./db');
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

  check('phone')
    .matches(/^[0-9]{3}(-| )?[0-9]{4}$/)
    .withMessage('Símanúmer verður að vera sjö tölustafir'),

  check('text')
    .isLength({ min: 100 })
    .withMessage('Kynning verður að vera að minnsta kosti 100 stafir'),

  check('job')
    .isIn(['forritari', 'hönnuður', 'verkefnastjóri'])
    .withMessage('Velja verður starf'),

  sanitize('name')
    .trim()
    .escape(),
  sanitize('email')
    .normalizeEmail(),
  sanitize('phone')
    .blacklist('-')
    .toInt(),
  sanitize('text')
    .trim()
    .escape(),
];

/**
 * Route handler fyrir form umsóknar.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @returns {string} Formi fyrir umsókn
 */
function form(req, res) {
  const data = {
    title: 'Atvinnuumsókn',
    name: '',
    email: '',
    phone: '',
    text: '',
    job: '',
    errors: [],
  };
  res.render('form', data);
}

async function formPost(req, res) {
  const {
    body: {
      name, email, phone, text, job,
    } = {},
  } = req;

  let data = {
    title: 'Atvinnuumsókn',
    name: xss(name),
    email: xss(email),
    phone: xss(phone),
    text: xss(text),
    job: xss(job),
    errors: [],
  };

  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    data.errors = validation.array();
    return res.render('form', data);
  }

  await insert(data);

  data = {};
  return res.redirect('/thanks');
}

function thanks(req, res) {
  return res.render('thanks', { title: 'Takk fyrir' });
}

router.get('/', form);
router.post('/', formValidation, catchErrors(formPost));
router.get('/thanks', thanks);

module.exports = router;
