import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownDirective } from './dropdown.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [
    DropDownDirective,
    AlertComponent,
    SpinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropDownDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    SpinnerComponent,
    PlaceholderDirective],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
