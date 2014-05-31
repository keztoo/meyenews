
function kajaxPostServer(url, parameters, user_callback){
  if (url == 'validate_login.py'){
    var tmp = parameters.split('&');
    var tmp2 = tmp[0].split('=');
    var userEmail = tmp2[1];
    var returnString = "username=" + userEmail + "|sid=1";
    return user_callback(returnString);
  }
  if (url == 'logout.py'){
    var returnString = "username=" + "Guest" + "|sid=1";
    return user_callback(returnString);
  }
  return 

// old code
  var user_call_back = user_callback;
  var http_request = false;
  if (window.XMLHttpRequest){
    http_request = new XMLHttpRequest();  //moz style
    // set type accordingly to anticipated content type
    if (http_request.overrideMimeType){
      http_request.overrideMimeType('text/html');
    }
  } 
  else if (window.ActiveXObject){
    try{
      http_request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try{
          http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
      }
  }
  if (!http_request){
    //alert('Cannot create XMLHTTP instance');
    return false;
  }
  http_request.onreadystatechange = function(){
      if (http_request.readyState == 4){
        if (http_request.status == 200){
          result = http_request.responseText;
          user_call_back(result);
        } else {
            //alert('There was a problem with the request.');
          }
      }
  }
  http_request.open('POST', url, true);
  http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http_request.setRequestHeader("Content-length", parameters.length);
  http_request.setRequestHeader("Connection", "close");
  http_request.send(parameters);
}



