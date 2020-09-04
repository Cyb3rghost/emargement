var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var jwt  = require('jsonwebtoken');
var Lien = require('../../models/LienModel');


/* GET users listing. */
router.get('/:eleve/', function(req, res, next) {

        var eleve = req.params.eleve

        const mongo = {
            uri: 'mongodb://localhost:27017/emargement',
            opt: {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true
            }
        };
          
        mongoose.connect(mongo.uri, mongo.opt)

        mongoose.set('debug', true);


        //res.json(eleve)

        Lien.find({eleve: eleve.toUpperCase()}).sort({'_id': -1}).then(result => res.json(result))

        /*Lien.findOne({_id: '5f4f39404119e71d309a2d41' }, function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Result : ", docs); 
            } 
        });*/

});

module.exports = router;
