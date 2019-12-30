import { NgModule } from '@angular/core';
import { ShoppingListService } from './ShoppingList/shopping-services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
 


@NgModule({
  declarations: [],

  providers: [
    ShoppingListService,
  {
  provide:  HTTP_INTERCEPTORS,
  useClass : AuthInterceptor,
  multi : true
  }] 
})
export class CoreModule { }
