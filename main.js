var minutesDelay = 5; //this value dictates both timer time and picture interval time (to stay in sync);

function Timer() {
  this.defaultTime = minutesDelay * 60;
  this.currentTime = this.defaultTime;
  this.cancelId = null;
}
Timer.prototype.render = function () {
  var minutes = Math.floor(this.currentTime/60);
  var seconds = this.currentTime % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  document.getElementById("timer").innerText = (minutes + ":" + seconds);
}
Timer.prototype.start = function () {
  if (this.cancelId) return;
  var self = this;
  this.cancelId = setInterval(function () {
    if (self.currentTime == 0) {
      return self.stop();
    }
    self.currentTime -= 1;
    self.render();
  }, 1000);
}
Timer.prototype.stop = function () {
  if (!this.cancelId) return;
  clearInterval(this.cancelId);
  this.cancelId = null;
  this.render();
}

Timer.prototype.reset = function () {
  this.currentTime = this.defaultTime;
  this.render();
}

var timer = new Timer();
timer.render();

var currentWidth = 1200;
var interval = 1000 * 60 * minutesDelay;
var cancelId = null;

function generateImgSrc() {
    var urlBase = "https://source.unsplash.com/category/nature/"
    currendWidth = currentWidth += 1;
    var width = currentWidth.toString();
    var dimensions = "1920x" + width;
    return urlBase + dimensions;
}

function goToNextImage() {
  var img = new Image();
  var oldImage = document.getElementsByTagName("img")[0];
  img.onload = function () {
      timer.reset();
      timer.start();
      oldImage.classList.remove("fade-in");
      oldImage.classList.add("fade-out");
      setTimeout(function (){
        oldImage.remove();
        document.body.append(img);
        img.classList.add("fade-in");
      }, 500);
    }
  img.src = generateImgSrc();
}

function startImageCycle() {
  goToNextImage();
   cancelId = setInterval(goToNextImage,interval);
}

startImageCycle();

document.getElementById("skip").addEventListener("click", function (e) {
  clearInterval(cancelId);
  startImageCycle();
});
