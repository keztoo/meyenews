// load a file and call back user
// with the contents of the file url
function fetchFile(fileUrl, userCallBack)
{  
  var client = new XMLHttpRequest();
  client.open('GET', fileUrl);
  client.onreadystatechange = function() {
    //alert("State: " + client.readyState);
    if (client.readyState == 4){
      // got file. note it could be a 404 page
      return userCallBack(fileUrl, client.responseText);
    }
  }
  client.send();
}

// here we check for file load time outs
// currently defaulted to this value
var fileLoadTimeOutInSeconds = 10;
var intervalTimer;
var counter;

function startTime()
{
  if (counter == fileLoadTimeOutInSeconds){
    // time out trying to load files
    clearInterval(intervalTimer);
    alert('Error - timed out loading files');
    Main(1);
  } else {
    counter++;
  }

  if (masterFileNames.length == Object.keys(masterFileContents).length){
    //alert('All Files Have Been Loaded!');
    clearInterval(intervalTimer);
    Main(0);
  }
}

function fileLoadInit(masterFileNames, myCallBack)
{
  for (fileName in masterFileNames){
    fetchFile(masterFileNames[fileName], myCallBack);
  }
  // wait until all files have been loaded
  counter = 1;
  intervalTimer = setInterval(function(){startTime()},1000);
}


