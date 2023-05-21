const express = require('express');
const router = express.Router();
const user = require('../controllers/user');
// const base = require("../controllers/baseController");

const middlewares = require('../utils/middlewares');

/* GET home page. */
router.get('/', base.index);
router.post('/sum', base.sum);

module.exports = router;