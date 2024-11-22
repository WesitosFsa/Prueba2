import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { environment } from 'src/environments/environment'; 
import { initializeApp } from 'firebase/app'; 
import { from, Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db = initializeApp(environment.firebaseConfig); 

  constructor(private firestore: AngularFirestore) {}


  saveBookAndDog(Titulo: string, Imagen: string): Observable<any> {
    const data = {
      Titulo,
      Imagen,
      fechad: new Date(), 
    };


    return from(this.firestore.collection('PerrosLibros').add(data));  
  }
}
