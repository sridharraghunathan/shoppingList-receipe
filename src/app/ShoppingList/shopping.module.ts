import { NgModule } from '@angular/core';
import { shoppingListComponent } from './shoppingList.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    shoppingListComponent,
    ShoppingEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(
      [
        { path: '', component: shoppingListComponent }
      ]
    )
  ]
})
export class ShoppingModule { }
