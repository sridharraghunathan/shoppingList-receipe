import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model'
import { ShoppingListService } from '../shopping-services';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form', { static: false }) shopForm: NgForm

  subscriptionArray = new Subscription();
  editItemIndex: number;
  editMode: boolean = false;
  editIngredientsData: Ingredients;

  constructor(private shoppingService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscriptionArray = this.shoppingService.editIndex.subscribe(
      (editData) => {
        this.editItemIndex = editData;
        this.editMode = true;
        this.editIngredientsData = this.shoppingService.onEditIngredients(this.editItemIndex);
        this.shopForm.setValue({
          name: this.editIngredientsData.Ingredientname,
          amount: this.editIngredientsData.amount
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptionArray.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const Ingrd = new Ingredients(value.name, value.amount)
    if (this.editMode) {
      this.shoppingService.onUpdatedIngredients(this.editItemIndex, Ingrd)
    }
    else {
      this.shoppingService.onIngredientData(Ingrd);
    }
    this.onClear()
  }
  onDelete()
  {
    this.shoppingService.onDeleteItem(this.editItemIndex);
    this. onClear()
  }

  onClear()
  {
    this.editMode = false
    this.shopForm.reset();
  }

}

