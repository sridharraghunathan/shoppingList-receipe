import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingListService
{
    ingredientdata: Ingredients[]=[] ;
    editIndex = new Subject<number>();    

    onIngredientData(ingredients)
    {
        this.ingredientdata.push(ingredients);
    }

  onAddIngredientFromReceipe(ingredients:Ingredients[])
  {
      this.ingredientdata.push(...ingredients);
  }

  onEditIngredients(index: number)
  {
      return this.ingredientdata[index];
  }

  onUpdatedIngredients(index: number, ingredientdata: Ingredients)
  {
    this.ingredientdata[index] = ingredientdata;
  }

  onDeleteItem(editItemIndex: number) {
      this.ingredientdata.splice(editItemIndex,1)
  }
}