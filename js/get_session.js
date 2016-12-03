(function get_session() {
    var result;
    var $str = "getSession";
    $.ajax({
        //url: "https://kenneli-uusi-sainipatala.c9users.io/php/get_session.php",
        //url: "php/get_session.php",
        url: "php/sqlquery.php?q=" + $str,
        type: "GET",
        //cache: false,
        success: function (response) {
            result = response;
            console.log(result['id']);
            //callback("moi", result['id']);
            return;
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
            window.location = "login.html";
            //callback(errorThrown);
            return false;
        }
    });
    //return result;
})()
