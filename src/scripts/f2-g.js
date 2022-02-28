import Engine from "./engine";
import { G } from "@antv/f2";

class F2GEngine extends Engine {
  constructor() {
    super();
    const ca = document.createElement("canvas");
    this.content.appendChild(ca);
    this.app = new G.Canvas({
      el: ca,
      width: this.width,
      height: this.height,
    });
    /**
     * @type {{ x, y, size, speed, el: G.Group }[]}
     */
    this.rects = [];
  }

  render() {
    (this.app.children || []).length = 0;
    this.rects = [];
    for (let i = 0; i < this.count.value; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const size = 10 + Math.random() * 40;
      const speed = 1 + Math.random();

      const rect = this.app.addShape("rect", {
        zIndex: 0,
        attrs: {
          x: x,
          y: y,
          width: size,
          height: size,
          fill: "white",
          stroke: "black",
          lineWidth: 1,
        },
      });

      this.rects[i] = { x, y, size, speed, el: rect };
    }

    this.onTick();
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

    this.app.draw();
    this.meter.tick();
    requestAnimationFrame(() => {
      this.onTick();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const engine = new F2GEngine();
  engine.render();
});
