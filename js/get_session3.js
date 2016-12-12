var userid;

var c9address = "https://kennel-minttukoponen.c9users.io/kennelsome/";
//var c9address = "https://kenneli-hannmard.c9users.io/kennelsome/";
//var c9address = "https://kennelsome-sainipatala.c9users.io/kennelsome/";

(function get_session() {
    var $str = "getSession";
    $.ajax({
        url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
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
            getSessionUser();

        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
            window.location = "login.html";
            //callback(errorThrown);
            return;
        }
    });
    function getSessionUser(){
        $str = "getUser";
        $.ajax({
            url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
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
