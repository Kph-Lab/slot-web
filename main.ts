import p5 from "p5";
//@ts-ignore
import Imgs from "./assets/images/sample/*.png";

const sketch = (p: p5) => {
  let x = 50;
  let button: p5.Element;
  let loadedImages: p5.Image[] = [];
  let bgLayer: p5.Graphics;
  const imgW = 100;
  const imgH = 100;
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

  for (let img in Imgs) {
    loadedImages.push(p.loadImage(Imgs[img]));
  }
  let imgsY: Array<number> = Array(loadedImages.length);
  for (let i = 0; i < imgsY.length; i++) {
    imgsY[i] = 100 * i;
  }
  let v = 30;
  let a = 0;
  p.setup = () => {
    p.frameRate(60);
    // iPad width: 834 height: 1112
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(yellow);
    bgLayer = p.createGraphics(p.windowWidth, p.windowHeight);

    // button = p.createSlider(0, 100, x, 1);
  };

  p.draw = () => {
    p.background(yellow);
    bgLayer.background(0);
    // drawInputs();
    drawDrum();
    drawBackground();
    drawCircles();
    bgLayer.textSize(20);
    bgLayer.text(p.frameRate(), 100, 100);
    p.image(bgLayer, 0, 0);
  };

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
    let inp = p.createInput();
    inp.position(0, -300);
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
    for (let i = 0; i < 6; i++) {
      imgsY[i] += v;
      if (imgsY[i] > 800) {
        imgsY[i] -= 100*6;
      }
      p.image(loadedImages[i], greenLeftEdge + 50, imgsY[i], imgW, imgH);
      p.image(loadedImages[i], greenLeftEdge + 190, imgsY[i], imgW, imgH);
      p.image(loadedImages[i], greenLeftEdge + 330, imgsY[i], imgW, imgH);
    }
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
