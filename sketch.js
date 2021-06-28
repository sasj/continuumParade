// Continuum Parade
// Saskia Freeke
// 2021

let windowScale;

let t;
let theta;
let maxFrameCount = 200;

let shape = [];
let totalShapes = 11;

let colorPalette = [];
let backgroundColor;

let a = 76;

let lineHeight = 10;
let shapeSize = 100;


let amountShapes = 30;
let shapeGrid = 100;

function setup() {
    windowResized();
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    pixelDensity(1);
    // frameRate(5);
    // noCursor();

    colorPalette = [color('#000000'),color('#f72585'),color('#7ccbc0'),color('#1b2cc1'),color('#efca08')];
    backgroundColor = color('#fff4ec');

    initialiseShapes();
    // marginX = (this.shapeGrid);
    // marginY = (shapeSize);
}

function draw() {
    t = frameCount/maxFrameCount;
    theta = TWO_PI*t;
    background(backgroundColor);

    for (let i = 0; i < shape.length; i++){
        shape[i].display();
        shape[i].move();
    }

    fill(255,0,0);
    // ellipse(width/2,height/2,50,50);

}


class Shapes {

    constructor(){
        this.shapeGrid = shapeGrid;
        this.update();

        // movement
        this.state = 0;
        this.rotationDirection = int(random(0,2));

        this.tempRotation = 0;
        this.tempRotationCheck = 0;
        this.rotationMovement = 0;
        this.probability = 0;
    }

    update(){
        this.amountX = (width%this.shapeGrid);
        this.amountY = (height%this.shapeGrid);
        this.marginX = round(this.amountX/20)*10;
        this.marginY = round(this.amountY/20)*10;

        //
        this.diameter = int(random(1,5))*(this.shapeGrid/4);
        this.Color = int(random(1,colorPalette.length));
        //
        this.x = this.marginX+(int(random(2,(width/this.shapeGrid)-2))*this.shapeGrid);
        this.y = this.marginY+(int(random(2,(height/this.shapeGrid)-2))*this.shapeGrid);

        this.shapeVariant = int(random(0,3));
        this.rotateRadians = int(random(0,4))*90;

        this.speed = int(random(1,3));
        this.motion = int(random(1,2));

    }

    move(){

        if (this.state === 0 ){
            this.probability = random(0,10000);
            this.tempRotation = 0;
            // console.log(this.probability);
            if (this.probability < 1){
                // this.Color = 0;
                this.state = 1;
            }
        } else if  (this.state === 1){

            if (this.rotationDirection === 0){
                this.rotationMovement += this.tempRotation;

            } else {
                this.rotationMovement += -this.tempRotation;
            }
            this.tempRotationCheck += 1;
            this.tempRotation = 1;

            if (this.tempRotationCheck > 90){
                this.tempRotationCheck = 0;
                this.rotationDirection = int(random(0,2));

                this.state = 0;
            }
        }
        // console.log(this.rotationMovement);
    }


    display(){

        push();

        translate(this.x,this.y);
        rotate(radians((this.rotateRadians)));
        rotate(radians((this.rotationMovement)));

        fill(colorPalette[this.Color]);
        stroke(backgroundColor);

    if (this.shapeVariant === 0){
        push();
        rectMode(CENTER);
        rect(0,0,this.diameter,this.diameter);
        pop();
    } else if (this.shapeVariant === 1){
        push();
        arc(0,0,this.diameter,this.diameter,0,radians(180),PIE);
        pop();
    } else if (this.shapeVariant === 2){
        push();
        beginShape();
        vertex(0,0-this.diameter/2);
        vertex(0+this.diameter/2,0);
        vertex(0,0+this.diameter/2);
        endShape(CLOSE);
        pop();
    }



        pop();
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    responsiveness();
    initialiseShapes();
}


function keyPressed() {

    if (keyCode === 82) {
        for (let i = 0; i < shape.length; i++){
            shape[i].update();
        }
    }
}

function initialiseShapes(){
    shape = [];
    let shapeAmountX = int(width/shapeGrid);
    let shapeAmountY = int(height/shapeGrid);
    amountShapes = int((shapeAmountX*shapeAmountY)*2.7);

    console.log(amountShapes)

    for (let i = 0; i < amountShapes; i++){
        shape[i] = new Shapes();
    }
}



function responsiveness() {
    [
        { pixels: 320, shapeGrid: 50},
        { pixels: 768, shapeGrid: 100},
        { pixels: 1024, shapeGrid: 100},


    ].forEach((breakPoint) => {
        let matchMedia = window.matchMedia(`(min-width: ${breakPoint.pixels}px)`);
        // console.log(breakPoint, matchMedia);
        if (matchMedia.matches) {
            shapeGrid   = breakPoint.shapeGrid;
        }
    });
}
