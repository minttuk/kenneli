// Hakee kaikki koirat tietokannasta ja tekee niistä listaelementtejä navigointibaariin sekä pentueen koirat -sivupaneeliin. Generoi jokaiselle koiralle id:tä
// vastaavan urlin 
(function getNav() {
    //var dogId = parseUri(window.location.search).queryKey['dog'];
    var result;
    var $str = "getDogs";
    $.ajax({
        url: c9address + $str,  //"php/sqlquery.php?q=" + $str,
        type: "get",
        //dataType: "json",
        success: function (response) {
           console.log("SUCCESS",response);
           for (var i = 0; i < response.length; i++) {
                $('.doglist').append("<li><a href='dog.html?dog=" + response[i]['id'] + "'>" + response[i]['name'] + "</a></li>");
           }
           return;
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
    
    return false;
})()