import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';


interface BookResponse {
  results: { title: string }[]; 
}

interface DogImageResponse {
  message: string;  
}

@Injectable({
  providedIn: 'root',  
})
export class DogsService {
  private apiImg = 'https://dog.ceo/api/breed/beagle/images/random';  // URL para obtener una imagen aleatoria de un perro
  private apiTitle = 'https://gutendex.com/books/';  // URL para obtener los títulos de libros

  constructor(private http: HttpClient) {}  // El constructor inyecta el servicio HttpClient para realizar peticiones HTTP

  // Método para obtener imágenes de perros aleatorias y títulos de libros
  getRandomDogAndBook(): Observable<any> {
    const randomIds = this.getRandomBookIds();  // Genera un conjunto aleatorio de IDs de libros
    const bookTitlesUrl = `${this.apiTitle}?ids=${randomIds}`;  // Construye la URL para obtener los libros con los IDs aleatorios
    const bookTitles$ = this.http.get<BookResponse>(bookTitlesUrl);  // Realiza la solicitud HTTP para obtener los títulos de los libros

    // Realiza solicitudes para obtener múltiples imágenes de perros
    const dogImageRequests$ = this.getRandomDogImages(randomIds.length);

    return new Observable<any>((observer) => {
      // Usamos 'forkJoin' para esperar que ambas solicitudes (de perros y libros) se completen
      forkJoin([dogImageRequests$, bookTitles$]).subscribe(([dogImages, bookTitlesResponse]) => {
        // Cuando ambas solicitudes se resuelven, combinamos los resultados y los pasamos al 'observer'
        observer.next({
          dogImages,  // Las imágenes de los perros (un arreglo de URLs)
          bookTitles: bookTitlesResponse.results,  // Los títulos de los libros (arreglo de objetos con títulos)
        });
        observer.complete();  // Señalamos que la tarea se ha completado
      });
    });
  }

  // Método privado para generar un conjunto aleatorio de IDs de libros
  private getRandomBookIds(): string {
    const totalBooks = 10;  // Total de libros disponibles en la API
    const randomCount = Math.floor(Math.random() * totalBooks) + 1;  // Número aleatorio de libros a obtener (de 1 a 10)
    const randomIds: number[] = [];  // Arreglo donde almacenaremos los IDs aleatorios

    // Generamos un conjunto de IDs aleatorios sin repetir
    while (randomIds.length < randomCount) {
      const randomId = Math.floor(Math.random() * totalBooks) + 1;  // Generamos un ID aleatorio entre 1 y 10
      if (!randomIds.includes(randomId)) {  // Aseguramos que el ID no esté repetido
        randomIds.push(randomId);
      }
    }

    return randomIds.join(',');  // Convertimos el arreglo de IDs en una cadena separada por comas
  }

  // Método privado para obtener múltiples imágenes aleatorias de perros
  private getRandomDogImages(count: number): Observable<DogImageResponse[]> {
    const requests = [];  // Arreglo para almacenar las solicitudes HTTP de imágenes de perros

    // Generamos una cantidad de solicitudes igual al número de libros (count)
    for (let i = 0; i < 10; i++) {
      requests.push(this.http.get<DogImageResponse>(this.apiImg));  // Realizamos una solicitud HTTP para obtener una imagen de perro
    }

    return forkJoin(requests);  // Usamos 'forkJoin' para combinar todas las solicitudes y esperar a que se completen
  }
}
