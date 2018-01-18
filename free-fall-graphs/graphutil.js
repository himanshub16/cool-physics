var canvas1=document.getElementById('canvas1');
var ctx1 = canvas1.getContext('2d');
var canvas2=document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
var disp_graph,vel_graph;
var t_Array = new Array();
var y_Array = new Array();
var v_Array = new Array();

var disp_xA=200;var disp_yA = 400;
var vel_xA=200;var vel_yA = 100;

function plotgraph(){
disp_graph =new Graph(ctx1,0,disp_xA,0,disp_yA,30,480,450,450);
disp_graph.drawgrid(disp_xA/10,1,disp_yA/10,1);
disp_graph.drawaxes('t','y');

vel_graph =new Graph(ctx2,0,vel_xA,-vel_yA,vel_yA,35,255,450,450);
vel_graph.drawgrid(vel_xA/10,1,vel_yA/10,1);
vel_graph.drawaxes('t','v');


}
function updategraphs(){
  t_Array.push(t_total);
  y_Array.push(ball.y);
  v_Array.push(ball.v);
  disp_graph.plot(t_Array,y_Array,'blue',false,true);
  vel_graph.plot(t_Array,v_Array,'red',false,true);
}

function cleargraphs(){
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  plotgraph();
  updategraphs();
}
