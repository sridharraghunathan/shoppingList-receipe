import { receipe } from './receipe-model';
import {   Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../ShoppingList/shopping-services';
import { Subject } from 'rxjs';

@Injectable(
    {providedIn:'root'}
)
export class ReceipeService {
 
    // receipeSelected = new EventEmitter<receipe>();
    receipeChanged = new Subject<receipe[]>();
    private receipes: receipe[] = [
        // new receipe('Sandwich',
        //     'Swesdish Dish',
        //     'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Submarine_sandwich_and_chips.jpg/1024px-Submarine_sandwich_and_chips.jpg',
        //     [
        //         new Ingredients('Apple', 12),
        //         new Ingredients('Meat', 10),
        //     ]

        // ),
        // new receipe(
        //     'chickenBurger',
        //     'Labanese Dish',
        //     'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Fried_chicken_Burger_in_Milan%2C_Italy.jpg/120px-Fried_chicken_Burger_in_Milan%2C_Italy.jpg',
        //     [
        //         new Ingredients('Banana', 10),
        //         new Ingredients('Bun', 20)
        //     ]
        // )


    ]

    constructor(private shoppingService: ShoppingListService
                ) { }

    setReceipeDb(receipe: receipe[])
    {
        this.receipes = receipe;
        this.receipeChanged.next(this.receipes.slice())
    }

    getReceipe() {
        return this.receipes.slice();
    }

    addRecipe(newReceipe : receipe ){
         this.receipes.push(newReceipe);
         this.receipeChanged.next(this.receipes.slice())
    }

    updateReceipe(index, newReceipe : receipe )
    {
        this.receipes[index]= newReceipe;
        this.receipeChanged.next(this.receipes.slice())
    }

    deleteReceipe(id: number) {
     this.receipes.splice(id,1);
     this.receipeChanged.next(this.receipes.slice());
    }

    getReceipeData(index) {
        return this.receipes[index];
    }

    getIngredientData(ingredients: Ingredients[]) {
        this.shoppingService.onAddIngredientFromReceipe(ingredients);
    }


}