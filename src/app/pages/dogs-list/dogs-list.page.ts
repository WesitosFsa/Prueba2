import { Component, OnInit } from '@angular/core';
import { DogsService } from '../../services/dogs.service'; 

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.page.html',
  styleUrls: ['./dogs-list.page.scss'],
})
export class DogsListPage implements OnInit {
  dogImages: string[] = [];  
  bookTitles: string[] = []; 

  constructor(private dogsService: DogsService) {}

  ngOnInit(): void {
    this.dogsService.getRandomDogAndBook().subscribe((response) => {
      // Asignar varias imágenes de perros
      this.dogImages = response.dogImages.map((dogImage: any) => dogImage.message);  
      
      // Asignar los títulos de los libros
      this.bookTitles = response.bookTitles.map((book: any) => book.title); 
    });
  }
}
