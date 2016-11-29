var $email = "ajaxtestemail";
var $password = "ajaxtestpassword";

$.ajax({
    url: "https://kenneli-uusi-sainipatala.c9users.io/php/sqlquery.php",
    type: "post",
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({"user": [
       { "email": $email, "password": $password}
        ]}),
    success: function (response) {
       console.log(response + " session");
    },
    error: function(jqXHR, textStatus, errorThrown) {
       console.log(textStatus, errorThrown);
    }
});