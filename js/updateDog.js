var dogmodal = document.getElementById('dogModal');
var dogbtn = document.getElementById("updateDog");
var imgbtn = document.getElementById("imagebtn");
var span = document.getElementsByClassName("close")[0];

(function() {
    if (userid == owner) {
        console.log(userid + ", " + owner);
        dogbtn.style.display = "block";
        imgbtn.style.display = "block";
    }
})();

dogbtn.onclick = function getDogById() {
    $('#dogFormName').val(dog['name']);
    $('#dogFormTitle').val(dog['title']);
    $('#dogFormDescription').val(dog['description']);
    dogmodal.style.display = "block";
}

span.onclick = function() {
    dogmodal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == dogmodal) {
        dogmodal.style.display = "none";
    }
}

var updateDogBtn = document.getElementById("updateDogBtn");
updateDogBtn.onclick = function() {
    var $str = "updateDog";
    $.ajax({
        url: "php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'id': dog['id'],'name': $('#dogFormName').val(), 'title': $('#dogFormTitle').val(), 'description': $('#dogFormDescription').val()}),
        success: function (response) {
            console.log("SUCCESS",response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
    dogmodal.style.display = "none";
    window.location="dog.html?dog=" + dog['id'];
}
