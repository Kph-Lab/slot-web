import p5 from "p5";

const sketch = (p: p5) => {
  let x = 50;
  let button: p5.Element;
  p.setup = () => {
    button = p.createSlider(0, 100, x, 1);

    p.createCanvas(400, 400);
  };

  p.draw = () => {
    let v = button.value();
    let vn = toNum(v, 0);
    p.background(220);
    p.ellipse(50-vn, 100, 10, 80);
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
