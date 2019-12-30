import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'


const appRoutes: Routes = [
  { path: '', redirectTo: '/authenticate', pathMatch: 'full' },
  //old Syntax
  //{path :'receipe', loadChildren: './receipe-book/receipe.module#ReceipeModule'}
  {
    path: 'receipe',
    loadChildren: () => import('./receipe-book/receipe.module').then(m => m.ReceipeModule)
  },

  {
    path: 'shopping-list',
    loadChildren: () => import('./ShoppingList/shopping.module').then(m => m.ShoppingModule)
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]

})
export class AppRouteModule { }
