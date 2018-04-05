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

	$(".integration").on("click",function(){
		$(this).find("img").toggleClass("border-success");
	});

	$("#demoDash").submit(function(e){
		e.preventDefault();
		$("#dashSubmit").addClass("disabled");
		$.getJSON('../common/resources/___root.json', function(d) {
			// Populate the integrations
			$(".integration").each(function(){
				if ( $(this).find("img").hasClass("border-success") ){
					var graphs = $(this).data("src").split(',');
					for (var xx in graphs){
						$.getJSON('../common/resources/'+graphs[xx], function(a) {
							for (var x in a){
								d.graphs.push(a[x]);
							}
						});
					}
				}
			})
			// The trigger the API calls
			setTimeout(function(){
				d = JSON.stringify(d);
				d = d.replace("%%TITLE%%", $("#dashboard-name").val());
				d = d.replace("%%COMPANY%%", $("#dashboard-company").val());
				$.ajax({
					type: "POST",
					url: "https://app.datadoghq.com/api/v1/dash?api_key=dc375d356a9d7ee347a65fa0d2afe02a&application_key=5155e33a8f83b0c7583869d6702d2902950cdf7c",
					data: d,
					dataType: "json",
					contentType: "application/json",
					success: function(resp){
						$("#dashboard-name").val("");
						$("#dashboard-company").val("");
					},
					complete: function(){
						$("#tab-dash").html("<div class=\"d-block text-center\"><strong class=\"text-success\">complete</strong></div>");
					}
				});
			}, 1000);

		});
	});

	// API_KEY = "dc375d356a9d7ee347a65fa0d2afe02a"
	// APP_KEY = "5155e33a8f83b0c7583869d6702d2902950cdf7c"


	// curl -X POST -H "Content-type: application/json" -d @dash.json "https://app.datadoghq.com/api/v1/dash?api_key=dc375d356a9d7ee347a65fa0d2afe02a&application_key=5155e33a8f83b0c7583869d6702d2902950cdf7c"

});
