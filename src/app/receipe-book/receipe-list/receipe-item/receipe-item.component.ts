import { Component, OnInit, Input } from '@angular/core';
import { receipe } from '../../receipe-model';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css']
})
export class ReceipeItemComponent implements OnInit {

  @Input() receipedata: receipe;
  @Input() index: number;
  constructor( ) { }

  ngOnInit() {


  }

  // onReceipeClk() {

  //   this.receipeService.receipeSelected.emit(this.receipedata)

  // }





}
