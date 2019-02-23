const express = require('express');

const { ensureLoggedIn, catchErrors } = require('./utils');
const { select, update, deleteRow } = require('./db');

const router = express.Router();

async function showApplications(req, res) {
  const applications = await select();
  res.render('applications', { applications, title: 'Umsóknir' });
}

async function processApplication(req, res) {
  const { id } = req.params;
  await update(id);
  return res.redirect('/applications');
}

async function deleteApplication(req, res) {
  const { id } = req.params;
  await deleteRow(id);
  return res.redirect('/applications');
}


router.get('/applications', ensureLoggedIn, showApplications);
router.post('/applications/process/:id', catchErrors(processApplication));
router.post('/applications/delete/:id', catchErrors(deleteApplication));

module.exports = router;
