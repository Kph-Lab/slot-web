import p5 from "p5";
//@ts-ignore
import Imgs from "./assets/images/*.png";

const sketch = (p: p5) => {
  let inp: p5.Element;
  let stopButtons: p5.Element[] = [];
  let bgLayer: p5.Graphics;
  const imgW = 100;
  const imgH = 141;
  const yellow = p.color("#f2d15b");
  const red = p.color("#b30401");
  const white = p.color("#ffffff");
  const green = p.color("#036c0d");

  const redRectMergin = 80;
  const radius = 250;
  const diameter = radius * 2;
  const centerX = p.windowWidth / 2;
  const greenLeftEdge = centerX - radius;
  const greenRightEdge = centerX + radius;
  const greenBorderY = 500;
  const strokeWeight = 5;
  const drum0Str = ["bell", "cherry", "palm", "flag", "bomb", "ball", "seven", "ball", "bell", "seven", "bomb", "flag", "cherry", "palm", "palm", "seven", "bell", "ball", "cherry", "flag"]
  const drum1Str = ["cherry", "palm", "palm", "seven", "bell", "ball", "cherry", "flag", "bell", "cherry", "palm", "flag", "bomb", "ball", "seven", "ball", "bell", "seven", "bomb", "flag"]
  const drum2Str = ["ball", "cherry", "flag", "bell", "cherry", "palm", "flag", "bomb", "ball", "seven", "ball", "bell", "seven", "bomb", "flag", "cherry", "palm", "palm", "seven", "bell"]
  const drum0Imgs: p5.Image[] = []
  const drum1Imgs: p5.Image[] = []
  const drum2Imgs: p5.Image[] = []
  let imgsY: Array<number> = Array(drum0Str.length);
  let v = 30;
  let a = 0;
  p.setup = () => {
    setupImages();
    p.frameRate(60);
    // iPad width: 834 height: 1112
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(white);
    bgLayer = p.createGraphics(p.windowWidth, p.windowHeight);
    drawInputs();
    drawButtons();
  };

  p.draw = () => {
    p.background(white);
    bgLayer.background(0);
    // drawInputs();
    drawDrum();
    drawBackground();
    drawCircles();
    bgLayer.textSize(20);
    bgLayer.text(p.frameRate(), 100, 100);
    p.image(bgLayer, 0, 0);
    drawResultText();
  };

  const setupImages = () => {
    for (let n of drum0Str) {
      drum0Imgs.push(p.loadImage(Imgs[n]));
    }
    for (let n of drum1Str) {
      drum1Imgs.push(p.loadImage(Imgs[n]));
    }
    for (let n of drum2Str) {
      drum2Imgs.push(p.loadImage(Imgs[n]));
    }
    for (let i = 0; i < imgsY.length; i++) {
      imgsY[i] = imgH * i;
    }
  }

  const drawButtons = () => {
    for (let i = 0; i < 3; i++) {
      stopButtons.push(p.createButton("Stop"))
      stopButtons[i].position(greenLeftEdge + 50 + (135 * i), 750)
      stopButtons[i].size(135, 70);
    }
  }

  const drawBackground = () => {
    bgLayer.fill(red);
    bgLayer.rect(redRectMergin, redRectMergin, p.windowWidth-(redRectMergin*2), p.windowHeight-redRectMergin);
    bgLayer.fill(green);
    bgLayer.stroke(0);
    bgLayer.strokeWeight(strokeWeight);
    bgLayer.arc(centerX, greenBorderY, diameter, diameter, p.PI, 0);
    bgLayer.noStroke();
    bgLayer.rect(greenLeftEdge, greenBorderY, diameter, p.windowHeight- greenBorderY);
    bgLayer.stroke(0);
    bgLayer.strokeWeight(strokeWeight);
    bgLayer.line(greenLeftEdge, greenBorderY, greenLeftEdge, p.windowHeight);
    bgLayer.line(greenRightEdge, greenBorderY, greenRightEdge, p.windowHeight);
    bgLayer.erase();
    bgLayer.rect(greenLeftEdge + 50, 400, diameter - 100, 300);
    bgLayer.noErase();
  }

  const drawInputs = () => {
    inp = p.createInput();
    inp.position(greenLeftEdge + 20, p.windowHeight - 250);
    inp.size(150);
    inp.style('font-size', '50px');
  }

  const drawCircles = () => {
    bgLayer.noStroke();
    let count = Math.round(p.frameCount / 9) % 34;
    // left
    for (let i = 0; i < 12; i++) {
      if (count == i) {
        bgLayer.fill(yellow);
      } else {
        bgLayer.fill(255, 255, 255);
      }
      bgLayer.circle(40, 40+75*(12 - i), 40);
    }

    // top
    count -= 12;
    for (let i = 0; i < 11; i++) {
      if (count == i) {
        bgLayer.fill(yellow);
      } else {
        bgLayer.fill(255, 255, 255);
      }
      bgLayer.circle(40+75*i, 40, 40);
    }

    // right
    count -= 11;
    for (let i = 0; i < 12; i++) {
      if (count == i) {
        bgLayer.fill(yellow);
      } else {
        bgLayer.fill(255, 255, 255);
      }
      bgLayer.circle(40+75*10, 40+75+75*i, 40);
    }
  };

  const drawDrum = () => {
    let skipDraw = false;
    for (let i = 0; i < imgsY.length; i++) {
      imgsY[i] += v;
      if (imgsY[i] > 800) {
        imgsY[i] -= imgH*imgsY.length;
        skipDraw = true;
      }
      if (!skipDraw) {
        p.image(drum0Imgs[i], greenLeftEdge + 50, imgsY[i], imgW, imgH);
        p.image(drum1Imgs[i], greenLeftEdge + 190, imgsY[i], imgW, imgH);
        p.image(drum2Imgs[i], greenLeftEdge + 330, imgsY[i], imgW, imgH);
      }
    }
  }

  const drawResultText = () => {
    p.textSize(50);
    p.text("枚×100倍", greenLeftEdge + 200, p.windowHeight - 200);
    p.text("=10000枚", greenLeftEdge + 200, p.windowHeight - 100);
  }

  const toNum = (arg: any, d: number):number => {
    if ('number' === typeof arg) {
      return arg
    } else {
      return d
    }
  }

};

new p5(sketch);
