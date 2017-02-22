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

var ball = {
    x: canvas.width/2,
    y: 0,
    v: 20,
    u: 80,
    radius: 20,
    color: 'blue',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y + this.radius, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function clear() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 2, canvas.width, canvas.height);
}

function update() {
    clear();
    ball.draw();
    ball.y = ball.u*t - 0.5*g*t*t;
    if ((ball.y <= 0 || ball.u <= ball.v) && t !== 0) {
        t = 0;
        ball.y = 0;
        ball.u = e * ball.u;
    }
    if (ball.u <= Math.sqrt(2*g*0.05)) {
        ball.y = 0;
        ball.v = 0;
        clear();
        ball.draw();
        y_display.innerText = ball.y.toFixed(3);
        v_display.innerText = ball.v.toFixed(3);
        window.cancelAnimationFrame(raf);
        raf = null;
        console.log('animation ends');
        return;
    }
    t += dt;
    t_total += dt;
    ball.v = ball.u - g*t;
    console.log(ball.y + ' ' + ball.v + ' and ' + ball.u + ' at ' + t);
    y_display.innerText = ball.y.toFixed(3);
    v_display.innerText = ball.v.toFixed(3);
    t_display.innerText = t_total.toFixed(3);
    raf = window.requestAnimationFrame(update);
}

u_old = ball.u;
update();


var e_slider = document.getElementById("e-slider");
var e_spin = document.getElementById("e-spin");
var u_slider = document.getElementById("u-slider");
var u_spin = document.getElementById("u-spin");
var g_slider = document.getElementById("g-slider");
var g_spin = document.getElementById("g-spin");
var dt_slider = document.getElementById("dt-slider");
var dt_spin= document.getElementById("dt-spin");

function update_e(value) {
    e_slider.MaterialSlider.change(value);
    e_spin.value = value;
    e = value;
}

function update_u(value) {
    u_slider.MaterialSlider.change(value);
    u_spin.value = value;
    if (value !== u_old) { // only on change
        ball.u = value;
        u_old = value;
    }
}

function update_g(value) {
    g_slider.MaterialSlider.change(value);
    g_spin.value = value;
    g = value;
}

function update_dt(value) {
    dt_slider.MaterialSlider.change(value);
    dt_spin.value = value;
    dt = value / 10000;
}

document.getElementById("replay_btn").onclick = function() {
    if (raf !== null)
        window.cancelAnimationFrame(raf);
    ball.u = u_old;
    t_total = 0;
    update();
}

document.getElementById("reset_btn").onclick = function() {
    update_e(0.9);
    update_u(80);
    update_g(9.8);
    update_dt(1600);
}

// e_spin.onchange = update_e;
// u_spin.onchange = update_u;
// g_spin.onchange = update_g;
// dt_spin.onchange = update_dt;

// very bad practice due to materialize framework
setInterval(function() {
    update_e(Number(e_slider.value).toFixed(2));
    update_u(Number(u_slider.value).toFixed(2));
    update_g(Number(g_slider.value).toFixed(2));
    update_dt(Number(dt_slider.value).toFixed(2));
    // e_spin.value = Number(e_slider.value).toFixed(2);
    // u_spin.value = Number(u_slider.value).toFixed(2);
    // g_spin.value = Number(g_slider.value).toFixed(2);
    // dt_spin.value = Number(dt_slider.value).toFixed(2);
}, 400)