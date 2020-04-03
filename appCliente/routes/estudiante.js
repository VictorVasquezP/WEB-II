var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/registro', function(req, res, next) {
  res.render('register', { title: 'Registro de Estudiante' });
  
});
router.get('/buscar', function(req, res, next) {
    res.render('search', { title: 'Buscar Estudiante' });
    
});
router.get('/eliminar', function(req, res, next) {
    res.render('delete', { title: 'Eliminar Estudiante' });
});

router.get('/actualizar', function(req, res, next) {
    res.render('updateData', { title: 'Actualizar datos del estudiante' });
    
});
  
  
  
module.exports = router;