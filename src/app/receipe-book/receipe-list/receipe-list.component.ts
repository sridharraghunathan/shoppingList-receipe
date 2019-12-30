import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { receipe } from '../receipe-model';
import { ReceipeService } from '../receipe-services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit, OnDestroy {

  receipes: receipe[];

  subscription = new Subscription()

  constructor(private receipeService: ReceipeService,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this.receipeService.receipeChanged.subscribe(
      (receipe: receipe[]) => {
        this.receipes = receipe

      }

    )
    this.receipes = this.receipeService.getReceipe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewReceipe() {

    this.route.navigate(['new'], { relativeTo: this.activeRoute })
  }
}
