import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReceipeService } from '../receipe-book/receipe-services';
import { receipe } from '../receipe-book/receipe-model';
import { tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatastorageService {

  constructor(private http: HttpClient,
    private receipeService: ReceipeService,
    private authService: AuthService) {

  }

  onstoreReceipe() {
    const receipes = this.receipeService.getReceipe();
    this.http.put('https://ng-coursereceipe.firebaseio.com/receipes.json',
      receipes
    ).subscribe((receipe) => { console.log(receipe); })
  }

  onFetchReceipe() {
    return this.http.get<receipe[]>('https://ng-coursereceipe.firebaseio.com/receipes.json')
      .pipe(tap((receipe: receipe[]) => {
        console.log(receipe);
        this.receipeService.setReceipeDb(receipe)
      }))
  }

}
