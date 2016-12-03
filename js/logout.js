$('#logoutbutton').click(function(){
    var $str = "logout";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "get",
        //dataType: "json",
        //data: JSON.stringify({'email': $loginemail, 'password': $loginpassword}),
        success: function (response) {
           console.log("SUCCESS",response);
            //window.location = "testi.html";
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
    return false;
});