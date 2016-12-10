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
		    var object = JSON.parse(text);
		    var count = Object.keys(object).length; //lasketaan montako viestiä
		    
		    for(var i=0;i<count && i<5;i++){  //sivulla näytetään maksimissaan 5 viestiä, ne luodaan DOMin avulla
				var src = "img/koira"+object[i].dog_id+"naama.png";
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
				para1.innerHTML = "<small>"+object[i].time+" kirjoittanut: "+object[i].firstname+" "+object[i].lastname+"</small>";
				div2.appendChild(para1);
				var para2 = document.createElement('p');
				para2.setAttribute("id", message);
				para2.innerHTML = object[i].message;
				div2.appendChild(para2);
				div1.appendChild(div2);
				document.getElementById("containeri").appendChild(div1);
			}
		}
	};
	
	ajaxRequest.open("GET", /*"https://kennel-minttukoponen.c9users.io/kennelsome/getFrontSideMsgs", true);   //*/"php/sqlquery.php?q=getFrontSideMsgs", true);
	ajaxRequest.send(null);
	
}

