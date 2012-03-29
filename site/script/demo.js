$(document).ready(init);
var canvas, filterValues, filters;
var easeSelected = false;
var defaultEase = "out";
var defaultTime = 1000;
var defaultSteps = 15;
function init(){
	filters = $.fn.jsManipulate("getFilters");
	$(":checkbox").checkbox();
	$("#image").jsManipulate("convert", function(can){ canvas=can;});
	fillFilterList();  
	$("#filter-select")[0].value = "twirl";
	loadFilterValues(); 
	$("#direction-select, #filter-select").selectmenu();
	$("#direction-select").selectmenu("disable");
	$("#easing-select").selectmenu({change: function(){ easeSelected = true; }});
	$("#apply-button").click(function(){ applyFilter("apply");});

}
