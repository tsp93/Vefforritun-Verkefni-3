const express = require('express');

const { catchErrors, ensureLoggedIn, isAdmin } = require('./utils');
const { select, update, deleteRow } = require('./db');

const router = express.Router();

// Birtir umsóknir
async function showApplications(req, res) {
  const applications = await select();
  res.render('applications', { applications, title: 'Umsóknir' });
}

// Vinnur úr umsókn
async function processApplication(req, res) {
  const { id } = req.params;
  await update(id);
  return res.redirect('/applications');
}

// Eyðir umsókn
async function deleteApplication(req, res) {
  const { id } = req.params;
  await deleteRow(id);
  return res.redirect('/applications');
}


router.get('/applications', ensureLoggedIn, showApplications);
router.post('/applications/process/:id', ensureLoggedIn, catchErrors(processApplication));
router.post('/applications/delete/:id', ensureLoggedIn, isAdmin, catchErrors(deleteApplication));

module.exports = router;
