var userid;

(function get_session() {
    var $str = "getSession";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "GET",
        success: function (response) {
            console.log('sessionin id on ' + response['id']);
            userid = response['id'];
            console.log(window.location.pathname);
            if ((response['id'] === null || !response['id']) && window.location.pathname !== "/login.html") {
                console.log('IF');
                window.location = "login.html";
                return;
            }
            if (response['id'] !== null && window.location.pathname == "/login.html") {
                window.location = "index.html";
                return;
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
            window.location = "login.html";
            //callback(errorThrown);
            return;
        }
    });
    var $str = "getUser";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "GET",
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
    
})()
