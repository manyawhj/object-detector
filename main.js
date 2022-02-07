img="";
Status="";
objects=[];

function preload(){
img=loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNXhIiTYb6WBVsZINyQ0Zy9LA1Luu-Jtyuw&usqp=CAU");
}

function setup(){
    Canvas=createCanvas(640,420);
    Canvas.center();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status: Identifying Objects";
    document.getElementById("number").innerHTML="number of object detected: Calculating";
}

function modelLoaded(){
    console.log("Model is loaded");
    Status="true";
    objectDetector.detect(img,gotPoses);
}

function gotPoses(error,results){

    if (error){
        console.log("error");
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
 
    image(img,0,0,640,420);
 if (Status != ""){
     document.getElementById("status").innerHTML="status : identified objects";
     document.getElementById("number").innerHTML="number of object detected:"+" "+objects.length;

     for (i= 0; i< objects.length; i++) {
        percentage=floor(objects[i].confidence*100);
        fill("#f00202");
        text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);
        stroke("#f00202");
        noFill();
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

         
     }
 }
}