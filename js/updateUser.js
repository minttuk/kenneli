var modal = document.getElementById('myModal');
var btn = document.getElementById("updateUser");
var span = document.getElementsByClassName("close")[0];

function getUserById(callback) {
    var id = userid;
    var $str = "getUser";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        async: false,
        data: JSON.stringify({'id': id}),
        success: function (response) {
            console.log("SUCCESS",response);
            return callback(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
}

btn.onclick = getUserById(function(data) {
    console.log("button painettu");
    modal.style.display = "block";
    $('#address').val(data['address']);
    $('#zipcone').val(data['zipcode']);
    $('#city').val(data['city']);
    $('#phonenumber').val(data['phonenumber']);
})

span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var updateUserBtn = document.getElementById("updateUserBtn");
updateUserBtn.onclick = function() {
    
}
