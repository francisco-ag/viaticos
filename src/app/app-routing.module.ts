import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerQrComponent } from './scanner-qr/scanner-qr.component';

const routes: Routes = [
  {
    path: 'scanner-facturas',
    component: ScannerQrComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
