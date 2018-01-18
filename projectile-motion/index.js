var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

var g = 9.8;
var t = 0;
var t_total = 0;
var e = 1;
var dt = 0.16;
var u_old_x, u_old_y, u_old;


var y_display = document.getElementById("y-display");
var v_display = document.getElementById("v-display");
var t_display = document.getElementById("t-display");
var range_display = document.getElementById("range-display");
var maxheight_display = document.getElementById("maxheight-display");

canvas.width = 0.98 * window.innerWidth;
canvas.height = 0.5 * window.innerHeight;

// normalize the canvas
ctx.translate(0, canvas.height);
ctx.scale(-1, 1); // flip
ctx.rotate(-Math.PI);

ctx.fillStyle = 'green';
ctx.fillRect(0, 0, canvas.width, 2);


var ball = {
    x: 20,
    y: 0,
    u: 80,
    theta: 45,
    vy: 20,
    uy: 80 * (Math.sin((Math.PI*45)/180)),
    ux: 80 * (Math.cos((Math.PI*45)/180)),
    radius: 20,
    color: 'green',
    
    
    draw: function() 
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y + this.radius, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    },
    
    
    update: function() 
    {
        clear();
        ball.draw();
        this.vy -= g*dt;
        this.y += this.vy*dt;
        this.x += this.ux * dt;
        if (this.y  < 0 && t !== 0) {
            t = 0;
            this.y = 0;
            this.uy = e * this.uy;
            this.vy = this.uy;
            u_old_y = this.uy;
            u_old_x = this.ux;
        }
        if(this.x  > canvas.width)
        {
            replay();
        }
        t += dt;
        t_total += dt;
        if (g == 0 && ball.y < Number.INTEGER)
            y_display.innerText = "Going out to space!";
        else
            y_display.innerText = this.y.toFixed(3);
        v_display.innerText = Math.sqrt((this.vy * this.vy) + (this.ux * this.ux)).toFixed(3);
        t_display.innerText = t_total.toFixed(3);
        range_display.innerText = (2 * u_old_x * u_old_y / g).toFixed(3);
        maxheight_display.innerText = ((u_old_y * u_old_y) / (2 * g)).toFixed(3);
    },

    
    line: function()
    {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(2.5 * this.u * Math.cos(Math.PI * this.theta/ 180), 2.5 * this.u * Math.sin(Math.PI * this.theta/ 180));
        ctx.lineTo(2.5 * this.u * Math.cos(Math.PI * this.theta/ 180) - ( 30 * Math.sin(Math.PI * (60 - this.theta) / 180)), 2.5 * this.u * Math.sin(Math.PI * this.theta/ 180) - ( 30 * Math.cos(Math.PI * (60 - this.theta) / 180)));
        ctx.lineTo(2.5 * this.u * Math.cos(Math.PI * this.theta/ 180), 2.5 * this.u * Math.sin(Math.PI * this.theta/ 180));
        ctx.lineTo(2.5 * this.u * Math.cos(Math.PI * this.theta/ 180) - ( 30 * Math.cos(Math.PI * (30 - this.theta) / 180)), 2.5 * this.u * Math.sin(Math.PI * this.theta/ 180) + ( 30 * Math.sin(Math.PI * (30 - this.theta) / 180)));
        ctx.stroke();
    }
}

function clear() 
{
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 2, canvas.width, canvas.height);
}



function animate()
{
    ball.update();
    ball.line();
    requestAnimationFrame(animate);
}


u_old = ball.u;
u_old_y = ball.uy;
u_old_x = ball.ux;
ball.vy = ball.uy;
animate();



var e_slider = document.getElementById("e-slider");
var e_spin = document.getElementById("e-spin");
var u_slider = document.getElementById("u-slider");
var u_spin = document.getElementById("u-spin");
var g_slider = document.getElementById("g-slider");
var g_spin = document.getElementById("g-spin");
var dt_slider = document.getElementById("dt-slider");
var dt_spin= document.getElementById("dt-spin");
var theta_slider = document.getElementById("theta-slider");
var theta_spin= document.getElementById("theta-spin");



function update_e(value) 
{
    e_slider.MaterialSlider.change(value);
    e_spin.value = value;
    e = value;
}


function update_g(value) 
{
    g_slider.MaterialSlider.change(value);
    g_spin.value = value;
    g = value;
}


function update_theta(value) 
{
    theta_slider.MaterialSlider.change(value);
    theta_spin.value = value;
    ball.theta = value;
    u_old_y = u_old * (Math.sin((Math.PI*ball.theta)/180));
    u_old_x = u_old * (Math.cos((Math.PI*ball.theta)/180));
    ball.uy = u_old * (Math.sin((Math.PI*ball.theta)/180));
    ball.ux = u_old * (Math.cos((Math.PI*ball.theta)/180));
    ball.vy = ball.uy;
    ball.line();
    ball.update();
    
}


function update_u(value) 
{
    u_slider.MaterialSlider.change(value);
    u_spin.value = value;
    if (value !== u_old) 
    { 
        ball.u = value;
        u_old = value;
        u_old_y = u_old * (Math.sin((Math.PI*ball.theta)/180));
        u_old_x = u_old * (Math.cos((Math.PI*ball.theta)/180));
        ball.uy = u_old * (Math.sin((Math.PI*ball.theta)/180));
        ball.ux = u_old * (Math.cos((Math.PI*ball.theta)/180));
     }
    ball.update();
}


function update_dt(value)
{
    dt_slider.MaterialSlider.change(value);
    dt_spin.value = value;
    dt = value / 10000;
}



function replay()
{
    u_old_y = u_old * (Math.sin((Math.PI*ball.theta)/180));
    u_old_x = u_old * (Math.cos((Math.PI*ball.theta)/180));
    ball.uy = u_old_y;
    ball.ux = u_old_x ;
    ball.vy = ball.uy;
    ball.x = 20;
    ball.y = 0;
    t_total = 0;

}

document.getElementById("replay_btn").onclick = function() 
{
    replay();
    ball.update();
}

document.getElementById("reset_btn").onclick = function() 
{
    ball.x = 20;
    ball.y = 0;
    update_e(1);
    update_g(9.8);
    update_dt(1600);
    update_theta(45);
    update_u(80);
}


e_spin.onchange = update_e;
u_spin.onchange = update_u;
g_spin.onchange = update_g;
dt_spin.onchange = update_dt;
theta_spin.onchange = update_theta;


