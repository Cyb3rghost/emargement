var express = require('express');
var router = express.Router();
var Feuille = require('../models/FeuilleModel');
var Template = require('../models/TemplateModel');
var Lien = require('../models/LienModel');
var QRCode = require('qrcode')

/* GET users listing. */
router.post('/', function(req, res, next) {

    var signatureEleve = req.body.signatureEleve
    var informationsSignature = req.body.infosSignature
    var separation = informationsSignature.split('/');
    var idFeuille = separation[0];
    var Jour = separation[1];
    var moment = separation[2];
    var indexLigne = separation[3];
    var eleve = separation[4];

    console.log(informationsSignature)

    var ancienTableau = []
    var nouveauTableauSignature = []
    var troisiemeTableau = []

    j1MatinSignature = ''
    j1ApremSignature = ''

    j2MatinSignature = ''
    j2ApremSignature = ''

    j3MatinSignature = ''
    j3ApremSignature = ''

    j4MatinSignature = ''
    j4ApremSignature = ''

    j5MatinSignature = ''
    j5ApremSignature = ''

    Feuille.findById( idFeuille ).then(result => {

        //5f4de1569188090dfc56b5f8/JOUR 5/Aprem/0/ELEVE1
        ancienTableau = result.signature

        for (let a = 0; a < result.signature[indexLigne].length; a++) {
            const element = result.signature[indexLigne];

            if(element[3] === Jour)
            {

                if(element[4] === moment)
                {

                    // ON MODIFIE INDEX 5
                    j1MatinSignature = signatureEleve

                }
                else
                {

                    j1MatinSignature = 'Pas de signature'

                }

                if(element[6] === moment)
                {

                    // ON MODIFIE INDEX 7
                    j1ApremSignature = signatureEleve

                }
                else
                {

                    j1ApremSignature = 'Pas de signature'

                }
                // On travail sur la ranger 4 à 7


            }
            else
            {

                j1MatinSignature = 'Pas de signature'
                j1ApremSignature = 'Pas de signature'

            }

            if(element[8] === Jour)
            {

                // On travail sur la ranger 9 à 12
                if(element[9] === moment)
                {

                    // ON MODIFIE INDEX 10
                    j2MatinSignature = signatureEleve

                }
                else
                {

                    j2MatinSignature = 'Pas de signature'

                }

                if(element[11] === moment)
                {

                    // ON MODIFIE INDEX 12
                    j2ApremSignature = signatureEleve

                }
                else
                {

                    j2ApremSignature = 'Pas de signature'

                }


            }
            else
            {

                j2MatinSignature = 'Pas de signature'
                j2ApremSignature = 'Pas de signature'


            }


            if(element[13] === Jour)
            {

                // On travail sur la ranger 14 à 17
                if(element[14] === moment)
                {

                    // ON MODIFIE INDEX 15
                    j3MatinSignature = signatureEleve

                }
                else
                {

                    j3MatinSignature = 'Pas de signature'

                }

                if(element[16] === moment)
                {

                    // ON MODIFIE INDEX 17
                    j3ApremSignature = signatureEleve

                }
                else
                {

                    j3ApremSignature = 'Pas de signature'

                }

            }
            else
            {

                j3MatinSignature = 'Pas de signature'
                j3ApremSignature = 'Pas de signature'

            }

            if(element[18] === Jour)
            {

                // On travail sur la ranger 14 à 17
                if(element[19] === moment)
                {

                    // ON MODIFIE INDEX 20
                    j4MatinSignature = signatureEleve

                }
                else
                {

                    j4MatinSignature = 'Pas de signature'

                }

                if(element[21] === moment)
                {

                    // ON MODIFIE INDEX 22
                    j4ApremSignature = signatureEleve

                }
                else
                {

                    j4ApremSignature = 'Pas de signature'

                }

            }
            else
            {

                j4MatinSignature = 'Pas de signature'
                j4ApremSignature = 'Pas de signature'

            }


            if(element[23] === Jour)
            {

                // On travail sur la ranger 24 à 27
                // On travail sur la ranger 14 à 17
                if(element[24] === moment)
                {

                    // ON MODIFIE INDEX 25
                    j5MatinSignature = signatureEleve

                }
                else
                {

                    j5MatinSignature = 'Pas de signature'

                }

                if(element[26] === moment)
                {

                    // ON MODIFIE INDEX 27
                    j5ApremSignature = signatureEleve

                }
                else
                {

                    j5ApremSignature = 'Pas de signature'

                }

            }
            else
            {

                j5MatinSignature = 'Pas de signature'
                j5ApremSignature = 'Pas de signature'


            }


            
        }

        nouveauTableauSignature.push(['Page', result.signature[indexLigne][1], result.signature[indexLigne][2], result.signature[indexLigne][3], 'Matin', j1MatinSignature, 'Aprem', j1ApremSignature, result.signature[indexLigne][8], 'Matin', j2MatinSignature, 'Aprem', j2ApremSignature
        ,  result.signature[indexLigne][13],  'Matin', j3MatinSignature, 'Aprem', j3ApremSignature,  result.signature[indexLigne][18], 'Matin', j4MatinSignature, 'Aprem', j4ApremSignature
        ,  result.signature[indexLigne][23],  'Matin', j5MatinSignature, 'Aprem', j5ApremSignature])

        /*console.log(ancienTableau[indexLigne])
        console.log(nouveauTableauSignature[indexLigne])*/

        for (let c = 0; c < ancienTableau.length; c++) {
            const element = ancienTableau[c];

            //console.log(nouveauTableauSignature[indexLigne])

            if(c == indexLigne)
            {

                troisiemeTableau.push(nouveauTableauSignature[indexLigne])


            }
            else
            {

                troisiemeTableau.push(element)

            }
            
        }

        Feuille.findById( idFeuille ).then(resultDeux => {

            resultDeux.signature = [];

            return resultDeux.save();
        
        }).then(resulTrois => {

            troisiemeTableau.forEach(element => {
                
                resulTrois.signature.push(element)

            });

            return resulTrois.save();

        }).then(resultQuatre => {

            res.redirect('/emargement')

        });

        //console.log(troisiemeTableau)

    });


});

module.exports = router;
