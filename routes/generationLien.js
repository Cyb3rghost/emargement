var express = require('express');
var router = express.Router();
var Feuille = require('../models/FeuilleModel');
var Template = require('../models/TemplateModel');
var Lien = require('../models/LienModel');

/* GET users listing. */
router.post('/', function(req, res, next) {


    var jour = req.body.jour
    var moment = req.body.jsignature
    var idFeuille = req.body.idFeuille
    var indexLigne = req.body.indexLigne

    if (req.body.jour && req.body.jsignature)
    {

        Feuille.findById(idFeuille).then(resultUn => {

            var lienData = {
                feuille: idFeuille,
                jour: jour,
                moment: moment,
                indexLigne: indexLigne,
                eleve: resultUn.signature[indexLigne][2],
                urlSignature: '/lien-signature/' + jour + ' /' + moment + '/' + idFeuille + '/' + indexLigne + '/' + resultUn.signature[indexLigne][2]
            }

            //use schema.create to insert data into the db
            Lien.create(lienData, function (err) {
                if (err) {
                return next(err)
                } else {

                res.redirect('/signature/' + idFeuille + '/' + indexLigne);

                }
            });
            //res.send('/lien-signature/' + jour + ' /' + moment + '/' + idFeuille + '/' + indexLigne + '/' + resultUn.signature[indexLigne][2])

        });

    }


});

module.exports = router;
