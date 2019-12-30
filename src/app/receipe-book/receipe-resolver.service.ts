import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { receipe } from './receipe-model';
import { DatastorageService } from '../shared/datastorage.service';
import { ReceipeService } from './receipe-services';

@Injectable({
    providedIn:'root'
})
export class ReceipeResolver implements Resolve<receipe>{
    constructor(private dataStorageService : DatastorageService,
                private receipeService : ReceipeService){}
    resolve(route:  ActivatedRouteSnapshot, state: RouterStateSnapshot): any
    {
        const receipe = this.receipeService.getReceipe();
        if(receipe.length == 0)
        {
            return this.dataStorageService.onFetchReceipe();
        }

        return receipe;
        
    }

}