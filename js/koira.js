
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

    //get the form values
 //var title = $('#otsikko').val();     
 //var message = $('#teksti').val();     
 
 //make the postdata
 var postData = '&title='+title+'&message='+message;
 //call your .php script in the background, 
 //when it returns it will call the success function if the request was successful or 
 //the error one if there was an issue (like a 404, 500 or any other error status)

  $.ajax({
    url : "php/sqlquery.php?q=createMsg",
    type: "POST",
    data : postData,
    success: function(data,status,  xhr)
     {
        //if success then just output the text to the status div then clear the form inputs to prepare for new data
        $("#message1").html(data);
        $('#title').val();
        $('#message').val('');
         }

}); 


}