var owner;
var dog;

function get_dog_content() {
    var dogId = parseUri(window.location.search).queryKey['dog'];
    $('#profileimage').attr("src", "img/" + dogId + ".png");
    if (!dogId) {
        window.location = "index.html";
    }
    var result;
    var $str = "getDog";
    var owner = null;
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'dogID': dogId}),
        success: function (response) {
           dog = response;
           console.log("SUCCESS",response);
           $('.name').html(response['name']);
           $('#dogTitle').html(response['title']);
           $('#description').html(response['description']);
           owner = response['owner'];
           getOwner();
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
           window.location = "index.html";
           //return false;
        }
    });
    function getOwner() {
        $str = "getUser";
        $.ajax({
            url: "php/sqlquery.php?q=" + $str,
            type: "post",
            dataType: "json",
            data: JSON.stringify({'id': owner}),
            success: function (response) {
                console.log("SUCCESS",response);
                $('#owner').html(response['firstname'] + " " + response['lastname']);
                $('#contact').html("<strong>" + response['firstname'] + " " + response['lastname'] + "</strong>");
                $('#address2').html(response['address'] + ", " + response['zipcode'] + "<br>" + response['email'] + "<br>" + response['phonenumber']);


            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log("ERROR",textStatus, errorThrown);
            }
        });
    }
}

$(function() {
    get_dog_content();
})
