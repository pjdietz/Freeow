(function ($) {

	$(document).ready(function() {
	
		$("#freeow-show").click(function() {
			
			var title, message, opts, container;
			
			title = $("#freeow-title").val();
			message = $("#freeow-message").val();
			
			opts = {};
			opts.classes = [$("#freeow-style").val()];

			if ($("#freeow-append").is(":checked")) {
				opts.prepend = false;
			}
			
			if ($("#freeow-error").is(":checked")) {
				opts.classes.push("error");
			}
						
			if ($("#freeow-dontautohide").is(":checked")) {
				opts.classes.push("pushpin");
				opts.autoHide = false;
			}
			
			if ($("#freeow-slide").is(":checked")) {
				opts.classes.push("slide");
				opts.hideStyle = {
					opacity: 0,
					left: "400px"
				};
				opts.showStyle = {
					opacity: 1,
					left: 0
				};
			}
			
			container = $("#freeow-position").val();
			$(container).freeow(title, message, opts);
			
		});
	
	});

}(jQuery));
