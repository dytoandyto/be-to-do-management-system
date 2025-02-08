var express = require('express'); //import express
var router = express.Router(); //import router dari express

// Greating API
router.get('/', function (req, res) {
  res.send('Selamat Datang\n Di Restful API PEmrograman Web Guru Tamu');
});

module.exports = router;
