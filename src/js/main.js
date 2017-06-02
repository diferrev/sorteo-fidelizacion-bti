( function ( $ ) {
    'use strict';

    /* Configuración */
    var config = {
        timer: 30, // Cuenta regresiva en segundos
        maxClients: 40, // Número de clientes a sortear
        winnerMessage: "Ganador!" // Mensaje para el cliente Ganador
    }

    /* Inicializando conexión con Firebase */
    var configFirebase = {
        apiKey: "AIzaSyDdF3IHZHXOm9TCtLRfDoCxsLhaUnUngCE",
        authDomain: "fidelizacionbti.firebaseapp.com",
        databaseURL: "https://fidelizacionbti.firebaseio.com",
        projectId: "fidelizacionbti",
        storageBucket: "fidelizacionbti.appspot.com",
        messagingSenderId: "752673687049"
    };

    firebase.initializeApp( configFirebase );

    /* Definiendo el objeto Cliente */
    var client = {
        id: null,
        name: "",
        company: "",
        position: "",
        tel: null,
        email: ""
    };
    
    /* Obteniendo objetos del DOM con jQuery */
    var $timer = $('[data-timer]');
    var $randomclient = $('[data-randomclient]');
    
    /*
     * Activa template HTML
     * 
     * @param  id  string
     * @return  Copia del contenido de un elemento del DOM
     */
    function activateClientTemplate( id ){
        var t = document.querySelector( id );
        return document.importNode( t.content, true );
    }

    /*
     * Renderiza clientes seleccionado y ganador
     * 
     * @param  client  object
     * @param  winner  boolean
     */
    function renderClient( client, winner )
    {
        if( winner )
        {
            var clone = activateClientTemplate( '#template-winner');

            clone.querySelector( '[data-winner="container"]' ).style.display = 'none';
            clone.querySelector( '[data-winner="message"]' ).innerHTML = config.winnerMessage;
            clone.querySelector( '[data-winner="name"]' ).innerHTML = client.name;
            clone.querySelector( '[data-winner="position"]' ).innerHTML = client.position;
            clone.querySelector( '[data-winner="company"]' ).innerHTML = client.company;
            clone.querySelector( '[data-winner="tel"]' ).innerHTML = client.tel;
            clone.querySelector( '[data-winner="email"]' ).innerHTML = client.email;
            
            $randomclient.append( clone ).find( '[data-winner="container"]' ).fadeIn();
        }
        else
        {
            var clone = activateClientTemplate( '#template-client');

            clone.querySelector( '[data-client]' ).style.display = 'none';
            clone.querySelector( '[data-client="name"]' ).innerHTML = client.name;

            $randomclient.append( clone ).find( '[data-client]' ).fadeIn();
        }
        
    }

    /*
     * Obtiene cliente de la base de datos de Firefase
     * 
     * @param  id  integer
     * @param  winner  boolean
     */
    function getClient( id, winner )
    {
        return firebase.database().ref('clients/' + id).once( 'value' ).then( function( snapshot )
        {
            $randomclient.find( '[data-client]').remove();
            
            client.id = snapshot.val().id;
            client.name = snapshot.val().name;
            client.company = snapshot.val().company;
            client.position = snapshot.val().position;
            client.tel = snapshot.val().tel;
            client.email = snapshot.val().email;

            renderClient( client, winner );
        });
    }

    /*
     * Genera un número aleatoria entre cero y un número limite
     * 
     * @param  max  integer
     * @param  random  integer
     */
    function randomNumber( max )
    {
        var min = 0;
        var random = Math.floor(Math.random() * ( max - min ) + min);
        return random;
    }

    /*
     * Inicia la cuenta regresiva del temporizador
     * 
     * @param  t  integer
     */
    function countdown( t )
    {
        var interval = setInterval( function () {
            if( t >= 0 ){
                $timer.html( t );
                t-- ;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    /*
     * Inicia el temporazidor para la selección de clientes cada dos segundos
     * 
     * @param  t  integer
     */
    function randomClient( t )
    {
        var interval = setInterval( function () {
            if( t >= 0 ){
                if( (t % 2) == 0 ){ 
                    var id = randomNumber( config.maxClients );
                    if( t == 0 )
                    {
                        getClient( id, true );
                    }
                    else
                    {
                        getClient( id, false );
                    }
                }
                t-- ;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    countdown( config.timer );
    randomClient( config.timer );

})( jQuery );