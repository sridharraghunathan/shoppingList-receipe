import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  isLogin: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  constructor(private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private route: Router
  ) { }
  ngOnInit() {

  }

  onErrorClick() {
    this.error = null;
  }

  onLogin() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    let authObs: Observable<AuthResponse>;
    let email = form.value.email;
    let password = form.value.password;

    if (this.isLogin) {
      this.isLoading = true;
      authObs = this.authService.signIn(email, password);
    }
    else {
      this.isLoading = true;
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(
      respData => {
        console.log(respData)
        this.isLoading = false;
        this.route.navigate(['/receipe'])
      },
      errorMessage => {
        console.log(errorMessage)
        this.error = errorMessage;
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      },
    );

    form.reset();
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.errorMsg = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
