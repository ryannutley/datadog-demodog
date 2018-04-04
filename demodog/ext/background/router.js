// Scripts to inject based on regex / url path
var manifest = [
	{
	    paths: [ '/' ],
	    files: [ "ext/content/inject.js" ]
	}
];

function urlChanged(url, tabId) {
  function loadScripts(files, i) {
    i = i || 0;
    if (i === files.length) return;
    else
      chrome.tabs.executeScript(tabId, {file:  files[i]}, function(){ loadScripts(files, i + 1) });
  }
  loop1 : for(var i = 0; i < manifest.length; i++) {
    loop2 : for(var j = 0; j < manifest[i].paths.length; j++) {
      if(url.indexOf(manifest[i].paths[j]) > -1) {
        loadScripts(manifest[i].files);
        break loop2;
        break loop1;
      }
    }
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    urlChanged(request.url, sender.tab.id);
    sendResponse();
  }
);
