var modal = document.getElementById('userModal');
var btn = document.getElementById('updateUser');
var span = document.getElementsByClassName("close")[0];

//
btn.onclick = function getUserById(callback) {
    var id = userid;
    var $str = "getUser";
    $.ajax({
        url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'id': id}),
        success: userUpdateForm,
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
}

// Fills the values with previously given user information and changes the modal display to bloc
function userUpdateForm(data) {
    console.log("button painettu");
    $('#address').val(data['address']);
    $('#zipcode').val(data['zipcode']);
    $('#city').val(data['city']);
    $('#phonenumber').val(data['phonenumber']);
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var updateUserBtn = document.getElementById('updateUserBtn');
updateUserBtn.onclick = function() {
    var $str = "updateUser";
    $.ajax({
        url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'address': $('#address').val(), 'zipcode': $('#zipcode').val(), 'city': $('#city').val(), 'phonenumber': $('#phonenumber').val()}),
        success: function (response) {
            console.log("SUCCESS",response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
    modal.style.display = "none";
}
