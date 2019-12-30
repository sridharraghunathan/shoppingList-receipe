import { Component, OnInit } from '@angular/core'
import { Ingredients } from '../shared/ingredients.model'
import { ShoppingListService } from './shopping-services'


@Component(
    {
        selector: 'app-shoppingList',
        templateUrl: './shoppingList.component.html',
        styleUrls: ['./shoppingList.component.css'],
    }
)

export class shoppingListComponent implements OnInit {
    ingredientsData: Ingredients[];
    editItemIndex: number;
    constructor(private shoppingservice: ShoppingListService) {
    }

    ngOnInit(): void {
        this.ingredientsData = this.shoppingservice.ingredientdata;
    }

    onEditItem(i: number) {
        this.shoppingservice.editIndex.next(i);
    }

}