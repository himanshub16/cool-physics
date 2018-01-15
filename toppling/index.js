var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2 - 175;
var y = 0;
var w = 0.0;
var a=0.0;
var alp=0.0;
var v = 0.0;
var side = 75;

var f = 5;
var kg = 1; 
var y_applied = side/2;
var mu = 0.5;
var g = 10;
var t = 0;
var t_total = 0;
var dt = 0.8;


var alp_display = document.getElementById("alp-display");
var om_display = document.getElementById("om-display");
var a_display = document.getElementById("a-display");
var v_display = document.getElementById("v-display");

// normalize the canvas
ctx.translate(0, canvas.height);
ctx.scale(-1, 1); // flip
ctx.rotate(-Math.PI);

// extra decos
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, canvas.width, 2);

// box
var box = {
    vel: v,
    om: w,
    color: 'blue',
    x1: x-side, y1: y, r1: Math.PI,
    x2: x-side, y2: y + side, r2: Math.PI*0.75,
    x3: x, y3: y + side, r3: Math.PI*0.5,
    x4: x, y4: y, r4: 0,
    draw: function() {
        ctx.beginPath();
        ctx.moveTo(this.x4,this.y4);
        ctx.lineTo(this.x1,this.y1);
        ctx.lineTo(this.x2,this.y2);
        ctx.lineTo(this.x3,this.y3);
        ctx.lineTo(this.x4,this.y4);
        ctx.closePath();
        ctx.fillStyle = this.color;
        console.log(this.x4);
        ctx.fill();
    },
    // to fix offset produced by radians going off limit
    fixdraw: function() {
        ctx.beginPath();
        ctx.moveTo(this.x4,this.y4);
        ctx.lineTo(this.x4,this.y4+side);
        ctx.lineTo(this.x4+side,this.y4+side);
        ctx.lineTo(this.x4+side,this.y4);
        ctx.lineTo(this.x4,this.y4);
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.fill();
    },
    topple: function(){
        this.r1 += this.om; 
        this.x1 = x + Math.cos(this.r1)*side;
        this.y1 = y - Math.sin(this.r1)*side;
        this.r2 -= this.om; 
        this.x2  = x + Math.cos(this.r2)*side*Math.sqrt(2) ;
        this.y2 = y + Math.sin(this.r2)*side*Math.sqrt(2);
        this.r3 += this.om; 
        this.x3 = x - Math.cos(this.r3)*side;
        this.y3 = y + Math.sin(this.r3)*side;
    },
    // for Translation motion
    translate: function(){
        x += this.vel;
        this.x1 += this.vel;
        this.x2 += this.vel;
        this.x3 += this.vel;
        this.x4 += this.vel;
    },
    update: function(){
        this.draw();
        this.om = w;
        this.vel = v;
        //extra dot
        ctx.beginPath()
        ctx.arc(x-side, y_applied, 3, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillStyle = '#f44242';
        ctx.fill();
        ctx.closePath()
    }
}

function clear() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 2, canvas.width, canvas.height);
}

function animate() {
    clear();
    requestAnimationFrame(animate);
    box.update();
    if((f > mu * kg * g) && (f * y_applied > (kg * g * side)/2 ))
    {
        if(box.y3 < 0)
        {    
            clear();
            box.fixdraw();
        }
        else{
            a = (f - mu * kg * g) / kg;
            alp = ( (f * y_applied/ 100) - (kg * g * side / 100 )/2 ) / ( kg * (side / 100) * (side / 100) / 6);
            v += a/100;
            w += alp/1000;
            box.topple();
            box.translate();
            box.update();
        }
    }
    //Topples
    else if((f < mu * kg * g) && (f * y_applied > (kg * g * side)/2 ))
    {
        if(box.y3 < 0)
        {    
            clear();
            box.fixdraw();
        }
        else{
            alp = ( (f * y_applied/ 100) - (kg * g * side / 100 )/2 ) / ( kg * (side / 100) * (side / 100) / 6);
            w += alp/1000;
            box.topple();
            box.update();
        }

    }
    //Translates
    else if((f > mu * kg * g) && (f * y_applied < (kg * g * side)/2 ))
    {
        if(box.y3 < 0)
        {    
            clear();
            box.fixdraw();
        }
        else{
            a = (f - mu * kg * g) / kg;
            v += a/100;
            box.translate();
            box.update();
        }
    }
    // Rest
    else if((f < mu * kg * g) && (f * y_applied < (kg * g * side)/2 ))
    {
        if(box.y3 < 0)
        {    
            clear();
            box.fixdraw();
        }
        else
            box.update();
    }
    a_display.innerText = a.toFixed(3);
    alp_display.innerText = alp.toFixed(3);
    om_display.innerText = w.toFixed(3);
    v_display.innerText = v.toFixed(3);
    if(x > canvas.width)
    {
        a_display.innerText = "Off limits please replay"
        alp_display.innerText = "Off limits please replay"
        om_display.innerText = "Off limits please replay"
        v_display.innerText = "Off limits please replay"
    }
}
animate();


var f_slider = document.getElementById("f-slider");
var f_spin = document.getElementById("f-spin");
var y_slider = document.getElementById("y-slider");
var y_spin = document.getElementById("y-spin");
var g_slider = document.getElementById("g-slider");
var g_spin = document.getElementById("g-spin");
var mu_slider = document.getElementById("mu-slider");
var mu_spin= document.getElementById("mu-spin");
var kg_slider = document.getElementById("kg-slider");
var kg_spin= document.getElementById("kg-spin");


function update_f(value) {
    f_slider.MaterialSlider.change(value);
    f_spin.value = value;
    f = value;
}

function update_kg(value) {
    kg_slider.MaterialSlider.change(value);
    kg_spin.value = value;
    kg = value;
}

function update_y(value) {
    y_slider.MaterialSlider.change(value);
    y_spin.value = value;
    y_applied = value;
}

function update_mu(value) {
    mu_slider.MaterialSlider.change(value);
    mu_spin.value = value;
    mu = value;
}

function update_g(value) {
    g_slider.MaterialSlider.change(value);
    g_spin.value = value;
    g = value;
}

function reset()
{
    w = 0;
    alp = 0;
    v = 0;
    a = 0;
    t_total = 0;
    x = canvas.width/2 - 175;
    box.x1 = x-side; box.y1 = y; box.r1 = Math.PI;
    box.x2 = x-side; box.y2 = y + side; box.r2 = Math.PI*0.75;
    box.x3 = x; box.y3 = y + side; box.r3 = Math.PI*0.5;
    box.x4 = x; box.y4 = y; box.r4 = 0;
    box.update();
}
document.getElementById("replay_btn").onclick = function() {
    reset();
}

document.getElementById("reset_btn").onclick = function() {
    reset();
    update_mu(0.5);
    update_f(5);
    update_g(10);
    update_y(37.5);
    update_kg(1);

}

// very bad practice due to materialize framework
setInterval(function() {
    update_f(Number(f_slider.value).toFixed(2));
    update_y(Number(y_slider.value).toFixed(2));
    update_kg(Number(kg_slider.value).toFixed(2));
    update_mu(Number(mu_slider.value).toFixed(2));
    update_g(Number(g_slider.value).toFixed(2));
}, 400);
