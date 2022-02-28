import Engine from "./engine";
import * as G from "@antv/g";
import { Renderer as CanvasRenderer } from "@antv/g-canvas";

class GEngine extends Engine {
  constructor() {
    super();
    this.app = new G.Canvas({
      container: this.content,
      width: this.width,
      height: this.height,
      renderer: new CanvasRenderer(),
    });
    this.root = new G.Group();
    this.rects = [];
    this.app.appendChild(this.root);
  }

  render() {
    this.root.removeChildren(false);
    this.rects = [];
    for (let i = 0; i < this.count.value; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const size = 10 + Math.random() * 40;
      const speed = 1 + Math.random();

      const rect = new G.Rect({
        style: {
          x,
          y,
          width: size,
          height: size,
          fill: "white",
          stroke: "black",
          lineWidth: 1,
        },
      });
      this.root.appendChild(rect);
      this.rects[i] = { x, y, size, speed, el: rect };
    }
    this.onTick();
    // this.app.addEventListener("tick", this.onTick);
  }

  onTick() {
    const rectsToRemove = [];

    for (let i = 0; i < this.count.value; i++) {
      const rect = this.rects[i];
      rect.x -= rect.speed;
      rect.el.attr("x", rect.x);
      if (rect.x + rect.size < 0) rectsToRemove.push(i);
    }

    rectsToRemove.forEach((i) => {
      this.rects[i].x = this.width + this.rects[i].size / 2;
    });

    this.meter.tick();
    requestAnimationFrame(() => {
      this.onTick();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const engine = new GEngine();
  engine.render();
});
