var express = require('express');
var router = express.Router();
var fs = require('fs');
var pdf = require('html-pdf');
var path = require('path');
var mongoose = require('mongoose');
const axios = require('axios').default;

var Feuille = require('../models/FeuilleModel');
var Template = require('../models/TemplateModel');

/* GET users listing. */
router.get('/:id/:idTemplate', function(req, res, next) {

    var idFeuille = req.params.id
    var idTemplate = req.params.idTemplate
    var urlDistant = 'http://localhost:3000'

    const mongo = {
        uri: 'mongodb://localhost:27017/emargement',
        opt: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
        }
    };
      
    mongoose.connect(mongo.uri, mongo.opt)

    Feuille.findById(idFeuille).then(resultUn => {

        compteur = 1;
        debut = 0;
        fin = 5;
        page = 1;

        Template.findById(idTemplate).then(resultDeux => {

            var renduHtml = '';
            var positionSignature = [];
            var urlPDF = 'uploads/pdf/' + new Date().getTime() + '_V' + resultUn.__v + '.pdf';

            resultUn.apprenant.forEach(element => {
                            
                compteur++;

                if(compteur === 5)
                {

                    renduHtml += `<!DOCTYPE html>
                    <html lang="en">
                    
                    <head>
                        <meta charset="UTF-8">
                        <title>EmarGen - Gestion feuille d'émargement</title>
                    
                        <!-- CSS (load bootstrap from a CDN) -->
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
                    
                        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                            crossorigin="anonymous"></script>
                        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                            integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                            crossorigin="anonymous"></script>
                        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
                            integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
                            crossorigin="anonymous"></script>
                    
                    </head>
                    
                    <body>
            
                            <main style="margin-bottom: 30%;">
            
                            <div>
            
                                <div class="float-left"><img src="${urlDistant}/${resultDeux.logo}" width="250"
                                        alt=""></div>
                                <div style="margin-left: 20rem;">
                                    <h3>FEUILLE D'EMARGEMENT -> PERIODE EN FORMATION</h3>
                                    <p><b>Intitulé :</b> ${resultDeux.intitule} <br />
                                        <b>Organisme de formation :</b> ${resultDeux.organisme}</p>
                                </div>
            
                            </div>
                            <div></div>
            
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th rowspan="2" style="font-size: 12px;">NOM PRENOM APPRENANT(E)</th>`
                                            
                                            resultUn.jourSemaine.forEach(element => {
                                                renduHtml += `<th colspan="2">${element}</th>`
                                            });
            
                                            
                                            
                            renduHtml += `</tr>
                                        <tr>
                                            <th>Matin</th>
                                            <th>Aprem</th>
                                            <th>Matin</th>
                                            <th>Aprem</th>
                                            <th>Matin</th>
                                            <th>Aprem</th>
                                            <th>Matin</th>
                                            <th>Aprem</th>
                                            <th>Matin</th>
                                            <th>Aprem</th>
                                        </tr>
                                    </thead>
                                    <tbody>`
            
                                    for (let a = debut; a < fin; a++) {
                                        const elementDeux = resultUn.apprenant[a];
                                        const elementSign = resultUn.signature[a];
        

                                                if(resultUn.signature.length != 0 && elementSign[2] === elementDeux)
                                                {


                                                        renduHtml += `<tr>
                                                        <td>${elementDeux}</td>`

                                                        if(elementSign[5] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[5]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                        if(elementSign[7] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[7]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                        if(elementSign[10] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[10]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                        if(elementSign[12] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[12]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                        if(elementSign[15] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[15]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                        if(elementSign[17] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[17]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                        if(elementSign[20] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[20]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                        if(elementSign[22] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[22]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                        if(elementSign[25] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[25]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                        if(elementSign[27] != "Pas de signature")
                                                        {

                                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[27]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            renduHtml += `<td></td>`

                                                        }

                                                    }
                                                    else
                                                    {
                    
                    
                                                        renduHtml += `
                                                        <td>${elementDeux}</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>`
                    
                                                    }
                                                                                                
                                                    renduHtml += `</tr>
                                                    `

                                            
                                            

                                            positionSignature.push(['Page', page, elementDeux, 'Date1', 'Matin', 'Pas de signature', 'Aprem', 'Pas de signature', 'Date2', 'Matin', 'Pas de signature', 'Aprem', 'Pas de signature'
                                            ,  'Date3',  'Matin', 'Pas de signature', 'Aprem', 'Pas de signature',  'Date4', 'Matin', 'Pas de signature', 'Aprem', 'Pas de signature'
                                            ,  'Date5',  'Matin', 'Pas de signature', 'Aprem', 'Pas de signature'])

                                    }
            
                            renduHtml += `</tbody>
                                    <thead>
                                        <tr>
                                            <th style="font-size: 12px;">NOM PRENOM APPRENANT(E)</th>
                                            `
        
                                            resultUn.formateur.forEach(element => {
                                                renduHtml += `<th colspan="2" style="font-size: 12px;">Nom Prénom Formateur(.rice)
                                                        ${element}
                                                    </th>
                                                `
                                            });
        
                                            
                            renduHtml += `</tr>
                                    </thead>
                                </table>
                            </div>
            
                    </main>
                    `

                    compteur = 0;
                    debut = debut + 5 
                    fin = fin + 5

                    page++;
                    

                }      

            });

            if(fin != resultUn.apprenant.length)
            {

                console.log('FIN UN : ' + fin)

                restant = fin - resultUn.apprenant.length

                renduHtml += `
                <body>
        
                        <main style="margin-bottom: 30%;">
        
                        <div>
                
                            <div class="float-left"><img src="${urlDistant}/${resultDeux.logo}" width="250"
                                    alt=""></div>
                            <div style="margin-left: 20rem;">
                                <h3>FEUILLE D'EMARGEMENT -> PERIODE EN FORMATION</h3>
                                <p><b>Intitulé :</b> ${resultDeux.intitule} <br />
                                    <b>Organisme de formation :</b> ${resultDeux.organisme}</p>
                            </div>
        
                        </div>
                        <div></div>
        
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="2" style="font-size: 12px;">NOM PRENOM APPRENANT(E)</th>`
                                        
                                        resultUn.jourSemaine.forEach(element => {
                                            renduHtml += `<th colspan="2">${element}</th>`
                                        });
        
                                        
                                        
                        renduHtml += `</tr>
                                    <tr>
                                        <th>Matin</th>
                                        <th>Aprem</th>
                                        <th>Matin</th>
                                        <th>Aprem</th>
                                        <th>Matin</th>
                                        <th>Aprem</th>
                                        <th>Matin</th>
                                        <th>Aprem</th>
                                        <th>Matin</th>
                                        <th>Aprem</th>
                                    </tr>
                                </thead>
                                <tbody>`
        
                                for (let a = fin; a < resultUn.apprenant.length; a++) {
                                    const elementDeux = resultUn.apprenant[a];
                                    const elementSign = resultUn.signature[a];

                                    if(resultUn.signature.length != 0 && elementSign[2] === elementDeux)
                                    {


                                        renduHtml += `<tr>
                                        <td>${elementDeux}</td>`

                                        if(elementSign[5] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[5]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                        if(elementSign[7] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[7]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                        if(elementSign[10] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[10]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                        if(elementSign[12] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[12]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                        if(elementSign[15] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[15]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                        if(elementSign[17] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[17]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                        if(elementSign[20] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[20]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                        if(elementSign[22] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[22]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                        if(elementSign[25] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[25]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                        if(elementSign[27] != "Pas de signature")
                                        {

                                            renduHtml += `<td><img src="${urlDistant}/${elementSign[27]}" width="60" alt=""></td>`

                                        }
                                        else
                                        {

                                            renduHtml += `<td></td>`

                                        }

                                    }
                                    else
                                    {
    
    
                                        renduHtml += `
                                        <td>${elementDeux}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>`
    
                                    }
                                                                                
                                    renduHtml += `</tr>
                                    `

                                        positionSignature.push(['Page', page, elementDeux, 'Date1', 'Matin', 'Pas de signature', 'Aprem', 'Pas de signature', 'Date2', 'Matin', 'Pas de signature', 'Aprem', 'Pas de signature'
                                        ,  'Date3',  'Matin', 'Pas de signature', 'Aprem', 'Pas de signature',  'Date4', 'Matin', 'Pas de signature', 'Aprem', 'Pas de signature'
                                        ,  'Date5',  'Matin', 'Pas de signature', 'Aprem', 'Pas de signature'])

                                }

        
                        renduHtml += `</tbody>
                                <thead>
                                    <tr>
                                        <th style="font-size: 12px;">NOM PRENOM APPRENANT(E)</th>
                                        `

                                        resultUn.formateur.forEach(element => {
                                            renduHtml += `<th colspan="2" style="font-size: 12px;">Nom Prénom Formateur(.rice)
                                                    ${element}
                                                </th>
                                            `
                                        });

                                        
                        renduHtml += `</tr>
                                </thead>
                            </table>
                        </div>
        
                </main>
        
        
                </body>
                
                </html>
                `

                fin = fin +  restant

                

            }

            console.log(positionSignature)

            //var html = fs.readFileSync(renduHtml);
            //var imgSrc = 'file://' + __dirname + '/../uploads/';
            //imgSrc = path.normalize(imgSrc);
            var options = { "orientation": "landscape", "border": {
                "top": "1cm",            // default is 0, units: mm, cm, in, px
                "right": "0.2cm",
                "bottom": "2cm",
                "left": "0.2cm"
            } };
        
            //console.log(imgSrc)

            pdf.create(renduHtml, options).toFile('./' + urlPDF, function(err, res) {
                if (err) return console.log(err);
                console.log(res); // { filename: '/app/businesscard.pdf' }
            });

            Feuille.findOne({ _id: idFeuille }, function (err, doc){

                doc.pdf = urlPDF;

                if(resultUn.signature.length === 0)
                {

                    doc.signature = positionSignature;

                }

                doc.save().then(resultat => {

                    res.redirect('/emargement');
            
                })
                .catch(error => console.log(error));

            });

        });
    
    });

 
});

module.exports = router;

