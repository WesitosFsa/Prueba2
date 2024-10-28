import { Component } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
})
export class Tab5Page {
  texto: string = '';
  textoGuardado: string | null = null;

  guardarTexto() {
    this.textoGuardado = this.texto;
    this.descargarArchivo(this.texto, 'texto_guardado.txt');
  }

  descargarArchivo(contenido: string, nombreArchivo: string) {
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = nombreArchivo;

    document.body.appendChild(enlace); // Añadir el enlace al DOM
    enlace.click();
    document.body.removeChild(enlace); // Eliminar el enlace después de la descarga

    window.URL.revokeObjectURL(url); // Limpiar la URL después de la descarga
  }
}
