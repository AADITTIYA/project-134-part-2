objects = [];
song = "";
status = "";

function preload() {
    song = loadSound("siren.mp3");
}

function setup() {

    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector= ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "Is detecting objects";



}


function model_loaded() {
    console.log("Model loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);

    } else {
        console.log(objects);
        objects = results;
    }
}



function draw() {
    image(video, 0, 0, 380, 380)
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object Detected";
            fill(r.g.b);
            percent = floor(objects[i].confidence * 100);
            text(object[i].label, +" " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            nofill();
            stroke(r, g, b);
            rect(object[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") {
                document.getElementById("no_objects").innerHTML = "baby found";
                song.stop();

            } else {
                document.getElementById("no_objects").innerHTML = " baby not found";
                song.play();
            }
        }
        if (objects.length == 0) {
            document.getElementById("no_objects").innerHTML = " baby not found";
            song.play();
        }

    }
}