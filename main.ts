import p5 from "p5";
//@ts-ignore
import Imgs from "./assets/images/*.png";

const sketch = (p: p5) => {
  const drawWidth = p.windowWidth / 2;
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
  const centerX = drawWidth / 2;
  const greenLeftEdge = centerX - radius;
  const greenRightEdge = centerX + radius;
  const greenBorderY = 500;
  const strokeWeight = 5;
  const drumsStr: string[][] = [
    ["bell", "cherry", "palm", "flag", "bomb", "ball", "seven", "ball", "bell", "seven", "bomb", "flag", "cherry", "palm", "palm", "seven", "bell", "ball", "cherry", "flag"],
    ["cherry", "palm", "palm", "seven", "bell", "ball", "cherry", "flag", "bell", "cherry", "palm", "flag", "bomb", "ball", "seven", "ball", "bell", "seven", "bomb", "flag"],
    ["ball", "cherry", "flag", "bell", "cherry", "palm", "flag", "bomb", "ball", "seven", "ball", "bell", "seven", "bomb", "flag", "cherry", "palm", "palm", "seven", "bell"]
  ]
  const drumImgs: p5.Image[][] = []
  const drumStopBorderRange = [400+(300/2) - imgH, 400+(300/2)];
  const currentDrum: number[] = [0, 0, 0];

  const topCirclesN: number = Math.floor(drawWidth / 75) - 1
  const circlesMargin: number = (drawWidth - 80) / (topCirclesN - 1)
  const verticalCirclesN: number = Math.floor(p.windowHeight / circlesMargin) - 1
  let imgsY: number[][] = new Array(drumsStr[0].length);
  let v = [30, 30, 30];
  let a = [0, 0, 0];
  p.setup = () => {
    setupImages();
    p.frameRate(60);
    // iPad width: 834 height: 1112
    let canvas = p.createCanvas(drawWidth, p.windowHeight);
    canvas.parent("canvas");
    p.background(white);
    bgLayer = p.createGraphics(drawWidth, p.windowHeight);
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
    for (let i = 0; i < drumsStr[0].length; i++) {
      drumImgs.push([]);
      for (let j = 0; j < 3; j++) {
        drumImgs[i].push(p.loadImage(Imgs[drumsStr[j][i]]));
      }
    }
    for (let i = 0; i < imgsY.length; i++) {
      for (let j = 0; j < 3; j++) {
        imgsY[i] = [imgH * i, imgH * i, imgH * i];
      }
    }
    console.log(imgsY);
  }

  const drawButtons = () => {
    for (let i = 0; i < 3; i++) {
      stopButtons.push(p.createButton("Stop"))
      stopButtons[i].position(greenLeftEdge + 50 + (135 * i), 750)
      stopButtons[i].size(135, 70);
      stopButtons[i].mousePressed(function() {
        stopDrum(i)
      });
      stopButtons[i].parent("canvas")
    }
  }

  const drawBackground = () => {
    bgLayer.fill(red);
    bgLayer.rect(redRectMergin, redRectMergin, drawWidth-(redRectMergin*2), p.windowHeight-redRectMergin);
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
    inp.parent("canvas");
    inp.style('font-size', '50px');
  }

  const drawCircles = () => {
    bgLayer.noStroke();
    let count = Math.round(p.frameCount / 9) % (2 * verticalCirclesN + topCirclesN);
    // left
    for (let i = 0; i < verticalCirclesN; i++) {
      if (count == i) {
        bgLayer.fill(yellow);
      } else {
        bgLayer.fill(255, 255, 255);
      }
      bgLayer.circle(40, 40+circlesMargin*(verticalCirclesN - i), 40);
    }

    // top
    count -= verticalCirclesN;
    for (let i = 0; i < topCirclesN; i++) {
      if (count == i) {
        bgLayer.fill(yellow);
      } else {
        bgLayer.fill(255, 255, 255);
      }
      bgLayer.circle(40+circlesMargin*i, 40, 40);
    }

    // right
    count -= topCirclesN;
    for (let i = 0; i < verticalCirclesN; i++) {
      if (count == i) {
        bgLayer.fill(yellow);
      } else {
        bgLayer.fill(255, 255, 255);
      }
      bgLayer.circle(40+(circlesMargin*(topCirclesN - 1)), 40+(circlesMargin * (i + 1)), 40);
    }
  };

  const drawDrum = () => {
    let skipDraw = false;
    for (let i = 0; i < 3; i++) {
      v[i] += a[i];
      if (a[i] < 0 && v[i] < 5) {
        v[i] = 5;
        a[i] = 0;
      }
    }
    for (let i = 0; i < imgsY.length; i++) {
      for (let j = 0; j < 3; j++) {
        imgsY[i][j] += v[j];
        if (imgsY[i][j] > 800) {
          imgsY[i][j] -= imgH*imgsY.length;
          skipDraw = true;
        }
        if (drumStopBorderRange[0] <= imgsY[i][j] && imgsY[i][j] <= drumStopBorderRange[1]) {
          console.log(v[j]);
          if (v[j] == 1) {
            if (Math.abs((drumStopBorderRange[0]+drumStopBorderRange[1])/2 - imgsY[i][j]) < 3) {
              v[j] = 0;
              console.log("Stop");
            }
          }
          if (v[j] == 5) {
            v[j] = 1;
          }
          // currentDrum[j] = i;
        }
        if (!skipDraw) {
          p.image(drumImgs[i][j], greenLeftEdge + 50+(140*j), imgsY[i][j], imgW, imgH);
        }
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

  const stopDrum = (n: number) => {
    console.log(n);
    console.log(drumsStr[n][currentDrum[0]]);
    a[n] = -0.5;
  }
};

new p5(sketch);
