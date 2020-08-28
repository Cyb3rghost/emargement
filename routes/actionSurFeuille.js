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
    var Signature = [];

    function headerPDF(doc, logo, intitule, organisme)
    {

        doc.image(logo, 100, 50, {width: 120})

        doc.fontSize(14);
        doc.text('FEUILLE D\'EMARGEMENT -> PERIODE EN FORMATION', 250, 50);
        doc.fontSize(10)
        doc.font('Helvetica-Bold').text('Intitulé : ' + intitule, 250, 75);
        doc.text('Organisme de formation : ' + organisme, 250, 100);

    }

    function bodyPDF(doc, apprenant, jourSemaine, listeSignature, formateur, departApprenant, finApprenant)
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

                    if(listeSignature.length === 0)
                    {

                        Signature.push([jourSemaine[index], apprenant[index], 'Matin', parseInt(startJour + 140), parseInt(startSignatureLigne + 35), 'Pas de signature', 'Aprem', parseInt(startJourAprem + 140), parseInt(startSignatureApremDescend + 35), 'Pas de signature'])

                    }

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

        var positionDepart = 100
        var positionDepartText = 100

        /* ON GERE L'INSERTION DES SIGNATURES */
        for (let indexo = 0; indexo < listeSignature.length; indexo++) {
            const elementSignature = listeSignature[indexo];
            
            if(elementSignature[5] != 'Pas de signature')
            {

                doc.image(elementSignature[5], elementSignature[3], elementSignature[4], {width: 70})

            }

            if(elementSignature[9] != 'Pas de signature')
            {

                doc.image(elementSignature[9], elementSignature[7], elementSignature[8], {width: 70})

            }


        }
        /* ON GERE L'INSERTION DES SIGNATURES */

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



    switch (req.body.action) {
        case 'Générer le pdf':
        
                var jourSemaine = [];
                var apprenant = [];
                var formateur = [];
                var indexApprenant = 5
                var positionApprenant = 0
                var Signature = [];
        
                Feuille.findById(idFeuille).then(resultUn => {

                   
                    Template.findById(idTemplate).then(result => {
          
                        // Create a document
                        const doc = new PDFDocument({
                            size: 'legal',
                            layout: 'landscape',
                            autoFirstPage: false
                        });
    
                        var urlPDF = 'uploads/pdf/' + new Date().getTime() + '_V' + resultUn.__v + '.pdf';
    
                        // Pipe its output somewhere, like to a file or HTTP response
                        // See below for browser usage
                        doc.pipe(fs.createWriteStream(urlPDF));
    
                        /*headerPDF(doc, result.logo, result.intitule, result.organisme);
         
                        bodyPDF(doc, apprenant, jourSemaine, formateur, positionApprenant, indexApprenant);*/
    
                        compteur = 1;
                        debut = 0;
                        fin = 5;
    
                        resultUn.apprenant.forEach(element => {
                            
                            

                            if(compteur === 5)
                            {
    
                                doc.addPage()
                                headerPDF(doc, result.logo, result.intitule, result.organisme);
                                bodyPDF(doc, resultUn.apprenant, resultUn.jourSemaine, resultUn.signature, resultUn.formateur, debut, fin);
    
                                compteur = 0;
                                debut = debut + 5 
                                fin = fin + 5 
    
                            }
    
                            compteur++;
    
                        });
    
                        // SA SERT A CORRIGER LA VRAI FIN DU TABLEAU ET RAJOUTER CE QUI RESTE.
                        if(fin != resultUn.apprenant.length)
                        {
                            fin = fin - 5
    
                            doc.addPage()
                            headerPDF(doc, result.logo, result.intitule, result.organisme);
                            bodyPDF(doc, resultUn.apprenant, resultUn.jourSemaine, resultUn.signature, resultUn.formateur, fin, resultUn.apprenant.length);
    
    
                        }
    
                        // Finalize PDF file
                        doc.end();
    
                        Feuille.findOne({ _id: idFeuille }, function (err, doc){

                            if(resultUn.signature.length === 0)
                            {

                                /* GENERATION DE LA FORME FINAL DES SIGNATURES */
                                PositionSignature = [];

                                resultUn.apprenant.forEach(element => { // POUR LE NOMBRE D'APPRENANT , ON RECONSTRUIT LE TABLEAU DE SIGNATURE EN REGROUPANT PAR NOM D'APPRENANT.

                                    for (let index = 0; index < Signature.length; index++) {

                                        if(Signature[index][1] === element)
                                        {
                                            
                                            PositionSignature.push([Signature[index][0], Signature[index][1], Signature[index][2], Signature[index][3], Signature[index][4]
                                            , Signature[index][5], Signature[index][6], Signature[index][7], Signature[index][8], Signature[index][9]])

                                        }

                                        
                                    }

                                });

                                /* GENERATION DE LA FORME FINAL DES SIGNATURES */


                            }

                            
                            doc.pdf = urlPDF;

                            if(resultUn.signature.length === 0)
                            {
                                doc.signature = PositionSignature;
                            }

                            doc.save().then(resultat => {
                        
                                //console.log(Signature)

                                //console.log(PositionSignature)
                                console.log(Signature.length)

                                /*console.log(Signature)
                                console.log(Signature[0][0])*/

                                res.redirect('/emargement');
                        
                            })
                            .catch(error => console.log(error));
                        });
              
                    });




                });


            break;
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
