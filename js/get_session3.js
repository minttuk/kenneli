// Kirjautuneen käyttäjän id tallennetaan muuttujaan userid, joten sitä voidaan muuallakin käyttää.

var userid;

//Riippuen siitä, että kuka ryhmämme jäsenistä käyttää ohjelmaa, voimme alla olevista cloud 9 url-osoitteista valita omamme,
//jotta RestApi kutsut ohjautuvat oikeaan paikkaan.


var c9address = "https://kennel-minttukoponen.c9users.io/kennelsome/";
//var c9address = "https://kenneli-hannmard.c9users.io/kennelsome/";
//var c9address = "https://kennelsome-sainipatala.c9users.io/kennelsome/";


//haetaan sessionin käyttäjän id-numero.

(function get_session() {
    var $str = "getSession";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "GET",
        success: function (response) {
            console.log('sessionin id on ' + response['id']);
            userid = response['id'];
            if ((response['id'] === null || !response['id']) && window.location.pathname !== "/login.html") {
                console.log('IF');
                window.location = "login.html";
                return;
            }
            if (response['id'] !== null && window.location.pathname == "/login.html") {
                window.location = "index.html";
                return;
            }
            getSessionUser();

        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
            window.location = "login.html";
            //callback(errorThrown);
            return;
        }
    });
    
    // haetaan kyseisen sessionin käyttäjän id:n mukaiset käyttäjätiedot.
    function getSessionUser(){
        $str = "getUser";
        $.ajax({
            url: "php/sqlquery.php?q=" + $str,
            type: "post",
            dataType: "json",
            data: JSON.stringify({'id': userid}),
            success: function (response) {
                $('#currentUser').html(response['firstname'] + " " + response['lastname']);
    
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
                return;
            }
        });
    }
    
})()
