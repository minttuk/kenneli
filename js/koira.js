
window.onload = getDogMessages();

function getDogMessages(){
	var ajaxRequest;  
	var dogId = parseUri(window.location.search).queryKey['dog'];
	console.log("DOGID"+dogId);
	var array = {"title": dogId};
    var dataString = JSON.stringify(array);
    console.log(dataString);
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
			//var dogId = parseUri(window.location.search).queryKey['dog'];
			
			for(var i=0;i<count;i++){
				var src = "img/koira"+dogId+"naama.png";
				var title = "title"+(i+1);
				var timestamp = "timestamp"+(i+1);
				var message = "message"+(i+1);
				var div1 = document.createElement('div');
				div1.className = "media";
				div1.setAttribute("id", "ylintaso");
				var a = document.createElement('a');
				a.className = "pull-left";
				a.setAttribute("href", "#");
				a.setAttribute("id", "adivi");
				var image = document.createElement('img');
				image.className = "media-object";
				image.src = src;
				a.appendChild(image);
				div1.appendChild(a);
				var div2 = document.createElement('div');
				div2.className = "media-body";
				div2.setAttribute("id", "tokataso");
				var heading = document.createElement('h4');
				heading.className = "media-heading";
				heading.setAttribute("id", title);
				heading.innerHTML = object[i].title;
				div2.appendChild(heading);
				var para1 = document.createElement('p');
				para1.setAttribute("id", timestamp);
				para1.innerHTML = "<small>"+object[i].time+"</small>";
				div2.appendChild(para1);
				var para2 = document.createElement('p');
				para2.setAttribute("id", message);
				para2.innerHTML = object[i].message;
				div2.appendChild(para2);
				div1.appendChild(div2);
				document.getElementById("containeri").appendChild(div1);
			}/*
		    document.getElementById("title1").innerHTML = object[0].title;
		    document.getElementById("message1").innerHTML = object[0].message;
		    document.getElementById("timestamp1").innerHTML = "<small>"+object[0].time+"</small>";
		    document.getElementById("title2").innerHTML = object[1].title;
		    document.getElementById("message2").innerHTML = object[1].message;
		    document.getElementById("timestamp2").innerHTML = "<small>"+object[1].time+"</small>";
		    document.getElementById("title3").innerHTML = object[2].title;
		    document.getElementById("message3").innerHTML = object[2].message;
		    document.getElementById("timestamp3").innerHTML = "<small>"+object[2].time+"</small>";
		    */
		}
	};
	
	ajaxRequest.open("POST", "php/sqlquery.php?q=getMsgs", true);
	ajaxRequest.send(dataString);
	
}

