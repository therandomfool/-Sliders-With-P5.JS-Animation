var MP;
var slider, slider2;

function setup() {
  createCanvas(900, 900);
  smooth();
  // x, y, length of slider, start value, end value, step value, float?, sticky, show all values 
  slider = new SliderClass(200, 240, 300, 0, 2000, 100, false, false, false);
  slider2 = new SliderClass(200, 320, 300, 0, 5, 0.5, true, true, true);
  rectMode(CENTER);
  textAlign(CENTER);
}

function draw() {
  background(255);
  slider.move();
  slider.display();
  slider2.move();
  slider2.display();
}

function mousePressed() {
  MP = true;
}

function mouseReleased() {
  MP = false;
}

function SliderClass(_x, _y, _length, _startValue, _endValue, _varerval, _vars, _sticky, _showValues) {
  this.clicked = false; 
  this.sticky = false; 
  this.knobWidth = 12;
  this.knobHeight = 20;
  this.sliderValue = 0.00; 
  this.sliderValueInt = 0; 
  this.fade = 255; // for knob color
  this.xDif = 0.0;
  this.screenInterval = 0;
  this.x = _x;
  this.y = _y;
  this.xEnd = this.x + _length;
  this.xStart = this.x;
  this.startValue = _startValue;
  this.endValue = _endValue;
  this.vars = _vars;
  this.varerval = _varerval;
  this.totalLength = _length;
  this.sticky = _sticky;
  this.showValues = _showValues; 

 this.move = function() {
    // check to see if it's clicked 
    if (dist(mouseX, mouseY, this.x, this.y) < this.knobWidth) { // use this if you want a round knob on the slider 
      if (MP && this.clicked == false) { // if mouse was pressed
        this.xDif = mouseX - this.x;
        this.clicked = true;
      }
      this.fade = 100; // mouseOver but not clicked
    } else {
      this.fade = 0;
    }
    if (this.clicked == true) {
      this.fade = 255;
    }
    if (MP == false && this.clicked == true) { // if the mouse was just released
      this.clicked = false;
      if (this.sticky) { // if you set it to jump to the closest line 
        var modDif = this.sliderValue % this.varerval; // value to show how close it is to last line 
        var div = int(this.sliderValue / this.varerval); // vlaue to show how MANY varervals it's passed 
        
        if (modDif < this.varerval / 2) { // so it goes to closest line not just lower 
          this.x = this.xStart + (div * this.screenInterval);
        } else {
          this.x = this.xStart + ((div + 1) * this.screenInterval);
        }
      }
    }
    if (this.clicked) {
      this.x = mouseX - this.xDif; // so the slider doens't "jump" to the mouse x. 
      this.x = constrain(this.x, this.xStart, this.xEnd); // keep the knob on the slider
    }
    this.sliderValue = map(this.x, this.xStart, this.xEnd, this.startValue, this.endValue); // get the slider position relative to the values
    this.sliderValueInt = int(this.sliderValue); // make that number an var
  }

  this.display = function() {
    stroke(1);
    this.screenInterval = map(this.varerval, 0, this.endValue - this.startValue, 0, this.totalLength); // get the createCanvas of the gaps for the screen relative to the varervals 
    var counter = 0; 
    for (var i = int(this.screenInterval); i < this.totalLength; i += this.screenInterval) { // go from the first gap to the end of slider by the screenInterval
      line(i + this.xStart, this.y + 12, i + this.xStart, this.y - 12); // draw lines
      if(this.showValues){
        counter ++; 
        text( nfc(counter * this.varerval,1,1), i + this.xStart, this.y + 30);
        
      }
    }
    line(this.xStart, this.y + 12, this.xStart, this.y - 12); // draw first line (optional) 
    line(this.xEnd, this.y + 12, this.xEnd, this.y - 12); // draw last line (optional) 
    line(this.xStart, this.y, this.xEnd, this.y); // draw center line 
    fill(255);
    rect(this.x, this.y, this.knobWidth, this.knobHeight); // so it's opaque
    fill(100, 120, 160, this.fade);
    rect(this.x, this.y, this.knobWidth, this.knobHeight); // add color 
    fill(1);
    if (this.vars) {
     
    text( nfc(this.sliderValue,1,1), this.x, this.y - 20);
    } else {
      text(this.sliderValueInt, this.x, this.y - 20);
    }
    text(int (this.startValue), this.xStart, this.y + 30);
    text(int (this.endValue), this.xEnd, this.y + 30);
  }
}

