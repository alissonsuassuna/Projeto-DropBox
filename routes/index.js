const express = require('express');
const router = express.Router();

const fs = require('fs')

const formidable = require('formidable')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/arquivo', (req, res) => {

  let formulario = new formidable.IncomingForm({
    uploadDir: './arquivosGuardados',
    keepExtensions: true
  })

  formulario.parse( req, (erro, campo, arquivos ) => {

    let path = './' + campo.path

    if(fs.existsSync(path)){

      fs.unlink(path, err => {

        if(err) {
          
          res.status(400).json({
            err
          })
        }else {

          res.json({
            campo: campo
          })
        }
      })
    }
  } )

})

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
