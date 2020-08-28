var express = require('express');
var router = express.Router();
var multer  = require('multer');
var path = require('path');
var fs = require('fs');
var Template = require('../models/TemplateModel');

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const uploadImage = multer({ storage: imageStorage }).single('logo');

/* GET users listing. */
router.post('/', uploadImage, function(req, res, next) {

  const imageFile = req.file;
  var idTemplate = req.body.idTemplate
  var nomTemplate = req.body.nomTemplate
  var organisme = req.body.organisme
  var intitule = req.body.intitule
  var ancienLogo = req.body.ancienLogo

  if(imageFile != undefined)
  {

        fs.unlink(ancienLogo,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');

            console.log(imageFile)
            const imageUploaded = imageFile.path.replace("\\", "/"); // uniquement sous windows
        
            Template.findOne({ _id: idTemplate }, function (err, doc){
                doc.logo = imageUploaded;
                doc.nomTemplate = nomTemplate;
                doc.organisme = organisme;
                doc.intitule = intitule;
                doc.save().then(resultat => {
            
            
                    res.redirect('/template');
            
                })
                .catch(error => console.log(error));
            });

        }); 

  }
  else
  {

    Template.findOne({ _id: idTemplate }, function (err, doc){
        doc.nomTemplate = nomTemplate;
        doc.organisme = organisme;
        doc.intitule = intitule;
        doc.save().then(resultat => {
    
    
            res.redirect('/template');
    
        })
        .catch(error => console.log(error));
      });
    
  }

});

module.exports = router;
