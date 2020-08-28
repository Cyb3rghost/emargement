var express = require('express');
var router = express.Router();
var Feuille = require('../models/FeuilleModel');

/* GET users listing. */
router.get('/:id', function(req, res, next) {

  var id = req.params.id

  Feuille.findById(id).populate('template').exec().then(result => {

   var infoFeuille = result

   res.status(200).json({infoFeuille})

  });

});

module.exports = router;
