(function(){
  var shape = this.shape = {}
  var canvas = null
  var ctx = null
  var bg = null
  var currentID = 0;
  var lastDrawAnimateTime = null
  var startAnimateTime = null
  var for_x = 1;
  var objDraw = null
  var frameTime = 1000 / 30
  var last_x = 0
  var last_y = 0
  var start_x = 0
  var start_y = 0
  var mark = 0
  shape.loadCanvas = function(idCanvas) {
    canvas = document.getElementById(idCanvas)
    ctx = canvas.getContext("2d")
  }

  shape.loadBg = function() {
    bg = new Image()
    bg.onload = function() {
      ctx.drawImage(this, 0, 0)
    }
    bg.src = "img/doodle.gif"
  }
  shape.drawTri = function() {
    ctx.beginPath();
    ctx.moveTo(100, 10);
    start_x = 100
    start_y = 10
    objDraw = shape.sprite({
      context: canvas.getContext("2d"),
      spriteSize: 20,
      start_x: 100, 
      start_y: 10,
      bg: bg
    });
    window.requestAnimationFrame(shape.loopDraw)
  }
  shape.loopDraw = function(timestamp) {
    if (timestamp !== NaN || timestamp !== undefined) {
      for_x++;
      //if (for_x > 300) {for_x = 0; return}
      
      if (startAnimateTime === undefined) {
        startAnimateTime = timestamp
      }

      if ((timestamp - startAnimateTime) > 5000) {
        lastDrawAnimateTime = undefined
        startAnimateTime = undefined
        for_x = 0
        ctx.closePath()
        return
      }
      
      if (lastDrawAnimateTime === undefined || (timestamp - lastDrawAnimateTime) > frameTime) {
        objDraw.update();
        objDraw.render();
        lastDrawAnimateTime = timestamp
      }
    }
    
    console.log("timestamp==== "+timestamp)
    window.requestAnimationFrame(shape.loopDraw);
  }
  
  shape.sprite = function(options) {
    var that = {}
    that.context = options.context;
    that.spriteSize = options.spriteSize;
    // that.back_x = that.start_x
    // that.back_y = that.start_y
    that.update = function () {
       console.log("currentID in update===="+currentID)
      if (currentID < that.spriteSize - 1 )
        currentID ++;
      else
        currentID = 0;
    };
  
    that.render = function () {
      that.context.lineTo(10*currentID, 100);
      last_x = 10*currentID;
      last_y = 100
      that.context.lineWidth = 10
      that.context.strokeStyle = "red"
      if (currentID == that.spriteSize - 2 && mark == 0) {
        mark++; 
        that.context.lineTo(start_x, start_y, 20*10, 100)
      }
      that.context.stroke()
    };
    return that;
  }

}.call(this));