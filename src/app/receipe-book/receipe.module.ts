import { NgModule } from '@angular/core';
import { ReceipeBookComponent } from './receipe-book.component';
import { ReceipeListComponent } from './receipe-list/receipe-list.component';
import { ReceipeDetailComponent } from './receipe-detail/receipe-detail.component';
import { ReceipeItemComponent } from './receipe-list/receipe-item/receipe-item.component';
import { ReceipeStartComponent } from './receipe-start/receipe-start.component';
import { ReceipeEditComponent } from './receipe-edit/receipe-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ReceipeRoutingModule } from './receipe-routing.module';



@NgModule({
  declarations: [
    ReceipeBookComponent,
    ReceipeListComponent,
    ReceipeDetailComponent,
    ReceipeItemComponent,
    ReceipeStartComponent,
    ReceipeEditComponent 
  ],
  imports: [
    ReceipeRoutingModule,
    SharedModule
  ],
  // exports:[
  //   ReceipeBookComponent,
  //   ReceipeListComponent,
  //   ReceipeDetailComponent,
  //   ReceipeItemComponent,
  //   ReceipeStartComponent,
  //   ReceipeEditComponent
  // ]
})
export class ReceipeModule { }
