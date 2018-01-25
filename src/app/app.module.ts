import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GGridModule} from './g-grid/g-grid.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
