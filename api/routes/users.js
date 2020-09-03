var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const bcrypt = require('bcrypt');
var jwt  = require('jsonwebtoken');
var User = require('../../models/UserModel');
var Cookies = require( "cookies" );


/* GET users listing. */
router.get('/:email/:password', function(req, res, next) {

    var email = req.params.email
    var mdp = req.params.password

    const mongo = {
        uri: 'mongodb://localhost:27017/emargement',
        opt: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        }
    };
      
    mongoose.connect(mongo.uri, mongo.opt)

    if(idUser && mdp)
    {

        User.findOne({ email: email })
            .exec(function (err, user) {
            if (err) {
                return next(err)
            } else if (!user) {
                res.json('Erreur user not found', 401)
            }
            bcrypt.compare(mdp, user.password, function (err, result) {
                if (result === true) {
                    
                    var token = jwt.sign(result, 'secret');

                    new Cookies(req,res).set('access_token',token , {
                        httpOnly: true
                    });

                    res.status(200).send({
                        message: 'Enjoy your token!',
                        xsrfToken : token
                    });

                } else {
                    res.json('Erreur', 500)

                }
            })
        });


    }


});

module.exports = router;
