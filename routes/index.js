const express = require('express');
const router = express.Router();

const formidable = require('formidable')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/arquivosGuardados', (req, res) =>{

  let formulario = new formidable.IncomingForm({
    uploadDir: './arquivosGuardados',
    keepExtensions: true
  })

  formulario.parse( req, (erro, campo, arquivos ) => {

    res.json({
      arquivos: arquivos
    })
  } )
} )

module.exports = router;
