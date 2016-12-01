
$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

var $loginemail;
var $loginpassword;

$('#loginbutton').click(function(){
    $loginemail = $('#loginemail').val();
    $loginpassword =$('#loginpassword').val();
    console.log($('#loginpassword').val());
    if (checkEmail($loginemail) && passwordGiven($loginpassword)) {
        console.log('both ok');
        //var values = $loginemail;
        var $str = "login";
        $.ajax({
            //url: "https://kennelsome-sainipatala.c9users.io/php/login.php",
            url: "php/sqlquery.php?q=" + $str,
            type: "post",
            //dataType: "html",
            dataType: "json",
            data: JSON.stringify({'email': $loginemail, 'password': $loginpassword}),
            //data: "",
            success: function (response) {
               console.log("SUCCESS",response);
                window.location = "testi.html";
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log("ERROR",textStatus, errorThrown);
            }
        });
    }
    return false;
});

function checkEmail(emailAddress) {
    console.log(emailAddress);
    var emailRegex = new RegExp("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
    var valid = emailRegex.test(emailAddress);
    if (!valid) {
        alert("Invalid e-mail address");
        console.log('false');
        return false;
    } else {
        console.log('true');
        return true;
    }
}

function passwordGiven(password) {
    if (password.length > 0) {
        return true;
    }
    else {
        alert("Give password!");
        return false;
    }
}
