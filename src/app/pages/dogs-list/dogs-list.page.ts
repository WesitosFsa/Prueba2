import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';  // Importa el servicio de Firebase
import { DogsService } from '../../services/dogs.service';  // Importa el servicio que maneja las imágenes de perros

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.page.html',
  styleUrls: ['./dogs-list.page.scss'],
})
export class DogsListPage implements OnInit {
  dogImages: string[] = [];  // Array para las imágenes de perros
  bookTitles: string[] = [];  // Array para los títulos de los libros

  constructor(
    private dogsService: DogsService,
    private firebaseService: FirebaseService  // Inyecta el servicio Firebase
  ) {}

  ngOnInit(): void {
    this.dogsService.getRandomDogAndBook().subscribe((response) => {
      // Asignar varias imágenes de perros
      this.dogImages = response.dogImages.map((dogImage: any) => dogImage.message);  
      
      // Asignar los títulos de los libros
      this.bookTitles = response.bookTitles.map((book: any) => book.title); 
    });
  }

  // Método que se ejecuta cuando se hace clic en el botón de "Guardar"
  saveBooksAndDogs(): void {

    for (let i = 0; i < this.dogImages.length; i++) {

      this.firebaseService.saveBookAndDog(this.bookTitles[i], this.dogImages[i]).subscribe(
        () => {
          console.log(`Guardado: ${this.bookTitles[i]} - ${this.dogImages[i]}`);
        },
        (error) => {
          console.error('Error al guardar en Firestore', error);
        }
      );
    }
  }
}
