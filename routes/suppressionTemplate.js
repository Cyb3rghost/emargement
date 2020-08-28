var express = require('express');
var router = express.Router();
var fs = require('fs');
var Template = require('../models/TemplateModel');

/* GET users listing. */
router.get('/:id', function(req, res, next) {

  var id = req.params.id

  Template.findById(id).then(result => {

    var logoTemplate = result.logo

    console.log(logoTemplate)
    fs.unlink(logoTemplate,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');

        Template.findByIdAndDelete(id, function (err, doc) {
            if (err) {
                // handle error
                console.log(err)
            }

            res.redirect('/template')

        })

    });  
    //fs.unlink(logoTemplate)

  });

});

module.exports = router;
