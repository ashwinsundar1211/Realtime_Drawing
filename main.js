noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup()
{
  video = createCapture(VIDEO);
  video.size(500, 550);
  video.position(100, 50);

  canvas = createCanvas(350, 350);
  canvas.position(760, 150);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function draw()
{
  background('#18d9a2');
  document.getElementById("square_side").innerHTML = "Width and Height of the Square is " + difference + "px";
  fill('#6f7016');
  stroke('#6f7016');
  square(noseX, noseY, difference);
}

function modelLoaded()
{
  console.log('posenet is initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
    {
      console.log(results);
      noseX = results[0].pose.nose.x;
      noseY = results[0].pose.nose.y;
      console.log("Nose X = " + noseX + "Nose Y" + noseY);
      leftWristX = results[0].pose.leftWrist.x;
      rightWristX = results[0].pose.rightWrist.x;
      difference = floor(leftWristX - rightWristX);
      console.log("Left Wrist X = " + leftWristX + " Right Wrist X" + rightWristX + " Difference = " + difference);
    }
}