import p5 from "p5";
//@ts-ignore
import Imgs from "./assets/images/sample/*.png";

const sketch = (p: p5) => {
  let x = 50;
  let button: p5.Element;
  let loadedImages: p5.Image[] = [];
  const imgW = 100;
  const imgH = 100;
  const yellow = p.color("#f2d15b");
  const red = p.color("#b30401");
  const white = p.color("#ffffff");
  const green = p.color("#036c0d");
  for (let img in Imgs) {
    loadedImages.push(p.loadImage(Imgs[img]));
  }
  let imgsY: Array<number> = Array(loadedImages.length);
  for (let i = 0; i < imgsY.length; i++) {
    imgsY[i] = 100 * i;
  }
  let v = 10;
  let a = 0;
  p.setup = () => {
    // iPad width: 834 height: 1112
    p.createCanvas(p.windowWidth, p.windowHeight);
    button = p.createSlider(0, 100, x, 1);
  };

  p.draw = () => {
    drawBackground();
    // drawDrum();
    drawCircles();
  };

  const drawBackground = () => {
    const redRectMergin = 80;
    const radius = 250;
    const diameter = radius * 2;
    const centerX = p.windowWidth / 2;
    const greenLeftEdge = centerX - radius;
    const greenRightEdge = centerX + radius;
    const greenBorderY = 500;
    const strokeWeight = 5;
    p.background(0);
    p.fill(red);
    p.rect(redRectMergin, redRectMergin, p.windowWidth-(redRectMergin*2), p.windowHeight-redRectMergin);
    p.fill(green);
    p.stroke(0);
    p.strokeWeight(strokeWeight);
    p.arc(centerX, greenBorderY, diameter, diameter, p.PI, 0);
    p.noStroke();
    p.rect(greenLeftEdge, greenBorderY, diameter, p.windowHeight- greenBorderY);
    p.stroke(0);
    p.strokeWeight(strokeWeight);
    p.line(greenLeftEdge, greenBorderY, greenLeftEdge, p.windowHeight);
    p.line(greenRightEdge, greenBorderY, greenRightEdge, p.windowHeight);
  }

  const drawCircles = () => {
    p.noStroke();
    let count = Math.round(p.frameCount / 9) % 34;
    // left
    for (let i = 0; i < 12; i++) {
      if (count == i) {
        p.fill(yellow);
      } else {
        p.fill(255, 255, 255);
      }
      p.circle(40, 40+75*(12 - i), 40);
    }

    // top
    count -= 12;
    for (let i = 0; i < 11; i++) {
      if (count == i) {
        p.fill(yellow);
      } else {
        p.fill(255, 255, 255);
      }
      p.circle(40+75*i, 40, 40);
    }

    // right
    count -= 11;
    for (let i = 0; i < 12; i++) {
      if (count == i) {
        p.fill(yellow);
      } else {
        p.fill(255, 255, 255);
      }
      p.circle(40+75*10, 40+75+75*i, 40);
    }
  };

  const drawDrum = () => {
    for (let i = 0; i < 6; i++) {
      imgsY[i] += v;
      if (imgsY[i] > 400) {
        imgsY[i] -= 100*6;
      }
      p.image(loadedImages[i], 200, imgsY[i], imgW, imgH);
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
