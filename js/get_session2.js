(function get_session() {
    var $str = "getSession";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "GET",
        success: function (response) {
            console.log(response['id']);
            if (response['id'] === null || !response['id']) {
                console.log('IF');
                window.location = "login.html";
                return;
            }
            window.onload = document.body.style.display = "block";
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
