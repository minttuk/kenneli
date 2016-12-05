
$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

var $loginemail;
var $loginpassword;
var $registeremail;
var $registerpassword;
var $firstname;
var $lastname;


$('#loginbutton').click(function(){
    $loginemail = $('#loginemail').val();
    $loginpassword =$('#loginpassword').val();
    console.log($('#loginpassword').val());
    if (checkEmail($loginemail) && passwordGiven($loginpassword)) {
        var $str = "login";
        $.ajax({
            url: "php/sqlquery.php?q=" + $str,
            type: "post",
            dataType: "json",
            data: JSON.stringify({'email': $loginemail, 'password': $loginpassword}),
            success: function (response) {
               console.log("SUCCESS",response);
                window.location = "dog.html?dog=1";
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log("ERROR",textStatus, errorThrown);
               $('.errormsg').html("Invalid email or password!");
            }
        });
    }
    return false;
});

$('#registerbutton').click(function(){
    console.log('register button pushed');
    $firstname = $('#firstname').val();
    console.log($firstname);
    $lastname = $('#lastname').val();
    console.log($lastname);
    $registeremail = $('#registeremail').val();
    console.log($registeremail);
    $registerpassword =$('#registerpassword').val();
    console.log($registerpassword);
    if (nameGiven($firstname, $lastname) && checkEmail($registeremail) && passwordRegister($registerpassword)) {
        console.log('both ok');
        var $str = "register";
        $.ajax({
            url: "php/sqlquery.php?q=" + $str,
            type: "post",
            dataType: "json",
            data: JSON.stringify({'email': $registeremail, 'password': $registerpassword, 'firstname': $firstname, 'lastname': $lastname}),
            success: function (response) {
               console.log("SUCCESS",response);
                window.location = "testi2.html";
            },
            error: function(response) {
               console.log("ERROR",response.responseText);
               //$('.errormsg').html("This email address is already registered!");
            }
            /*error: function(jqXHR, textStatus, errorThrown, response) {
               console.log("ERROR",textStatus, errorThrown);
               $('.errormsg').html("This email address is already registered!");
            }*/
        });
    }
    return false;
});

function checkEmail(emailAddress) {
    var emailRegex = new RegExp("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
    var valid = emailRegex.test(emailAddress);
    if (!valid) {
        //alert("Invalid e-mail address");
        $('.errormsg').html("Give a proper email address!");
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
        $('.errormsg').html("Type your password!");
        return false;
    }
}

function passwordRegister(password) {
    if (password.length > 2) {
        return true;
    }
    else {
        $('.errormsg').html("Password must be at least 3 letters long.");
        return false;
    }
}

function nameGiven(name1, name2) {
    if (name.length > 1 && name2.length > 1) {
        return true;
    }
    else {
        $('.errormsg').html("Please enter your first and last name");
        return false;
    }
}
