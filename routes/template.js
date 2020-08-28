var express = require('express');
var router = express.Router();
var Template = require('../models/TemplateModel');

/* GET users listing. */
router.get('/', function(req, res, next) {

  Template.find().sort({'_id': -1}).then(result => {
      var template = result

      res.render('../views/templates', {
        user: req.session.userId,
        username: req.session.userName,
        listeTemplate: result
      });

  });


});

module.exports = router;
