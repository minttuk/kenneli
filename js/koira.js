
window.onload = getDogMessages();

// Hakee koiran messaget
function getDogMessages(){
	var ajaxRequest;
	var dogId = parseUri(window.location.search).queryKey['dog'];  //haetaan kyseisen sivun koiran id
	var array = {"title": dogId};
    var dataString = JSON.stringify(array);
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

	// Täyttää koiran sivun viestit
	ajaxRequest.onreadystatechange = function(){
		if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200){
		    var text = ajaxRequest.responseText;
		    var object = JSON.parse(text);
		    var count = Object.keys(object).length; //lasketaan montako viestiä

			for(var i=0;i<count && i<10;i++){ //sivulla näytetään maksimissaan 10 viestiä, ne luodaan DOMin avulla for-silmukassa
				var msgId = object[i].id;
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
				var divleft = document.createElement('div');
				divleft.className = "media-body";
				divleft.setAttribute("id", "tokatasoleft");
				var divright = document.createElement('div');
				divright.className = "media-body";
				divright.setAttribute("id", "tokatasoright");
				var heading = document.createElement('h4');
				heading.className = "media-heading";
				heading.setAttribute("id", title);
				heading.innerHTML = object[i].title;
				divleft.appendChild(heading);
				var para1 = document.createElement('p');
				para1.setAttribute("id", timestamp);
				para1.innerHTML = "<small>"+object[i].time+" kirjoittanut: "+object[i].firstname+" "+object[i].lastname+"</small>";
				divleft.appendChild(para1);
				var para2 = document.createElement('p');
				para2.setAttribute("id", message);
				para2.innerHTML = object[i].message;
				var deleteBtn = document.createElement("BUTTON");
				deleteBtn.setAttribute("id", msgId);
				deleteBtn.setAttribute("class", "deleteButton");
				//console.log("minun id: "+userid+"ja viestin lähettäjän id: "+object[i].user_id);
				if(userid!=object[i].user_id){
					deleteBtn.style.visibility='hidden';
				}
				var t = document.createTextNode("Poista viesti");       
				deleteBtn.appendChild(t);                        
				divleft.appendChild(para2);
				divright.appendChild(deleteBtn);
				div2.appendChild(divleft);
				div2.appendChild(divright);
				div1.appendChild(div2);
				document.getElementById("containeri").appendChild(div1);
			}
			var buttons = document.getElementsByClassName("deleteButton");
			var buttonsCount = buttons.length;
			for (var i = 0; i < buttonsCount; i++) {  //viestien poistamisnapeille asetetaan toiminnallisuus
			    buttons[i].onclick = function(e) {
			        deleteMsg(this.id);
    			};
			}
		}
	};
	
	ajaxRequest.open("GET", c9address + "getMsgs/"+ dogId, true);
	ajaxRequest.send(null);
	
	
}
