var imgbtn = document.getElementById("imagebtn");
var dogImageForm = document.getElementById("dogImageForm");
var span = document.getElementsByClassName("close")[2];

imgbtn.onclick = function() {
    console.log('imgbtn clicked');
    dogImageForm.style.display = "block";
}

span.onclick = function() {
    dogImageForm.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == dogImageForm) {
        dogImageForm.style.display = "none";
    }
}