var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aplicacion cliente' });
  res.render('index', { tabla:'Listar Estudiantes'});
});

module.exports = router;
