/*

(function get_dog_content() {
    console.log('DOG');
    var dogId = parseUri(window.location.search).queryKey['dog'];
    console.log(dogId);
    var result;
    var $str = "getDog";
    var owner = null;
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'dogID': dogId}),
        success: function (response) {
           console.log("SUCCESS",response);
           console.log(response['id']);
           $('.name').html(response['name']);
           $('#description').html(response['description']);
           $('#profileimage').attr("src", "img/" + response['id'] + ".jpg");
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
        console.log('owner id:',owner);
        $str = "getUser";
        $.ajax({
            url: "php/sqlquery.php?q=" + $str,
            type: "post",
            dataType: "json",
            data: JSON.stringify({'id': owner}),
            success: function (response) {
                console.log("SUCCESS",response);
                $('#owner').html(response['firstname'] + " " + response['lastname']);
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log("ERROR",textStatus, errorThrown);
            }
        });
        return false;
    }
})();

*/