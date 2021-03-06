// Tämä vaihtaa login.html formia joko sisäänkirjautumisformiksi tai register-formiksi.
$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

// Esitellään muuttujia, joihin tallennetaan myöhemmin arvot
var $loginemail;
var $loginpassword;
var $registeremail;
var $registerpassword;
var $firstname;
var $lastname;

// Kun login-nappia painetaan tarkistetaan, että loginemail on halutussa muodossa, ja että salasana on annettu. Jos molemmat ok, lähetetään tiedot ajaxilla php:lle
$('#loginbutton').click(function(){
    $loginemail = $('#loginemail').val();
    $loginpassword =$('#loginpassword').val();
    if (checkEmail($loginemail) && passwordGiven($loginpassword)) {
        var $str = "login";
        $.ajax({
            url: "php/sqlquery.php?q=" + $str,
            type: "post",
            dataType: "json",
            data: JSON.stringify({'email': $loginemail, 'password': $loginpassword}),
            success: function (response) {
               console.log("SUCCESS",response);
                window.location = "index.html";
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log("ERROR",textStatus, errorThrown);
               $('.errormsg').html("Invalid email or password!");
            }
        });
    }
    return false;
});

// Tarkistaa register-nappia painettua, että kaikki tarvittavat kentät on täytetty. Email vastaa email-muotoa, etu- ja sukunimi ainakin kaksi merkkiä pitkät ja
// salasana ainakin kolme merkkiä. Jos ok lähetetään ajaxilla php:lle
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
                window.location = "index.html";
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

// Emailin validointi
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

// tarkistaa, että salasana annettu
function passwordGiven(password) {
    if (password.length > 0) {
        return true;
    }
    else {
        $('.errormsg').html("Type your password!");
        return false;
    }
}

// tarkistaa, että rekisteröitäessä annetaan ainakin kolme merkkiä pitkä salasana
function passwordRegister(password) {
    if (password.length > 2) {
        return true;
    }
    else {
        $('.errormsg').html("Password must be at least 3 letters long.");
        return false;
    }
}

// Tarkistetaan, että etu- ja sukunimi ainakin kaksi merkkiä pitkät rekisteröityessä
function nameGiven(name1, name2) {
    if (name1.length > 1 && name2.length > 1) {
        return true;
    }
    else {
        $('.errormsg').html("Please enter your first and last name");
        return false;
    }
}
