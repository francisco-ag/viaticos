import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scanner-qr',
  templateUrl: './scanner-qr.component.html',
  styleUrl: './scanner-qr.component.css'
})
export class ScannerQrComponent {

  facturaData: any;
  isBrowser: boolean;
  hasDevices: boolean = false;
  hasPermission: boolean = false;
  qrResultString: string = '';
  errorMessage: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.requestCameraPermissions();

    }
  }

  onCodeResult(resultString: string) {
    if (this.isBrowser) {
      console.log(resultString);
      this.processQRCode(resultString);
    }
  }

  processQRCode(qrCodeString: string) {
    if (this.isBrowser) {
      // Procesa la cadena de QR para obtener los datos de la factura
      const url = new URL(qrCodeString);
      fetch(url.toString())
        .then(response => response.json())
        .then(data => {
          console.log('Datos de la factura:', data);
          this.facturaData = data;
        })
        .catch(error => console.error('Error al obtener los datos de la factura:', error));
    }
  }

  handleError(error: any) {
    console.error('Error al intentar acceder a la cámara:', error);
    this.errorMessage = 'Error al intentar acceder a la cámara. ';
    if (error.name === 'NotAllowedError') {
      this.errorMessage += 'Permiso para acceder a la cámara denegado.';
    } else if (error.name === 'NotReadableError') {
      this.errorMessage += 'No se puede acceder a la cámara. Puede estar siendo utilizada por otra aplicación.';
    } else {
      this.errorMessage += 'Error: ' + error.message;
    }
  }


  async requestCameraPermissions() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        this.handleError(error);
      }
    }
  }
  
}
