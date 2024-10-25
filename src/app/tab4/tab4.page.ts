import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  a: number = 0;
  b: number = 0;
  c: number = 0;
  resultado: string = '';

  calcularRaices() {
    const discriminante = this.b ** 2 - 4 * this.a * this.c;

    if (this.a === 0) {
      this.resultado = 'el coeficiente a no puede ser cero.';
      return;
    }

    if (discriminante > 0) {
      const root1 = (-this.b + Math.sqrt(discriminante)) / (2 * this.a);
      const root2 = (-this.b - Math.sqrt(discriminante)) / (2 * this.a);
      this.resultado = `las races son: ${root1.toFixed(2)} y ${root2.toFixed(2)}`;
    } else if (discriminante === 0) {
      const root = -this.b / (2 * this.a);
      this.resultado = `la raiz doble es: ${root.toFixed(2)}`;
    } else {
      this.resultado = 'no hay raices reales.';
    }
  }
}
