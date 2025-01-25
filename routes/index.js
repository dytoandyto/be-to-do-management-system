var express = require('express'); //import express
var router = express.Router(); //import router dari express
const { pool } = require('../database/db'); //import pool dari db.js 

// GET all users
router.get('/', async (req, res) => { 
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
