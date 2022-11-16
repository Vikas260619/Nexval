import { Injectable } from '@angular/core';
import { BarController, Chart } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}
}

export class CustomBarChart extends BarController {
  draw() {
    super.draw();
    const meta = this.getMeta();

    const sun = meta.data[meta.data.length - 1];
    const sat = meta.data[meta.data.length - 2];
    const ctx = this.chart.ctx;

    ctx.font = '16px sans-serif';
    ctx.fillStyle = '#1f45cc';
    ctx.save();

    const avg = (sun.y + sat.y) / 2;
    ctx.translate(sun.x + 5, avg * 2.2);
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.fillText('Week Off', 0, 0);

    ctx.restore();
    ctx.translate(sat.x + 5, avg * 2.2);
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.fillText('Week Off', 0, 0);
  }
}

CustomBarChart.id = 'CustomBarChart';
CustomBarChart.defaults = BarController.defaults;
