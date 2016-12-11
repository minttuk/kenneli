// Määritellään html-elementeille javascript muuttujat
var modal = document.getElementById('userModal');
var btn = document.getElementById('updateUser');
var span = document.getElementsByClassName('userspan')[0];

// Kun settings-nappia painetaan navigointibaarista, tämä funktio käynnistyy. Se hakee käyttäjän tiedot ajaxilla ja kutsuu sitten userUpdateFormia, jolloin
// modalin kentät täytetään tietokannan tiedoilla ja modal muutetaan näkyväksi.
btn.onclick = function getUserById(callback) {
    var id = userid;
    var $str = "getUser";
    $.ajax({
        url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'id': id}),
        success: userUpdateForm,
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
}

// Laittaa modalin kenttien alkuarvoiksi tietokannassa jo olevat tiedot. Niitä muuttamalla ja painamalla save uudet tiedot viedään tietokantaan.
function userUpdateForm(data) {
    console.log("button painettu");
    getDogByOwner(userid);
    $('#address').val(data['address']);
    $('#zipcode').val(data['zipcode']);
    $('#city').val(data['city']);
    $('#phonenumber').val(data['phonenumber']);
    modal.style.display = "block";
}

// Muuttaa modalin taas näkymättömäksi, jos ruksia painetaan kentän yläkulmassa
span.onclick = function() {
    modal.style.display = "none";
}

// Muuttaa modalin näkymättömäksi, jos kentän ulkopuolista aluetta painetaan.. (EI toimi jostain syystä joka sivulla...)
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Lähettää käyttäjän tiedot serverille ajaxilla save-nappia painamalla
var updateUserBtn = document.getElementById('updateUserBtn');
updateUserBtn.onclick = function() {
    var $str = "updateUser";
    //var $mydogs = $('#mydogid').val().split(',');
    $.ajax({
        url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'address': $('#address').val(), 'zipcode': $('#zipcode').val(), 'city': $('#city').val(), 'phonenumber': $('#phonenumber').val(), 'dogid': $('#mydogid').val()}),
        success: function (response) {
            console.log("SUCCESS",response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
    modal.style.display = "none";
}

//Hakee modaliin sen koiran ID:n jolla on omistajana tämä kyseinen käyttäjä eli session ID.
function getDogByOwner(userid) {
    var $str = "getDogByOwner";
    $.ajax({
        url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'owner': userid}),
        success: function (response) {
            console.log("SUCCESS mydog",response);
            var $mydogs = "";
            for (var i = 0; i < response.length; i++) {
                if (i != 0) {
                    $mydogs = $mydogs + ", ";
                }
                $mydogs = $mydogs + response[i]['id'];
            }
            $('#mydogid').val($mydogs);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
}