"use strict"
// variables used for canvas
const canvas = document.getElementById("canvasABC");
const ctx = canvas.getContext('2d');
const containerHeight = 50;
const containerWidth = 50;
const freeSpace = 20;

// function onclick Submit Button
function btnOnClick(){
// get value from form    
let input = document.getElementById('numberEntered').value; 
// check if number between 1-100, if lower set to one, if greater set to 100
if(input<1){
    input=1;
    document.getElementById('numberEntered').value=1;
}
else if(input>100){
    input=100;
    document.getElementById('numberEntered').value=100;
}
// set canvas width/height based on the input
canvas.width = input*containerWidth+freeSpace*2+input*2;
canvas.height = input*containerHeight+freeSpace*2+input*2;


// set array for the coordinates from the output
let coord= [];
for(let i= 0;i<input;i++){
coord[i] = [];
 };

// set up start value for right left down up variable and counter  
let right = input;
let down = input;
let left = 1;
let up = 1;
let counter = input*input;
// call the first function   
rightCount(right, down, left, up, counter,coord);
}
console.log("The End");
/*
The following four function assign the value from rightTop to leftTop then leftBottom the rightBottom and RightTop
After each assignbment the counter will decreased, if a corner is reached the following function will be called, and the variable will decreased.
if counter <=0 the function will stop with retrurn false.

*/
function rightCount(right, down, left, up, counter, coord){
    for(let i=left;i<=right;i++){
        coord[up-1][i-1] = counter;
        createBoxes(up-1,i-1,counter);
        counter--;
        if(counter<=0){return false}
    }
    up++;
    downCount(right, down, left, up, counter, coord);
}

function downCount(right, down, left, up, counter, coord){
    for(let i=up;i<=down;i++){
        coord[i-1][right-1] = counter;
        createBoxes(i-1,right-1,counter);
        counter--;
        if(counter<=0){return false}
    }
    right--;
    leftCount(right, down, left, up, counter, coord);
}

function leftCount(right, down, left, up, counter, coord){
    for(let i=right;i>=left;i--){
        coord[down-1][i-1] = counter;
        createBoxes(down-1, i-1,counter);
        counter--;
        if(counter<=0){return false}
    }
    down--;
    upCount(right, down, left, up, counter, coord);
}

function upCount(right, down, left, up, counter, coord){
    for(let i=down;i>=up;i--){
        coord[i-1][left-1] = counter;
        createBoxes(i-1,left-1,counter);
        counter--;
        if(counter<=0){return false}
    }
    left++;
    rightCount(right, down, left, up, counter, coord);
}
// canvas to create rectangle and the nummbers
function createBoxes(x,y,counter){
    let colDivisor = document.getElementById('numberEntered').value;
    let opacity = (0.7*counter/(colDivisor*colDivisor))+0.3;
    let color = 'rgba(59,88,138,'+opacity+')';
    if(counter==1){color="red"};
    let recY = freeSpace+(containerWidth*x)+x*2;
    let recX = freeSpace+(containerHeight*y)+y*2;
    ctx.fillStyle=color;
    ctx.fillRect(recX,recY,containerWidth,containerHeight);
    ctx.fillStyle='black';
    ctx.font = "15px Arial"
    ctx.fillText(counter,recX+10,recY+35);
}