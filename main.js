objects = [];
video = "";
status = "";
function preload() {
video = createVideo('video.mp4');
video.hide();
}
function setup() {
canvas = createCanvas(500 , 400);
canvas.center();



}
function draw() {

image(video,0,0,500,400);

if (status != "") {
    objectDetector.detect(video , gotResult);
    for (let i = 0; i < objects.length; i++) {
       document.getElementById("status").innerHTML = "Status: Objects Detected";
       document.getElementById("Objects_detected").innerHTML = "Number of objects detected: " + objects.length;
        fill("red");
        Percent = floor(objects[i].confidence * 100);
        text(objects[i].label  + " " + Percent + "%" , objects[i].x + 15 , objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    }
}
}
function modelLoaded() {
    console.log("model is initialized");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
    objectDetector.detect(video , gotResult);


}
function start() {
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function gotResult(error , results) {
if (error) {
console.error(error);
}
else {
console.log(results);
objects = results;
}
}