import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Tab3Page {
  date1: string = '';
  date2: string = ''; 
  difference: string = ''; 

  constructor() {}

  calculateDifference() {
    if (this.date1 && this.date2) {
      const startDate = new Date(this.date1);
      const endDate = new Date(this.date2);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      this.difference = `La diferencia es de ${diffDays} dias.`;
    } else {
      this.difference = 'selecciona ambas fechas';
    }
  }
}