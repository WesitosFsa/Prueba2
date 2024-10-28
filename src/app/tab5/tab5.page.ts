import { Component } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
})
export class Tab5Page {
  texto: string = ''; // Texto ingresado por el usuario
  textoGuardado: string | null = null; // Texto guardado y mostrado en pantalla

  async guardarTexto() {
    this.textoGuardado = this.texto;
    await this.descargarArchivo(this.texto, 'texto_guardado.txt');
  }

  // Función para descargar el archivo en el sistema de archivos del dispositivo móvil
  async descargarArchivo(contenido: string, nombreArchivo: string) {
    try {
      // Guardar el archivo utilizando Capacitor Filesystem
      await Filesystem.writeFile({
        path: nombreArchivo,
        data: contenido,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      alert('Archivo guardado exitosamente en la carpeta de documentos');
    } catch (e) {
      console.error('Error guardando el archivo', e);
      alert('No se pudo guardar el archivo.');
    }
  }
}
