var express = require('express');
var router = express.Router();
var Template = require('../models/TemplateModel');

/* GET users listing. */
router.get('/:id', function(req, res, next) {

  var id = req.params.id

  Template.findById(id).then(result => {

   var infoTemplate = result

   res.status(200).json({infoTemplate: infoTemplate})

  });

});

module.exports = router;
