var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const axios = require('axios').default;
const fs = require('fs');
var Feuille = require('../models/FeuilleModel');
var Template = require('../models/TemplateModel');


router.post('/', function(req, res, next) {

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

                    var feuilleData = {
                        template: req.body.template,
                        urlSheet: req.body.urlGoogleSheet,
                        apprenant: apprenant,
                        jourSemaine: jourSemaine,
                        formateur: formateur,
                        pdf: '',
                        periodeDebut: jourSemaine[0],
                        periodeFin: jourSemaine[jourSemaine.length - 1]
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