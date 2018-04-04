// This runs within the popup
jQuery(document).ready(function($){
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	editor.session.setMode("ace/mode/json");
	var tmp = localStorage.getItem("dictionary");
	if (tmp) {
		tmp = JSON.parse(tmp);
		tmp = JSON.stringify(tmp, null, 4);
		editor.setValue(tmp);
	}
	$("#myForm").submit(function(e){
		e.preventDefault();
		var code = editor.getValue();
		localStorage.setItem("dictionary", code);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {dictionary: code}, function(response) {
				//
			});
		});

	});
});
