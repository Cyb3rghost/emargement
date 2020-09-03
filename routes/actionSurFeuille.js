var express = require('express');
var router = express.Router();
var fs = require('fs');
const axios = require('axios').default;
const PDFDocument = require('pdfkit');
var Template = require('../models/TemplateModel');
var Feuille = require('../models/FeuilleModel');

/* GET users listing. */
router.post('/', function(req, res, next) {

    var idTemplate = req.body.idTemplate
    var idFeuille = req.body.idFeuille
    var urlSheet = req.body.urlSheet
    var positionSignatureTableau = [];
    var Signature = [];


    switch (req.body.action) {
        case 'Synchronisation':
            var separation = urlSheet.split('/')
            var reelUrl = separation[5]
            
            axios.get('https://spreadsheets.google.com/feeds/cells/' + reelUrl + '/1/public/full?alt=json')
            .then(function (response) {
                // handle success
                var dataSheet = response.data.feed.entry;
                // element.gs$cell.inputValue -> Recupere les informations.
                // element.gs$cell.col -> 2, 4, 6, 8, 10 -> row 1
                // 
        
                var jourSemaine = [];
                var apprenant = [];
                var formateur = [];
                var indexApprenant = 5
                var positionApprenant = 0
        
        
                dataSheet.forEach(element => {
        
                    if(element.gs$cell.col === '1')
                    {
        
                        if(element.gs$cell.inputValue != "APPRENANT")
                        {
        
                            apprenant.push(element.gs$cell.inputValue)
        
                        }
        
                    }
        
                    if(element.gs$cell.col === '2')
                    {
        
                        if(element.gs$cell.inputValue != "DATE")
                        {
        
                            jourSemaine.push(element.gs$cell.inputValue)
        
                        }
        
                    }
        
                    if(element.gs$cell.col === '3')
                    {
        
                        if(element.gs$cell.inputValue != "FORMATEUR")
                        {
        
                            formateur.push(element.gs$cell.inputValue)
        
                        }
        
                    }

                    Feuille.findOne({ _id: idFeuille }, function (err, doc){
                        doc.apprenant = apprenant;
                        doc.jourSemaine = jourSemaine;
                        doc.formateur = formateur;
                        doc.save().then(resultat => {
                    
                            res.redirect('/emargement');
                    
                        })
                        .catch(error => console.log(error));
                    });
        
        
                });


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            break;
        default:
            break;
    }


});

module.exports = router;
