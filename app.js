/**
 * Musu Sketch
 */
var testingInBrowser = false;

var sketch; // Global context for SketchApp.
var mx = 0; // TODO: someone with "javascript skills" should make this object oriented.
var my = 0;
var Mx = 0;
var My = 0;
var image = null;

var globalAppContext;

Musubi.ready(function(appContext) {

  globalAppContext = appContext;

  image = document.getElementById("image");
  var args = {id:"image", size: 5 };
  if (appContext.obj != null) {
    var img = Musubi.urlForRawData(appContext.obj.objId);
    if (img != null) {
      args.bg = img;
    }
  }

  sketch = new SketchApp(args); 

  $("#post").click(function(e) {
    var elm = document.getElementById('image');
    var copy = document.createElement("canvas");
    var w = Mx - mx;
    var h = My - my;
    copy.width = w + 20;
    copy.height = h + 20;
    var cpx = copy.getContext("2d");
    cpx.fillStyle = "white";
    cpx.fillRect(0,0,copy.width, copy.height);
    cpx.drawImage(elm, mx, my, w, h, 10, 10, w, h);
    var snapshot = copy.toDataURL();

    var json = { "mimeType" : "image/jpeg" };
    var obj = new SocialKit.Obj({"type" : "picture", "raw_data_url": snapshot, "json": json });
    if (!testingInBrowser) {
      appContext.feed.post(obj);
      appContext.quit();
    }
  });

  /**
   * Adjust touch event bindings if the screen rotates
   */
  var supportsOrientationChange = "onorientationchange" in window,
      orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

  window.addEventListener(orientationEvent, function() {
    // window.orientation, screen.width
    orientationUpdate();
  }, false);



  globalAppContext.setBack(function() {
    if (confirm ("Did you want to post this picture?")) {
      $("#post").trigger("click");
    }
  });
  
});


function orientationUpdate() {

}

           
var SketchApp = function(options) {
    $("#image").attr("src", options.bg);
    var self = {
		//bind click events
		init: function() {
			return this;
		},
	};
  return self.init();
};

$(function(){
  if (testingInBrowser) {
    Musubi._launchCallback();
  }
});