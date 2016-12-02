
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
		    
		    for (var i=0;i<5;i++){
		        var loop_title = "title"+(i+1);
		        var loop_message = "message"+(i+1);
		        var loop_timestamp = "timestamp"+(i+1);
		        var loop_naamakuva = "naamakuva"+(i+1);
		        document.getElementById(loop_title).innerHTML = object[i].title;
		        document.getElementById(loop_message).innerHTML = object[i].message;
    		    document.getElementById(loop_timestamp).innerHTML = "<small>"+object[i].time+"</small>";
    		    if(object[i].dog_id==1){
    		        document.getElementById(loop_naamakuva).innerHTML = "<img class=\"media-object\" src=\"img/koira1naama.png\" alt=\"\">";
    		    }
    		    else if(object[i].dog_id==2){
    		        document.getElementById(loop_naamakuva).innerHTML = "<img class=\"media-object\" src=\"img/koira2naama.png\" alt=\"\">";
    		    }
    		    else if(object[i].dog_id==3){
    		        document.getElementById(loop_naamakuva).innerHTML = "<img class=\"media-object\" src=\"img/koira3naama.png\" alt=\"\">";
    		    }
		    }
		}
	};
	
	ajaxRequest.open("GET", "php/sqlquery.php?q=getFrontSideMsgs", true);
	ajaxRequest.send(null);
	
}

