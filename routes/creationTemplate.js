var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer  = require('multer');
var path = require('path');
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


router.post('/', uploadImage, function(req, res, next) {

    const mongo = {
        uri: 'mongodb://localhost:27017/emargement',
        opt: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        }
    };
      
    mongoose.connect(mongo.uri, mongo.opt)

    if (req.body.organisme && req.body.intitule)
    {

        const imageFile = req.file;
        const imageUploaded = imageFile.path.replace("\\", "/"); // uniquement sous windows

        var templateData = {
            nomTemplate: req.body.nom_template,
            organisme: req.body.organisme,
            logo: imageUploaded,
            intitule: req.body.intitule
          }

          //use schema.create to insert data into the db
          Template.create(templateData, function (err) {
            if (err) {
              return next(err)
            } else {

              res.redirect('/template');

            }
          });

    }


});

module.exports = router;