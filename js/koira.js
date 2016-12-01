
window.onload = getDogMessages();

var submit = document.getElementById("submit");
submit.onclick = postMessage();


function getDogMessages(){
	var ajaxRequest;  
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}

	ajaxRequest.onreadystatechange = function(){
		if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200){
		    var text = ajaxRequest.responseText;
		    console.log(text);
		    var object = JSON.parse(text);
		    console.log(object[0]);
		    document.getElementById("title1").innerHTML = object[0].title;
		    document.getElementById("message1").innerHTML = object[0].message;
		}
	};
	
	ajaxRequest.open("GET", "php/sqlquery.php?q=getMsgs", true);
	ajaxRequest.send(null);
	
}

function postMessage(){
    
    var title = document.getElementById("title");
    var message = document.getElementById("message");
    var dataString = 'title='+ title + 'message='+ message;
    

    $.ajax({
    type: "POST",
    url: "php/sqlquery.php?q=createMsg",
    data: dataString,
    cache: true,
    success: function(html){
    //$("#show").after(html);
    document.getElementById('title').value='';
    document.getElementById('message').value='';
    //$("#flash").hide();
    //$("#content").focus();
    }  
    });

}