$( document ).ready( function() {

    $('#connexion').submit(function(e) {

        e.preventDefault();

        var email = $('#email').val()
        var password = $('#password').val()
        var url = 'http://127.0.0.1:3000/api/users/' + email + '/' + password

        axios.get(url)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
              console.log(error)
        });

    });
    //console.log('TEST')

});

