import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DatastorageService } from '../shared/datastorage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = true;
  isAuthenticated = false;
  subscription = new Subscription();
  // @Output() featureselect = new EventEmitter<string>();
  constructor(private dataStorage: DatastorageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.user.subscribe(
      data => {
        this.isAuthenticated = data ? true : false;
        console.log('Authentication : ' + this.isAuthenticated);
      }
    )
  }

  // onSelect(featureSelection: string)
  // {
  //    this.featureselect.emit(featureSelection);
  // }

  onsaveReceipe() {
    this.dataStorage.onstoreReceipe();
  }

  onFetchData() {
    this.dataStorage.onFetchReceipe().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
