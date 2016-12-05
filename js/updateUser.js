var modal = document.getElementById('myModal');
var btn = document.getElementById("updateUser");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function getUserById(callback) {
    var id = userid;
    var $str = "getUser";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        async: false,
        data: JSON.stringify({'id': id}),
        success: userUpdateForm,
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
}

function userUpdateForm(data) {
    console.log("button painettu");
    modal.style.display = "block";
    $('#address').val(data['address']);
    $('#zipcode').val(data['zipcode']);
    $('#city').val(data['city']);
    $('#phonenumber').val(data['phonenumber']);
}

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
