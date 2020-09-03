var express = require('express');
var router = express.Router();
var Feuille = require('../models/FeuilleModel');
var Template = require('../models/TemplateModel');
var Lien = require('../models/LienModel');

/* GET users listing. */
router.get('/:id/:ligne', function(req, res, next) {

    var idFeuille = req.params.id

    Feuille.findById(idFeuille).then(resultUn => {

        Lien.find({ feuille: idFeuille }).then(resultDeux => {

            res.render('../views/signature', {
                user: req.session.userId,
                username: req.session.userName,
                infosFeuille: resultUn,
                idFeuille: req.params.id,
                numLigne: req.params.ligne,
                liens : resultDeux
            });

        });

    });



});

module.exports = router;
