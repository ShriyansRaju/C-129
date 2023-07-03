song=""
leftWristX=0
rightWristX=0
leftWristY=0
rightWristY=0
scoreLeftWrist=0

function preload(){
    song=loadSound("music.mp3")
}

function setup(){
canvas= createCanvas(725,500)
canvas.center()
video=createCapture(VIDEO)
video.hide()

poseNet= ml5.poseNet(video, modelLoaded)

poseNet.on('pose', gotPoses)
}



function modelLoaded(){
    console.log("The Model is Loaded")
}


function draw(){
    image(video,0,0,725,500)

    stroke("rgb(244, 159, 0)")
    fill("orange")

    if(scoreLeftWrist>0.2){

    circle(leftWristX,leftWristY, 15)

    numberLeftWristY=Number(leftWristY)
    remove_decimal=Math.floor(numberLeftWristY)
    volume=remove_decimal/500
    
    song.setVolume(volume)

    document.getElementById("volume").innerHTML="volume"+ volume
    }
}

function play(){
    song.play()
    song.setVolume(0.7)
    song.rate(3)
}

function mute(){
    song.setVolume(0)
}

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        scoreLeftWrist=results[0].pose.keypoints[9].score
        console.log(scoreLeftWrist)
        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
        console.log("Left wrist= "+leftWristX, leftWristY)
        rightWrist=results[0].pose.rightWrist.x
        rightWristY=results[0].pose.rightWrist.y
        console.log("Right wrist= "+rightWristX, rightWristY)

    }
}