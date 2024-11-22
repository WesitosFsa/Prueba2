import { Component, OnInit } from '@angular/core';
import { DogsService } from '../../services/dogs.service';  // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.page.html',
  styleUrls: ['./dogs-list.page.scss'],
})
export class DogsListPage implements OnInit {
  dogImages: string[] = [];  // Variable para almacenar múltiples URLs de imágenes de perros
  bookTitles: string[] = [];  // Variable para almacenar los títulos de los libros

  constructor(private dogsService: DogsService) {}

  ngOnInit(): void {
    this.dogsService.getRandomDogAndBook().subscribe((response) => {
      // Asignar varias imágenes de perros
      this.dogImages = response.dogImages.map((dogImage: any) => dogImage.message);  // Accede al campo 'message' de cada imagen
      
      // Asignar los títulos de los libros
      this.bookTitles = response.bookTitles.map((book: any) => book.title);  // Accede al campo 'title' de cada libro
    });
  }
}
