var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;

var g = 10;
var t = 0;
var t_total = 0;
var e = 0.7;
var dt = 0.8;
var u_old;


var y_display = document.getElementById("y-display");
var v_display = document.getElementById("v-display");
var t_display = document.getElementById("t-display");

// normalize the canvas
ctx.translate(0, canvas.height);
ctx.scale(-1, 1); // flip
ctx.rotate(-Math.PI);

ctx.fillStyle = 'green';
ctx.fillRect(0, 0, canvas.width, 2);


//Objects
var x = canvas.width/2;
var y = 0;
var side = 50;
var color = 'blue';
var radius = 2;
var rad = 0;
function Particle(x,y,radius,color,rad,num){
    this.x = x;   
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.rad = rad;
    this.velocity = 0.05;
    this.num = num;
    // v: 0.05,
    // u: 80,
    // width: 2,
    // Defining the edges of square clockwise from bottom-left
    // px1: x - side, py1: y, rad1: Math.PI,
    // px2: x - side, py2: y + side, rad2: Math.PI*0.75,
    // px3: x, py3: y + side, rad3: Math.PI/2,
    // px4: x, py4: y, rad4: 0,
    // draw: function() {
        // 4 points chosen as edges of the box
        // ctx.beginPath();
        // ctx.moveTo(this.px1 ,this.py1);
        // ctx.lineTo(this.px2 ,this.py2);
        // ctx.lineTo(this.px3 ,this.py3);
        // ctx.lineTo(this.px4 ,this.py4);
        // ctx.lineTo(this.px1 ,this.py1);
        // ctx.lineWidth = this.width;
        // ctx.strokeStyle = this.color;
        // ctx.fillStyle = this.color;
        // ctx.fill();
        // ctx.stroke();
    // },
    //Just a short-hand notation of function(){code...}
    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    this.upd = () => {
        console.log(this.num);
        if(this.num == 1)
        {
            this.rad += this.velocity; 
            this.x = 50 + x - Math.cos(this.rad) * 50;
            this.y = y + Math.sin(this.rad) * 50;
        }
        if(this.num == 2)
        {
            this.rad += this.velocity; 
            this.x =  50 + x - Math.cos(this.rad) * 50*Math.sqrt(2);
            this.y = -50 + y + Math.sin(this.rad) * 50*Math.sqrt(2);
        }
        if(this.num == 3)
        {
            this.rad += this.velocity; 
            this.x = x - Math.cos(this.rad) * 50;
            this.y = -50 + y + Math.sin(this.rad) * 50;
            console.log(this.y);
        }
        this.draw();
    }
}


//Implementation
let particles;
function init(){
    particles = []
    particles.push(new Particle(x-side,y,radius,color,Math.PI,1));
    particles.push(new Particle(x-side,y+side,radius,color,Math.PI*0.75,2));
    particles.push(new Particle(x,y+side,radius,color,Math.PI*0.5,3));
    particles.push(new Particle(x,y,radius,color,0,4));

}

function clear() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 2, canvas.width, canvas.height);
}
function update() {
    clear();
    requestAnimationFrame(update);
    particles.forEach(particle => {
        particle.upd();
    });
    // particles => { particles[0].upd()};
    // particles[0]()
    // console.log("Hello");
    // obj2().upd();
    // obj3().upd();
    // obj4().upd();
    // box.upd()
    // box.px1 = Math.cos(box.rad1);
    // console.log(box.rad1);
    // box.py1 -= Math.cos(box.rad1);
    // box.rad2 -= box.v;
    // box.px2 += Math.sin(box.rad2);
    // box.py2 -= Math.cos(box.rad2);
    // box.rad3 -= box.v;
    // box.px3 += Math.sin(box.rad3);
    // box.py3 -= Math.cos(box.rad3);
    // box.radian += box.v;
    // box.y += Math.sin(box.radian);
    // box.draw();
    // box.draw();
    // // box.y = box.u*t - 0.5*g*t*t;
    // // to make it more realtime
    // box.v -= g*dt;
    // box.y += box.v*dt;
    // if (box.y < 0 && t !== 0) {
    //     t = 0;
    //     box.y = 0;
    //     box.u = e * box.u;
    //     box.v = box.u;
    // }
    // if ((box.u*box.u)/(2*g) <= 0.05 && g != 0) {
    //     box.y = 0;
    //     box.v = 0;
    //     clear();
    //     box.draw();
    //     y_display.innerText = box.y.toFixed(3);
    //     v_display.innerText = box.v.toFixed(3);
    //     window.cancelAnimationFrame(raf);
    //     raf = null;
    //     console.log('animation ends');
    //     return;
    // }
    // t += dt;
    // t_total += dt;
    // // box.v = box.u - g*t;
    // console.log(box.y + ' ' + box.v + ' and ' + box.u + ' at ' + t);
    // if (g == 0 && box.y < Number.INTEGER)
    //     y_display.innerText = "Going out to space!";
    // else
    //     y_display.innerText = box.y.toFixed(3);
    //     v_display.innerText = box.v.toFixed(3);
    //     t_display.innerText = t_total.toFixed(3);
    //     raf = window.requestAnimationFrame(update);
}

// u_old = box.u;
// box.v = box.u;
init();
update();


// var e_slider = document.getElementById("e-slider");
// var e_spin = document.getElementById("e-spin");
// var u_slider = document.getElementById("u-slider");
// var u_spin = document.getElementById("u-spin");
// var g_slider = document.getElementById("g-slider");
// var g_spin = document.getElementById("g-spin");
// var dt_slider = document.getElementById("dt-slider");
// var dt_spin= document.getElementById("dt-spin");

// function update_e(value) {
//     e_slider.MaterialSlider.change(value);
//     e_spin.value = value;
//     e = value;
// }

// function update_u(value) {
//     u_slider.MaterialSlider.change(value);
//     u_spin.value = value;
//     if (value !== u_old) { // only on change
//         box.u = value;
//         u_old = value;
//         if (raf === null) update();
//     }
// }

// function update_g(value) {
//     g_slider.MaterialSlider.change(value);
//     g_spin.value = value;
//     g = value;
// }

// function update_dt(value) {
//     dt_slider.MaterialSlider.change(value);
//     dt_spin.value = value;
//     dt = value / 10000;
// }

// document.getElementById("replay_btn").onclick = function() {
//     if (raf !== null)
//         window.cancelAnimationFrame(raf);
//     box.u = u_old;
//     box.v = box.u;
//     t_total = 0;
//     update();
// }

// document.getElementById("reset_btn").onclick = function() {
//     update_e(0.9);
//     update_u(80);
//     update_g(9.8);
//     update_dt(1600);
// }

// e_spin.onchange = update_e;
// u_spin.onchange = update_u;
// g_spin.onchange = update_g;
// dt_spin.onchange = update_dt;

// very bad practice due to materialize framework
// setInterval(function() {
//     update_e(Number(e_slider.value).toFixed(2));
//     update_u(Number(u_slider.value).toFixed(2));
//     update_g(Number(g_slider.value).toFixed(2));
//     update_dt(Number(dt_slider.value).toFixed(2));
    // e_spin.value = Number(e_slider.value).toFixed(2);
    // u_spin.value = Number(u_slider.value).toFixed(2);
    // g_spin.value = Number(g_slider.value).toFixed(2);
    // dt_spin.value = Number(dt_slider.value).toFixed(2);
// }, 400);
