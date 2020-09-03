var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt  = require('jsonwebtoken');
var User = require('../../models/UserModel');


/* GET users listing. */
router.post('/', function(req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if(req.method == 'OPTIONS'){
        res.sendStatus(200);
    }

    var idUser = req.body.id
    var signature = req.body.signature

    const mongo = {
        uri: 'mongodb://localhost:27017/emargement',
        opt: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        }
    };
      
    mongoose.connect(mongo.uri, mongo.opt)

    res.json(idUser, 200)

    


});

module.exports = router;
