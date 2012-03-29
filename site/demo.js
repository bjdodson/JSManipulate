$(document).ready(init);
var canvas, filterValues, filters;
var easeSelected = false;
var defaultEase = "out";
var defaultTime = 1000;
var defaultSteps = 15;
function init(){
	filters = $.fn.jsManipulate("getFilters");
	$(":checkbox").checkbox();
	var timeSlider = $("#time-slider").slider({
		animate: "fast",
		min: 0,
		max: 5000,
		step: 100,
		value: defaultTime,
		change: function() {
			$("#time-input").attr({value: $(this).slider("option","value") });	
		}
	});
	var stepsSlider = $("#steps-slider").slider({
		animate: "fast",
		min: 0,
		max: 100,
		value: defaultSteps,
		step: 1,
		change: function() {
			$("#steps-input").attr({value: $(this).slider("option","value") });	
		}
	});
	$("#image").jsManipulate("convert", function(can){ canvas=can;});
	fillFilterList();  
	$("#filter-select")[0].value = "twirl";
	loadFilterValues(); 
	$("#direction-select, #filter-select").selectmenu();
	$("#direction-select").selectmenu("disable");
	$("#easing-select").selectmenu({change: function(){ easeSelected = true; }});
	$("#apply-button").click(function(){ applyFilter("apply");});

}
