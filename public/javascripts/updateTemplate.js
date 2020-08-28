$('.updateTemplate').on('click', function() {

    console.log($(this).data('id'))

    $.ajax({
        url : '/infoTemplate/' + $(this).data('id'), // La ressource ciblée
        type : 'GET', // Le type de la requête HTTP.
        success: function(response){
            console.log(response)

                var updateInfo = ''

                updateInfo += `<div class="form-group">
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

                updateInfo += `<b>ID : </b> ${response.infoFeuille._id} - [Du <b>${response.infoFeuille.periodeDebut}</b> au <b>${response.infoFeuille.periodeFin}</b>]<br/>
                                <b>Template : </b> ${response.infoFeuille.template.nomTemplate} <br/>
                                <b>Pdf : </b> <a href="${response.infoFeuille.pdf}" target="_blank">${response.infoFeuille.pdf}</a><br/>
                                <b>Url Sheet : </b> <a href="${response.infoFeuille.urlSheet}" target="_blank">${response.infoFeuille.urlSheet}</a> <br/>
                                <b>Crée le : </b> ${response.infoFeuille.createdAt}
                                <input type='hidden' value="${response.infoFeuille._id}" name='idFeuille' />
                                <input type='hidden' value="${response.infoFeuille.urlSheet}" name='urlSheet' />
                                <input type='hidden' value="${response.infoFeuille.template._id}" name='idTemplate' />`

            $('.updateFormFeuille').html(updateInfo)

        },
        error: function(err){
            console.log(err)
        }
     });

})
