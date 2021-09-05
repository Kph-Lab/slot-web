import p5 from "p5";
//@ts-ignore
import Imgs from "./assets/images/*.png";
//@ts-ignore
import LightCircleImg from "./assets/images/circles/lightCircle.png";
//@ts-ignore
import DarkCircleImg from "./assets/images/circles/darkCircle.png";

const sketch = (p: p5) => {
  const drawWidth = p.windowWidth / 2;
  let inp: p5.Element;
  let stopButtons: p5.Element[] = [];
  let currentPressedButton = -1;
  let bgLayer: p5.Graphics;
  const imgW = 100;
  const imgH = 141;
  // const yellow = p.color("#f2d15b");
  // const yellow = p.color("#efff3c");
  const yellow = p.color(253, 242, 76);
  const red = p.color("#b30401");
  const white = p.color("#ffffff");
  const lightGray = p.color(200, 200, 200);
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
  const stoppedDrumsIndex = [-1, -1, -1];
  let pointScale: number = 1;

  const topCirclesN: number = Math.floor(drawWidth / 75) - 1
  const circlesMargin: number = (drawWidth - 80) / (topCirclesN - 1)
  const verticalCirclesN: number = Math.floor(p.windowHeight / circlesMargin) - 1
  const lightCircle = p.loadImage(LightCircleImg);
  const darkCircle = p.loadImage(DarkCircleImg);
  console.log(LightCircleImg);
  console.log(DarkCircleImg);
  let imgsY: number[][] = new Array(drumsStr[0].length);
  let v = [30, 30, 30];
  let a = [0, 0, 0];

  const gradientWhite = p.color(255, 255, 255, 0);
  const gradientBlack = p.color(0, 0, 0, 180);
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
    drawGradient();
    drawBackground();
    drawCircles();
    // bgLayer.textSize(20);
    // bgLayer.text(p.frameRate(), 100, 100);
    p.image(bgLayer, 0, 0);
    drawResultText();
  };

  p.keyPressed = () => {
    if (p.key == ' ') {
      stopDrum();
    }
    if (p.key == 'r') {
      init();
    }
    if (p.keyCode == p.ENTER) {
      inp.elt.blur();
    }
  }

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
  }

  const drawButtons = () => {
    for (let i = 1; i < 2; i++) {
      stopButtons.push(p.createButton("STOP"))
      stopButtons[i-1].position(greenLeftEdge + 50 + (135 * i), 750)
      stopButtons[i-1].size(135, 70);
      stopButtons[i-1].style('border-radius', '50%');
      stopButtons[i-1].style('background-color', '#efff3c');
      stopButtons[i-1].style('font-size', '40px');
      stopButtons[i-1].mousePressed(stopDrum);
      stopButtons[i-1].parent("canvas")
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
    bgLayer.noStroke();
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
    inp.style('type', 'number');
  }

  const drawCircles = () => {
    bgLayer.noStroke();
    let count = Math.round(p.frameCount / 9) % (2 * verticalCirclesN + topCirclesN);
    // left
    for (let i = 0; i < verticalCirclesN; i++) {
      if (count == i) {
        // bgLayer.fill(yellow);
        bgLayer.image(lightCircle, 20, 20+circlesMargin*(verticalCirclesN - i), 40, 40);
      } else {
        // bgLayer.fill(lightGray);
        bgLayer.image(darkCircle, 20, 20+circlesMargin*(verticalCirclesN - i), 40, 40);
      }
      // bgLayer.circle(40, 40+circlesMargin*(verticalCirclesN - i), 40);
    }

    // top
    count -= verticalCirclesN;
    for (let i = 0; i < topCirclesN; i++) {
      if (count == i) {
        // bgLayer.fill(yellow);
        bgLayer.image(lightCircle, 20+circlesMargin*i, 20, 40, 40);
      } else {
        // bgLayer.fill(lightGray);
        bgLayer.image(darkCircle, 20+circlesMargin*i, 20, 40, 40);
      }
      // bgLayer.circle(40+circlesMargin*i, 40, 40);
    }

    // right
    count -= topCirclesN;
    for (let i = 0; i < verticalCirclesN; i++) {
      if (count == i) {
        // bgLayer.fill(yellow);
        bgLayer.image(lightCircle, 20+(circlesMargin*(topCirclesN - 1)), 20+(circlesMargin * (i+1)), 40, 40);
      } else {
        // bgLayer.fill(lightGray);
        bgLayer.image(darkCircle, 20+(circlesMargin*(topCirclesN - 1)), 20+(circlesMargin * (i+1)), 40, 40);
      }
      // bgLayer.circle(40+(circlesMargin*(topCirclesN - 1)), 40+(circlesMargin * (i + 1)), 40);
    }
  };

  const drawDrum = () => {
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
        }
        if (drumStopBorderRange[0] <= imgsY[i][j] && imgsY[i][j] <= drumStopBorderRange[1]) {
          if (v[j] == 1) {
            if (Math.abs((drumStopBorderRange[0]+drumStopBorderRange[1])/2 - imgsY[i][j]) < 3) {
              v[j] = 0;
              stoppedDrumsIndex[j] = i;
              console.log(stoppedDrumsIndex[j]);
              console.log("Stop");
              if (j == 2) {
                calcPoint();
              }
            }
          }
          if (v[j] == 5) {
            v[j] = 1;
          }
          // currentDrum[j] = i;
        }
        p.image(drumImgs[i][j], greenLeftEdge + 50+(140*j), imgsY[i][j], imgW, imgH);
      }
    }
  }

  const drawGradient = () => {
    let gradient0 = p.drawingContext.createLinearGradient(p.windowWidth / 2, 400, p.windowWidth / 2, 550);
    let gradient1 = p.drawingContext.createLinearGradient(p.windowWidth / 2, 550, p.windowWidth / 2, 700);
    gradient0.addColorStop(0, gradientBlack);
    gradient0.addColorStop(1, gradientWhite);
    gradient1.addColorStop(1, gradientBlack);
    gradient1.addColorStop(0, gradientWhite);

    p.noStroke();
    p.drawingContext.fillStyle = gradient0;
    p.rect(greenLeftEdge + 50, 400, diameter - 100, 150);
    p.drawingContext.fillStyle = gradient1;
    p.rect(greenLeftEdge + 50, 550, diameter - 100, 150);
  }

  const drawResultText = () => {
    p.textSize(50);
    p.text(`枚×${pointScale}倍`, greenLeftEdge + 200, p.windowHeight - 200);
    p.text(`=${Number(inp.value()) * pointScale}枚`, greenLeftEdge + 200, p.windowHeight - 100);
  }

  const toNum = (arg: any, d: number):number => {
    if ('number' === typeof arg) {
      return arg
    } else {
      return d
    }
  }

  const stopDrum = () => {
    currentPressedButton += 1;
    if (currentPressedButton > 2) return;
    a[currentPressedButton] = -0.5;
  }

  const calcPoint = () => {
    console.log(drumsStr[0][stoppedDrumsIndex[0]]);
    console.log(drumsStr[1][stoppedDrumsIndex[1]]);
    console.log(drumsStr[2][stoppedDrumsIndex[2]]);
    if (drumsStr[0][stoppedDrumsIndex[0]] == "bomb" || drumsStr[1][stoppedDrumsIndex[1]] == "bomb" || drumsStr[2][stoppedDrumsIndex[2]] == "bomb") {
      pointScale = -1;
    }
    else if (drumsStr[0][stoppedDrumsIndex[0]] == "seven" && drumsStr[1][stoppedDrumsIndex[1]] == "seven" && drumsStr[2][stoppedDrumsIndex[2]] == "seven") {
      pointScale = 10;
    }
    else if (drumsStr[0][stoppedDrumsIndex[0]] == drumsStr[1][stoppedDrumsIndex[1]] && drumsStr[1][stoppedDrumsIndex[1]] == drumsStr[2][stoppedDrumsIndex[2]]) {
      pointScale = 3;
    } else {
      pointScale = 1;
    }
  }

  const init = () => {
    if (v[2] == 0) {
      a = [0, 0, 0];
      v = [30, 30, 30];
      pointScale = 1;
      currentPressedButton = -1;
    }
  }
};

new p5(sketch);
