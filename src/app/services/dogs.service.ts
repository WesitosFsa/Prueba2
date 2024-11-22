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
  private apiImg = 'https://dog.ceo/api/breed/beagle/images/random'; 
  private apiTitle = 'https://gutendex.com/books/';  

  constructor(private http: HttpClient) {} 

  // Método para obtener imágenes de perros aleatorias y títulos de libros
  getRandomDogAndBook(): Observable<any> {
    const randomIds = this.getRandomBookIds();  
    const bookTitlesUrl = `${this.apiTitle}?ids=${randomIds}`;  
    const bookTitles$ = this.http.get<BookResponse>(bookTitlesUrl); 

    // Realiza solicitudes para obtener múltiples imágenes de perros
    const dogImageRequests$ = this.getRandomDogImages(randomIds.length);

    return new Observable<any>((observer) => {

      forkJoin([dogImageRequests$, bookTitles$]).subscribe(([dogImages, bookTitlesResponse]) => {
   
        observer.next({
          dogImages,  
          bookTitles: bookTitlesResponse.results,  
        });
        observer.complete();  
      });
    });
  }
  private getRandomBookIds(): string {
    const totalBooks = 10;  
    const randomCount = Math.floor(Math.random() * totalBooks) + 1; 
    const randomIds: number[] = []; 


    while (randomIds.length < randomCount) {
      const randomId = Math.floor(Math.random() * totalBooks) + 1;  
      if (!randomIds.includes(randomId)) { 
        randomIds.push(randomId);
      }
    }

    return randomIds.join(',');  // Convertimos el arreglo de IDs en una cadena separada por comas
  }

  // Método privado para obtener múltiples imágenes aleatorias de perros
  private getRandomDogImages(count: number): Observable<DogImageResponse[]> {
    const requests = [];  


    for (let i = 0; i < 10; i++) {
      requests.push(this.http.get<DogImageResponse>(this.apiImg));  
    }

    return forkJoin(requests);  
  }
}
