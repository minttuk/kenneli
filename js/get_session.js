(function get_session() {
    var $str = "getSession";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "GET",
        success: function (response) {
            console.log('homo');
            console.log(response);
            console.log(response['id']);
            if (response === null) {
                console.log('IF');
                window.location = "login.html";
            }
            return;
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
            window.location = "login.html";
            //callback(errorThrown);
            return;
        }
    });
})()
