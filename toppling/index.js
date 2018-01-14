var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillStyle = "#232323";
c.fillRect(100,100,100,100);

//Line
c.beginPath();
c.moveTo(50,300);
c.lineTo(300,100);
c.lineTo(400,400);
c.strokeStyle = "#232323";
c.stroke();
c.arc(300, 300, 1, 0, Math.PI * 2, false);
c.strokeStyle = 'blue';
c.stroke()