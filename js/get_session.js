function get_session(callback) {
    var result;
    $.ajax({
        url: "https://kenneli-uusi-sainipatala.c9users.io/php/get_session.php",
        type: "GET",
        cache: false,
        success: function (response) {
            result = response;
            console.log(result);
            callback(null, result);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
            callback(errorThrown);
        }
    });
    return result;
}