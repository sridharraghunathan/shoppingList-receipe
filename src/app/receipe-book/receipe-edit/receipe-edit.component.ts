import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ReceipeService } from '../receipe-services';

@Component({
  selector: 'app-receipe-edit',
  templateUrl: './receipe-edit.component.html',
  styleUrls: ['./receipe-edit.component.css']
})
export class ReceipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private receipeSrvc: ReceipeService,
    private router: Router) { }

    editMode: boolean = false;
    id: Number;
    receipeForm: FormGroup;
  
  get ingredientContrl()
  {
    return (this.receipeForm.get('ingredients')as FormArray).controls;
  }

  ngOnInit() {

    this.route.params.subscribe((param) => {
      this.id = +param['id']
      this.editMode = param['id'] != null
      this.initForm()
    })

  }






  private initForm() {

    let receipeName = '';
    let receipeImagePath = '';
    let receipeDescription = '';
    let receipeIngredient = new FormArray([]);

    if (this.editMode) {
      const receipe = this.receipeSrvc.getReceipeData(this.id)
      receipeName = receipe.name;
      receipeImagePath = receipe.imagePath;
      receipeDescription = receipe.description;
      if (receipe['ingredients']) {
        receipe.ingredients.forEach(ingredient => {

          receipeIngredient.push(new FormGroup({
            'Ingredientname': new FormControl(ingredient.Ingredientname, Validators.required),
            'amount': new FormControl(ingredient.amount,
              [Validators.required,
              Validators.pattern(/^\d+$/)])
          })
          )
        });
      }
    }

    this.receipeForm = new FormGroup(
      {
        'name': new FormControl(receipeName, Validators.required),
        'description': new FormControl(receipeDescription, Validators.required),
        'imagePath': new FormControl(receipeImagePath, Validators.required),
        'ingredients': receipeIngredient
      }
    )
  }
  onDelete(index)
  {
    (<FormArray>this.receipeForm.get('ingredients')).removeAt(index);
  }
  
  onSubmit() {
    console.log(this.receipeForm.value)
    if (this.editMode) {
      this.receipeSrvc.updateReceipe(this.id, this.receipeForm.value)
    }
    else {
      this.receipeSrvc.addRecipe(this.receipeForm.value)
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onAddControl() {
    (<FormArray>this.receipeForm.get('ingredients')).push(
      new FormGroup({
        'Ingredientname': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,
        Validators.pattern(/^\d+$/)
        ])
      })
    )
  }
}
