import { NgModule } from '@angular/core';
import {  Routes, RouterModule  } from '@angular/router'
import { ReceipeBookComponent } from './receipe-book.component';
import { AuthGuard } from '../auth/auth.guard';
import { ReceipeStartComponent } from './receipe-start/receipe-start.component';
import { ReceipeEditComponent } from './receipe-edit/receipe-edit.component';
import { ReceipeDetailComponent } from './receipe-detail/receipe-detail.component';
import { ReceipeResolver } from './receipe-resolver.service';


const appRoutes :Routes =[
 //remove top routing from the router 
 //remove the module register in app module
 //add the receipe with path and class in app routing module

  {path : '' , component: ReceipeBookComponent,
    canActivate:[AuthGuard], 
  children :[
    {path: '', component: ReceipeStartComponent},

    {path : 'new', component: ReceipeEditComponent},

    {path: ':id', component: ReceipeDetailComponent 
    ,resolve:[ReceipeResolver]},
    {path : ':id/edit', component: ReceipeEditComponent,resolve:[ReceipeResolver]},
  ]},
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(appRoutes)],
  exports: [RouterModule ]
})
export class ReceipeRoutingModule { }
