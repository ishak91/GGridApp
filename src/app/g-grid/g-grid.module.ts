import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { GGridComponent } from './g-grid.component';


@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [GGridComponent],
  exports: [GGridComponent]
})
export class GGridModule { }
