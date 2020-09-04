var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var jwt  = require('jsonwebtoken');
var User = require('../../models/UserModel');


/* GET users listing. */
router.post('/', function(req, res, next) {

        var idUser = req.body.id
        var signature = req.body.signature

        User.findOneAndUpdate({_id: idUser}, {signature: signature}, function(err, user) {
            //...
                        
            res.json('Signature enregistré', 200)
        });


});

module.exports = router;
