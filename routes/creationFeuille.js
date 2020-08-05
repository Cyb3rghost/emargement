var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const axios = require('axios').default;
const PDFDocument = require('pdfkit');
const fs = require('fs');
var Feuille = require('../models/FeuilleModel');
var Template = require('../models/TemplateModel');


router.post('/', function(req, res, next) {

    function headerPDF(doc, logo, intitule, organisme)
    {

        doc.image(logo, 100, 50, {width: 120})

        doc.fontSize(14);
        doc.text('FEUILLE D\'EMARGEMENT -> PERIODE EN FORMATION', 250, 50);
        doc.fontSize(10)
        doc.font('Helvetica-Bold').text('Intitulé : ' + intitule, 250, 75);
        doc.text('Organisme de formation : ' + organisme, 250, 100);

    }

    function bodyPDF(doc, apprenant, jourSemaine, formateur, departApprenant, finApprenant)
    {

        var startApprenant = 200
        /*doc.lineJoin('miter')
            .rect(100, 175, 140, 25)
            .stroke();*/

        doc.lineJoin('miter')
            .rect(100, 200, 140, 45)
            .stroke()
            .fontSize(9)
            .text('NOM PRENOM APPRENANT(E)', 105, 220);

        var tailleInitial = 245
        var tailleEvolution = 0

        for (let a = departApprenant; a < finApprenant; a++) {
            const element = apprenant[a];
            
            doc.lineJoin('miter')
            .rect(100, startApprenant + 45, 140, 35)
            .stroke()
            .text(element, 105, startApprenant + 55);

            startApprenant = startApprenant + 35
            tailleEvolution = tailleEvolution + 35

        }

        /*apprenant.forEach(element => {

            doc.lineJoin('miter')
            .rect(100, startApprenant + 45, 140, 35)
            .stroke()
            .text(element, 105, startApprenant + 55);

            startApprenant = startApprenant + 35
            tailleEvolution = tailleEvolution + 35

        });*/

        var startSignatureLigne = 210
        var startSignatureApremDescend = 210
        var startJour = 100
        var startJourAprem = 170

        jourSemaine.forEach(element => {
                    
                /* BLOC DATE */
                doc.lineJoin('miter')
                .rect(startJour + 140, 175, 140, 25)
                .stroke()
                .fontSize(12)
                .text('Le ' + element, startJour + 160 + 5, 185);

                doc.lineJoin('miter')
                .rect(startJour + 140, 200, 70, 45)
                .stroke()
                .fontSize(7)
                .text('MATIN(4h)', startJour + 140, 220, {
                    width: 70,
                    align: 'center'
                });

                doc.lineJoin('miter')
                .rect(startJourAprem + 140, 200, 70, 45)
                .stroke()
                .fontSize(7)
                .text('APRES-MIDI(3h)', startJourAprem + 140, 220, {
                    width: 70,
                    align: 'center'
                })

                for (let index = departApprenant; index < finApprenant; index++) {

                    doc.lineJoin('miter')
                    .rect(startJour + 140, startSignatureLigne + 35, 70, 35)
                    .stroke()

                    doc.lineJoin('miter')
                    .rect(startJourAprem + 140, startSignatureApremDescend + 35, 70, 35)
                    .stroke()

                    startSignatureLigne = startSignatureLigne + 35
                    startSignatureApremDescend = startSignatureApremDescend + 35
                    
                }

                startSignatureLigne = 210
                startSignatureApremDescend = 210
                startJour = startJour + 140
                startJourAprem = startJourAprem + 140
                

        });

        /* BLOC DATE */
        var tailleFinal = tailleInitial + tailleEvolution
        console.log('TAILLE FINAL : ' + tailleFinal)

        var positionDepart = 100
        var positionDepartText = 100

        formateur.forEach(element => {

            doc.lineJoin('miter')
            .rect(positionDepart + 140, tailleFinal, 140, 55)
            .stroke()
            .fontSize(8)
            .text('Nom Prénom Formateur(.rice)', positionDepartText + 140, tailleFinal + 5, {
                width: 140,
                align: 'center'
            })
            .fontSize(10)
            .text(element, {
                width: 140,
                align: 'center'
            });

            positionDepart = positionDepart + 140
            positionDepartText = positionDepartText + 140

        });

        doc.lineJoin('miter')
        .rect(positionDepart, tailleFinal + 100, 140, 60, {
            align: 'right'
        })
        .stroke()
        .fontSize(8)
        .text('Cachet organisme de formation:', positionDepart + 5 ,tailleFinal + 105, {
            width: 140
        })

    }

    console.log(req)

    const mongo = {
        uri: 'mongodb://localhost:27017/emargement',
        opt: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        }
    };
      
    mongoose.connect(mongo.uri, mongo.opt)

    /*console.log(req.body.urlGoogleSheet)
    console.log(req.body.intitule)*/

    if (req.body.urlGoogleSheet && req.body.template)
    {

        var url = req.body.urlGoogleSheet
        var separation = url.split('/')
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
    
    
            });

            Template.findById(req.body.template).then(result => {
          
                    // Create a document
                    const doc = new PDFDocument({
                        size: 'legal',
                        layout: 'landscape'
                    });

                    // Pipe its output somewhere, like to a file or HTTP response
                    // See below for browser usage
                    doc.pipe(fs.createWriteStream('output.pdf'));

                    headerPDF(doc, result.logo, result.intitule, result.organisme);
     
                    bodyPDF(doc, apprenant, jourSemaine, formateur, positionApprenant, indexApprenant);

                    var initialVar = 10

                    for (let i = positionApprenant; i <= apprenant.length; i++) {
                        //const element = array[i];

                        indexApprenant++;
                        positionApprenant++;
                        
                        if(indexApprenant === initialVar)
                        {

    
                            doc.addPage()
                            headerPDF(doc, result.logo, result.intitule, result.organisme);
                            bodyPDF(doc, apprenant, jourSemaine, formateur, positionApprenant, indexApprenant);

                            console.log('----- NOUVELLE PAGE ---')
                            console.log('TOTAL APPRENANT : ' + apprenant.length)
                            
                            console.log('POSITION APPRENANT : ' + positionApprenant)
                            console.log('INDEX APPRENANT : ' + indexApprenant)
                            console.log('----- NOUVELLE PAGE ---')

                            if(initialVar != apprenant.length)
                            {

                                initialVar = initialVar + 5

                            }
    
                        }

                        /*console.log('POSITION APPRENANT : ' + positionApprenant)
                        console.log('INDEX APPRENANT : ' + indexApprenant)*/
                        
                    }


                    // Finalize PDF file
                    doc.end();

                    var feuilleData = {
                        template: req.body.template,
                        urlSheet: req.body.urlGoogleSheet
                    }

                    console.log(apprenant)
                    console.log(jourSemaine)
                    console.log(formateur)

                    /*const feuillePage = new Feuille({
                        urlsheet: req.body.urlGoogleSheet,
                        intitule: req.body.intitule,
                        logo: '',
                        pdf: '',
                    });

                    feuillePage.save()
                    .then(() => res.redirect('/emargement'))
                    .catch(error => console.log(error))*/

                    //use schema.create to insert data into the db
                    Feuille.create(feuilleData, function (err) {
                        if (err) {
                        return next(err)
                        } else {

                        res.redirect('/emargement');

                        }
                    });
                
          
            });
    
            //console.log(response.data.feed.entry);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    } 

});

module.exports = router;