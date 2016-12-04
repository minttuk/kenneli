$('#logoutbutton').click(function(){
    console.log("logout pushed");
    var $str = "logout";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "get",
        //dataType: "json",
        //data: JSON.stringify({'email': $loginemail, 'password': $loginpassword}),
        success: function (response) {
           console.log("SUCCESS",response);
            window.location = "login.html";
            return;
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
    //return false;
});