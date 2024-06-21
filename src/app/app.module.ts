import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScannerQrComponent } from './scanner-qr/scanner-qr.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
@NgModule({
  declarations: [
    AppComponent,
    ScannerQrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
