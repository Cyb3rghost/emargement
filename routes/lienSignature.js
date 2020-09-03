var express = require('express');
var router = express.Router();
var Feuille = require('../models/FeuilleModel');
var Template = require('../models/TemplateModel');
var Lien = require('../models/LienModel');
var QRCode = require('qrcode')

/* GET users listing. */
router.get('/:id/', function(req, res, next) {

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

        QRCode.toDataURL(retourSignature, opts, function (err, url) {

            res.render('../views/lienSignature', {
                liens : result,
                expiration: expiration,
                qrcode: url
            });

        });

    });



});

module.exports = router;
