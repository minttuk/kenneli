// Koira ja omistaja tallennetaan muuttujiin, jotta niihin voidaan viitata muissakin scripteissä hakematta aina niitä uudelleen.
var owner;
var dog;

// Hakee kullekkin koiran sivulle kyseisen koiran nimen, kuvauksen, omistajan yms. 
// Koirien sivut generoidaan dog.html:stä ja urlissa oleva ?dog= määrittelee minkä id:n koira on kyseessä
// Tiedot haetaan sql:stä id:n mukaan.
function get_dog_content() {
    var dogId = parseUri(window.location.search).queryKey['dog'];
    if (!dogId) {
        window.location = "index.html";
    }
    var result;
    var $str = "getDog";
    $.ajax({
        url: c9address + "getDog/" + dogId, //"php/sqlquery.php?q=" + $str,
        type: "get",
        //dataType: "json",
        //data: JSON.stringify({'dogID': dogId}),
        success: function (response) {
           dog = response;
           console.log("SUCCESS",response);
           $('.name').html(response['name']);
           $('#dogTitle').html(response['title']);
           $('#description').html(response['description']);
           $('#profileimage').attr("src", "img/uploads/" + response['image']);
           owner = response['owner'];
           getOwner();
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
           window.location = "index.html";
           //return false;
        }
    });
    
    // Haetaan koiran owner-id:n perusteella omistajan tiedot user-taulusta
    function getOwner() {
        $str = "getUser";
        $.ajax({
            url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
            type: "post",
            dataType: "json",
            data: JSON.stringify({'id': owner}),
            success: function (response) {
                console.log("SUCCESS",response);
                $('#owner').html(response['firstname'] + " " + response['lastname']);
                $('#contact').html("<strong>" + response['firstname'] + " " + response['lastname'] + "</strong>");
                $('#address2').html(response['address'] + ", " + response['zipcode'] + "<br>" + response['email'] + "<br>" + response['phonenumber']);
                displayEditButtons();
                return;
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log("ERROR",textStatus, errorThrown);
            }
        });
    }
}

$(function() {
    get_dog_content();
})

//Näyttää koiran sivulla edit-napit, jos koiran omistajan id on sama kuin session id. Eli oman koiran tietoja voi vain muokata. 
//Kaikki voivat kuitenkin postata kaikkien koirien sivuille uusia viestejä
function displayEditButtons() {
    var editdiv = document.getElementById('dogEditBtns');
    console.log(userid + ", " + owner);
    if (userid == owner) {
        document.getElementById("dogIdToImage").value = dog['id'];
        editdiv.style.display = "block";
    }
    else {
        editdiv.style.display = "none";
    }
}