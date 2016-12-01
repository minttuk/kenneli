function get_session_my(callback) {
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
            callback("moi", result['id']);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
            callback(errorThrown);
        }
    });
    return result;
}