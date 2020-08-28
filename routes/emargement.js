var express = require('express');
var router = express.Router();
var Feuille = require('../models/FeuilleModel');
var Template = require('../models/TemplateModel');

/* GET users listing. */
router.get('/', function(req, res, next) {

  Template.find().then(result => {
      var template = result

      //test = JSON.parse(test)
      //.sort({'_id': -1})
      //console.log(template)

      Feuille.find().sort({'_id': -1}).populate('template').exec().then(resultdeux => {

        var feuilles = resultdeux

        res.render('../views/emargement', {
          user: req.session.userId,
          username: req.session.userName,
          listeTemplate: result,
          feuilles: feuilles
        });

      });

  });


});

module.exports = router;
