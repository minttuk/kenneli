var modal = document.getElementById('userModal');
var btn = document.getElementById('updateUser');
var span = document.getElementsByClassName('userspan')[0];

//
btn.onclick = function getUserById(callback) {
    var id = userid;
    var $str = "getUser";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
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
    getDogByOwner(userid);
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

//Sends new user information to server with ajax
var updateUserBtn = document.getElementById('updateUserBtn');
updateUserBtn.onclick = function() {
    var $str = "updateUser";
    //var $mydogs = $('#mydogid').val().split(',');
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'address': $('#address').val(), 'zipcode': $('#zipcode').val(), 'city': $('#city').val(), 'phonenumber': $('#phonenumber').val(), 'dogid': $('#mydogid').val()}),
        success: function (response) {
            console.log("SUCCESS",response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
    modal.style.display = "none";
}

//Gets dogs by owner id (session id)
function getDogByOwner(userid) {
    var $str = "getDogByOwner";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'owner': userid}),
        success: function (response) {
            console.log("SUCCESS mydog",response);
            var $mydogs = "";
            for (var i = 0; i < response.length; i++) {
                if (i != 0) {
                    $mydogs = $mydogs + ", ";
                }
                $mydogs = $mydogs + response[i]['id'];
            }
            $('#mydogid').val($mydogs);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
}