
window.onload = getDogMessages();

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
		    var count = Object.keys(object).length;
			console.log(count);
			for(var i=0;i<count;i++){
				
			}
		    document.getElementById("title1").innerHTML = object[0].title;
		    document.getElementById("message1").innerHTML = object[0].message;
		    document.getElementById("timestamp1").innerHTML = "<small>"+object[0].time+"</small>";
		    document.getElementById("title2").innerHTML = object[1].title;
		    document.getElementById("message2").innerHTML = object[1].message;
		    document.getElementById("timestamp2").innerHTML = "<small>"+object[1].time+"</small>";
		    document.getElementById("title3").innerHTML = object[2].title;
		    document.getElementById("message3").innerHTML = object[2].message;
		    document.getElementById("timestamp3").innerHTML = "<small>"+object[2].time+"</small>";
		}
	};
	
	ajaxRequest.open("GET", "php/sqlquery.php?q=getMsgs", true);
	ajaxRequest.send(null);
	
}

