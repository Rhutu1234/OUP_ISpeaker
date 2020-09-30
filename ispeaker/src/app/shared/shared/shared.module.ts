import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionExpirationComponent } from '../session-expiration/session-expiration.component';
import { SpinnerComponent } from '../spinner/spinner.component';



@NgModule({
  declarations: [SessionExpirationComponent,
    SpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SessionExpirationComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
