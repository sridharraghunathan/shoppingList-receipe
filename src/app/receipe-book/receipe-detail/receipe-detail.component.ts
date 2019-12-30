import { Component, OnInit } from '@angular/core';
import { receipe } from '../receipe-model';
import { ReceipeService } from '../receipe-services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {

  // @Input() 
  selectDatareceipe: receipe;
  id: number;

  constructor(private receipeService: ReceipeService,
    private route: ActivatedRoute,
    private routenav: Router
  ) { }

  ngOnInit() {
    const id = this.route.params.subscribe((paramId) => {
      this.id = +paramId['id']
      this.selectDatareceipe = this.receipeService.getReceipeData(this.id);
    })
  }

  onEditData() {
    //this.routenav.navigate(['edit'], {relativeTo:this.route})
    this.routenav.navigate(['../', this.id, 'edit'], { relativeTo: this.route })

  }
  onDeleteData() {
    this.receipeService.deleteReceipe(this.id);
    this.routenav.navigate(['../'], { relativeTo: this.route })
  }
  onIngredData() {
    this.receipeService.getIngredientData(this.selectDatareceipe.ingredients)
  }
}
