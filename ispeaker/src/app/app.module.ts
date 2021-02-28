import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared/shared.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AccordionModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ButtonModule,
    SharedModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
