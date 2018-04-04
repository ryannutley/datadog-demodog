var currentUrl = window.location.href;
triggerUrlChange();

function triggerUrlChange() {
  // Clearing current dependencies
  extractService = null;
  domManager = null;
  htmlTemplates = null;
  chrome.runtime.sendMessage({url: currentUrl}, function(response) {
    // Script has been injected...
  });
}
urlCheck = setInterval(function(){
  var nw = window.location.href,
       n = nw,
       h = $('html').html(),
       t = $('title').html(),
       old = currentUrl;
  if (old !== nw) {
    currentUrl = window.location.href;
    triggerUrlChange();
  }
}, 500);
