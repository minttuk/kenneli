var dogmodal = document.getElementById('dogModal');
var dogbtn = document.getElementById("updateDog");
var imgbtn = document.getElementById("imagebtn");
var dogspan = document.getElementsByClassName("close")[0];

(function() {
    if (userid == owner) {
        console.log(userid + ", " + owner);
        dogbtn.style.display = "block";
        imgbtn.style.display = "block";
    }
})();

dogbtn.onclick = function getUserById(callback) {
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
    var $str = "updateUser";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
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
