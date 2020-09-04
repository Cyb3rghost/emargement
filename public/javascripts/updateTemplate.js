$('.updateTemplate').on('click', function() {

    console.log($(this).data('id'))

    $.ajax({
        url : '/infoTemplate/' + $(this).data('id'), // La ressource ciblée
        type : 'GET', // Le type de la requête HTTP.
        success: function(response){
            console.log(response)

                var updateInfo = ''

                updateInfo += `<div class="modal-body">
                                <div class="form-group">
                                    <label for="logo">Logo Actuel</label><br/>
                                    <img src="${response.infoTemplate.logo}" width="200" alt="Responsive image">
                                </div>
                                <div class="form-group">
                                    <label for="nomTemplate">Nom template</label>
                                    <input type="text" class="form-control" value="${response.infoTemplate.nomTemplate}" name="nomTemplate">
                                </div>
                                <div class="form-group">
                                    <label for="organisme">Organisme</label>
                                    <input type="text" class="form-control" value="${response.infoTemplate.organisme}" name="organisme">
                                </div>
                                <div class="form-group">
                                    <label for="intitule">Intitule</label>
                                    <input type="text" class="form-control" value="${response.infoTemplate.intitule}" name="intitule">
                                    <input type="hidden" class="form-control" value="${response.infoTemplate._id}" name="idTemplate">
                                    <input type="hidden" class="form-control" value="${response.infoTemplate.logo}" name="ancienLogo">
                                </div>`

            $('.updateForm').html(updateInfo)

        },
        error: function(err){
            console.log(err)
        }
     });

})

$('.updateFeuille').on('click', function() {

    $.ajax({
        url : '/infoFeuille/' + $(this).data('id'), // La ressource ciblée
        type : 'GET', // Le type de la requête HTTP.
        success: function(response){

                var updateInfo = ''

                updateInfo += `<form method="post" action="/actionSurFeuille">
                                <b>ID : </b> ${response.infoFeuille._id} - [Du <b>${response.infoFeuille.periodeDebut}</b> au <b>${response.infoFeuille.periodeFin}</b>]<br/>
                                <b>Template : </b> ${response.infoFeuille.template.nomTemplate} <br/>
                                <b>Pdf : </b> <a href="${response.infoFeuille.pdf}" target="_blank">${response.infoFeuille.pdf}</a><br/>
                                <b>Url Sheet : </b> <a href="${response.infoFeuille.urlSheet}" target="_blank">${response.infoFeuille.urlSheet}</a> <br/>
                                <b>Crée le : </b> ${response.infoFeuille.createdAt}
                                <input type='hidden' value="${response.infoFeuille._id}" name='idFeuille' />
                                <input type='hidden' value="${response.infoFeuille.urlSheet}" name='urlSheet' />
                                <input type='hidden' value="${response.infoFeuille.template._id}" name='idTemplate' />
                                <div class="modal-footer">
                                    <div class="form-group">
                                    <button type="submit" name="action" value="Synchronisation" class="btn btn-primary">Synchronisation</button>
                                </form>
                                <a value="Générer le pdf" href="/testPDF/${response.infoFeuille._id}/${response.infoFeuille.template._id}" class="btn btn-danger" role="button">Générer le pdf</a>
                                </div>`

            $('.updateFormFeuille').html(updateInfo)

        },
        error: function(err){
            console.log(err)
        }
     });

})

$('.afficheSignature').on('click', function() {

    //alert($(this).data('id'))
    var infoSignature = '';
    var idFeuille = $(this).data('id')

    $.ajax({
        url : '/infoSignature/' + $(this).data('id'), // La ressource ciblée
        type : 'GET', // Le type de la requête HTTP.
        success: function(response){

                infoSignature += `<div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th rowspan="2"></th>`

                            
                            response.infoFeuille.jourSemaine.forEach(element => {
                                infoSignature += `<th colspan="2">${element}</th>`
                            });

                infoSignature += `<th>Action</th>
                                    </tr>
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
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>`

                for (let a = 0; a < response.infoFeuille.signature.length; a++) {
                    const element = response.infoFeuille.signature[a];

                                if( element[2] != 'XXXXXX' )
                                {


                                    infoSignature += `
                                    <tr>
                                    <td style="font-size: 14px;">${element[2]}</td>`


                                                        if(element[5] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[5]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                                        if(element[7] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[7]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                                        if(element[10] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[10]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                                        if(element[12] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[12]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                                        if(element[15] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[15]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                                        if(element[17] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[17]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                                        if(element[20] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[20]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                                        if(element[22] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[22]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                                        if(element[25] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[25]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                                        if(element[27] != "Pas de signature")
                                                        {

                                                            infoSignature += `<td><img src="${element[27]}" width="60" alt=""></td>`

                                                        }
                                                        else
                                                        {

                                                            infoSignature += `<td></td>`

                                                        }

                                        infoSignature += `<td><a href="/signature/${idFeuille}/${a}"><img class="mx-auto d-block" src="https://img.icons8.com/wired/25/000000/qr-code.png"/></a></td>
                                    </tr>`

                                }
                    
                }
                        

                infoSignature += `</tbody>
                            </table>
                        </div>`

                $('.afficheSignature').html(infoSignature)

                /*var infoSignature = ''

                infoSignature += `
                            <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th rowspan="2"></th>`

                                        response.jourSemaine.forEach(element => {
                                            infoSignature += `<th colspan="2">${element}</th>`
                                        });


                infoSignature += `<th>Action</th>
                                    </tr>
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
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="font-size: 14px;">ELEVE 1</td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 14px;">ELEVE 2</td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 14px;">ELEVE 3</td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>ELEVE 4</td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>ELEVE 5</td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td><img src="http://localhost:3000\\uploads\\signature.png" width="80" alt=""></td>
                                        <td>Test</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>`

            console.log(infoSignature)

            $('.afficheSignature').html(infoSignature)*/

        },
        error: function(err){
            console.log(err)
        }
     });


});
