//var submit = document.getElementById("submitPost");
//submit.onclick = postMessage();

//document.getElementById('form').onsubmit = postMessage;

/*$(document).ready(function(e){
    $('#submit').click(function(){
        var title = document.getElementById('title').value;
        var message = document.getElementById('message').value;
        var array = {title: title, message: message};
        var dataString = JSON.stringify(array);
    	//console.log('ajax lähettämässä' + ' ' + title + ' ' + message);
        console.log('string from array' + dataString);
        var str = 'createMsg'

        
        $.ajax({
            type: 'POST',
            data: dataString,
            dataType: "json",
            //url: "php/sqlquery.php?q=" + str + '&title=' + ""+ title +""+ '&message='+ ""+ message +"",
            url: "php/sqlquery.php?q=" + str,
            success: function(result){
                console.log(result);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("ERROR",textStatus, errorThrown);
          
            }
            
        })
    })
    
})*/



/*function postMessage(){
    
    var title = document.getElementById('title').value;
    var message = document.getElementById('message').value;
    var dataString = JSON.stringify({"title":title, "message":message})
	console.log('ajax lähettämässä' + ' ' + dataString);
	//(console.log('ajax lähettämässä' + ' ' + title + ' ' + message);
    
    $.ajax({
	    type: "POST",
	    url: "php/sqlquery.php?q=createMsg",
	    data: dataString,
	    cache: true,
	    success: function(responseText){
	    	console.log(responseText);
	    	document.getElementById('title').value='';
	    	document.getElementById('message').value='';
	    }  
    });

}*/

document.getElementById('formPost').onsubmit = postMessage;

function postMessage(){
	var ajaxRequest; 
	var title = document.getElementById('title').value;
    var message = document.getElementById('message').value;
    var array = {"title": title, "message": message};
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