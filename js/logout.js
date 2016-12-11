// Kun painetaan logout, kutsutaan ajaxilla php-funktiota joka tuhoaa session.
$('#logoutbutton').click(function(){
    console.log("logout pushed");
    var $str = "logout";
    $.ajax({
        url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
        type: "get",
        success: function (response) {
           console.log("SUCCESS",response);
            window.location = "login.html";
            return;
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
});