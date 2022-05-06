img = "";
status1 = "";
objects = [];   

function preload() {
    img = loadImage("lockhart-plan-greenway-impression-homes-img_c8e198a90e4f00bb_14-7775-1-2fd6d6c.jpg");
}

function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("ModelLoaded!");
    status1 = true;
    objectDetector.detect(img, gotResult);
}

function draw() {
    image(img, 0, 0, 700, 500);
    if (status1 != "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            percent = floor(objects[i].confidence * 100);
            console.log(percent);
            fill("red");
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            stroke("red");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}