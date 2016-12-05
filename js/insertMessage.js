
document.getElementById('formPost').onsubmit = postMessage;

function postMessage(){
	var ajaxRequest; 
	var title = document.getElementById('title').value;
    var message = document.getElementById('message').value;
    var id = userid;
    var dogId = parseUri(window.location.search).queryKey['dog'];
    console.log("koiran id" + dogId);
    console.log("Sessionin id numero on " + id);
    var array = {"title": title, "message": message, "id": id, "dogid": dogId};
    var dataString = JSON.stringify(array);
    console.log('muodostettu json string' + dataString);
	
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
		    //var object = JSON.parse(text);
		    //console.log(object[0]);
		    //document.getElementById("title1").innerHTML = object[0].title;
		    //document.getElementById("message1").innerHTML = object[0].message;
		}
	};
	
	ajaxRequest.open("POST", "php/sqlquery.php?q=createMsg", true);
	ajaxRequest.send(dataString);
	
}