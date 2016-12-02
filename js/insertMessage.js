//var submit = document.getElementById("submit");
//submit.onclick = postMessage();

//document.getElementById('form').onsubmit = postMessage;

$(document).ready(function(e){
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
    
})



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