var express = require('express');
var router = express.Router();
var Feuille = require('../models/FeuilleModel');
var User = require('../models/UserModel');
var Lien = require('../models/LienModel');
var QRCode = require('qrcode')

/* GET users listing. */
router.get('/:id', function(req, res, next) {

    var idSignature = req.params.id
 
    Lien.findById( idSignature ).then(result => {

        let timeCreated = result.createdAt; 
        let timeNow = new Date(); 
        let endTimer = timeNow - timeCreated; 
        var min = Math.floor((endTimer/1000/60) << 0)

        if(min > 10)
        {

            var expiration = true

        }
        else
        {

            var expiration = false

        }

        var opts = {
            errorCorrectionLevel: 'H',
            height: 500,
            width: 500
        }

        var retourSignature = result.feuille + '/' + result.jour + '/' + result.moment + '/' + result.indexLigne + '/' + result.eleve

        User.find( {username: result.eleve} ).then(resultDeux => {

            console.log(resultDeux[0].username)

            QRCode.toDataURL(retourSignature, opts, function (err, url) {

                res.render('../views/lienSignature', {
                    liens : result,
                    expiration: expiration,
                    qrcode: url,
                    validationInfos: retourSignature,
                    signatureEleve: resultDeux[0].signature
                });

            });

        });

    });



});

module.exports = router;
