import p5 from "p5";
//@ts-ignore
import Imgs from "./assets/images/sample/*.png";

const sketch = (p: p5) => {
  let x = 50;
  let button: p5.Element;
  let loadedImages: p5.Image[] = [];
  const imgW = 100;
  const imgH = 100;
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
    p.createCanvas(p.windowWidth, p.windowHeight);
    button = p.createSlider(0, 100, x, 1);
  };

  p.draw = () => {
    p.background(220);
    for (let i = 0; i < 6; i++) {
      imgsY[i] += v;
      if (imgsY[i] > 400) {
        imgsY[i] -= 100*6;
      }
      p.image(loadedImages[i], 0, imgsY[i], imgW, imgH);
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
