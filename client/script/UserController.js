$( document ).ready( function() {

    $('#connexion').submit(function(e) {

        e.preventDefault();

        var email = $('#email').val()
        var password = $('#password').val()
        var url = 'http://127.0.0.1:3000/api/users/' + email + '/' + password
   
        axios.get(url)
          .then(function (response) {

            console.log(response.data)

            if(response.data.message === "Enjoy your token!")
            {

                localStorage.setItem('id', response.data.user._id);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('signature', response.data.user.signature);
                localStorage.setItem('access_token', response.data.xsrfToken);
                console.log(localStorage.getItem('access_token'))

                location.href = 'dashboard.html';

            }

            
          })
          .catch(function (error) {
              console.log(error)
        });

    });
    //console.log('TEST')

});

