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
    for (let i = 0; i < 6; i++) {
      imgsY[i] += v;
      if (imgsY[i] > 400) {
        imgsY[i] -= 100*6;
      }
      p.image(loadedImages[i], 200, imgsY[i], imgW, imgH);
    }
    drawCircles();
  };

  const drawBackground = () => {
    p.background(0);
    p.fill(red);
    p.rect(80, 80, p.windowWidth-160, p.windowHeight-80);
    p.fill(green);
    p.stroke(0);
    p.strokeWeight(5);
    p.arc(p.windowWidth/ 2, 500, 500, 500, p.PI, 0);
    p.noStroke();
    p.rect((p.windowWidth / 2)- 250, 500, 500, p.windowHeight- 500);
    p.stroke(0);
    p.strokeWeight(5);
    p.line((p.windowWidth / 2) - 250, 500, (p.windowWidth / 2) - 250, p.windowHeight);
    p.line((p.windowWidth / 2) + 250, 500, (p.windowWidth / 2) + 250, p.windowHeight);
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

  const toNum = (arg: any, d: number):number => {
    if ('number' === typeof arg) {
      return arg
    } else {
      return d
    }
  }

};

new p5(sketch);
