// This script gets injected into the webpage... yes, it's highly inefficient but it works!
$(function(){
  // IGNORE THE JSON.parse double up (needs to be fixed in next version)
  // This will just keep running and replace all instances of text on the page
  // setInterval(function(){
  //   upV();
  // }, 100);

  var i = setInterval(upV, 80);
  setTimeout(function(){
    clearInterval(i);
  }, 3500);

  function upV(){
    console.log("Script fired...");
    var d = localStorage.getItem("dictionary");
    d = JSON.parse(d);
    d = JSON.parse(d);
    $("body :not(:has(*))").text(function(r,a){
      for (var n in d){ // For each category
        for (var x in d[n]){ // For each element in category array
          if (a.includes(x)) {
            a=a.replace( new RegExp(x,"g"),d[n][x]);
          }
        }
      }
      return a
    });
  }

  // This listens for any updates to the JSON in the popup window
  chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log("message received...");
    // When we change the popup contents, it will get saved into local storage
    var d = JSON.stringify(request.dictionary);
    localStorage.setItem("dictionary", d);
    d = d;
    d = JSON.parse(d);
    d = JSON.parse(d);
    upV();
    sendResponse({'a':'b'});
  });
});
