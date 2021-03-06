var dogmodal = document.getElementById('dogModal');
var dogbtn = document.getElementById('updateDog');
var dogspan = document.getElementById('dogSpan');

(function() {
    if (userid == owner) {
        console.log(userid + ", " + owner);
        dogbtn.style.display = "block";
    }
})();

dogbtn.onclick = function getDogById() {
    $('#dogFormName').val(dog['name']);
    $('#dogFormTitle').val(dog['title']);
    $('#dogFormDescription').val(dog['description']);
    dogmodal.style.display = "block";
}

dogspan.onclick = function() {
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
        url: /*"https://kennel-minttukoponen.c9users.io/kennelsome/" + $str,  //*/"php/sqlquery.php?q=" + $str,
        type: "post",
        dataType: "json",
        data: JSON.stringify({'id': dog['id'],'name': $('#dogFormName').val(), 'title': $('#dogFormTitle').val(), 'description': $('#dogFormDescription').val()}),
        success: function (response) {
            console.log("SUCCESS",response);
            dogmodal.style.display = "none";
            get_dog_content();
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log("ERROR",textStatus, errorThrown);
        }
    });
    //window.location="dog.html?dog=" + dog['id'];
}
