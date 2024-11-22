import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importamos Firestore
import { environment } from 'src/environments/environment'; // Importamos la configuración de Firebase
import { initializeApp } from 'firebase/app'; // Inicializamos Firebase

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db = initializeApp(environment.firebaseConfig);

  constructor(private firestore: AngularFirestore) {}

  saveBookAndDog(bookTitle: string, dogImageUrl: string): Promise<void> {
    const data = {
      bookTitle,
      dogImageUrl,
      createdAt: new Date(),
    };

    
    return this.firestore.collection('DatosPrueba2').add(data);
  }
}
