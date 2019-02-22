const express = require('express');
const { ensureLoggedIn, catchErrors } = require('./utils');

const router = express.Router;

// router.get('/admin', ensureLoggedIn, catchErrors(data));

module.exports = router;
