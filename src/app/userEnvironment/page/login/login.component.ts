import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from '../../../models/user/user.model';
import { AuthActions } from '../../state/auth.actions';
import { selectError } from '../../state/auth.selectors';
import {AuthenticateService} from "../../../core/services/authenticate.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  error$ = this.store.select(selectError());


  constructor(private store: Store, private authService: AuthenticateService, private router: Router, private _snackBar: MatSnackBar) {
    this.checkJWT();
    this.getError();
  }

  submit(data: User) {
    this.store.dispatch({type: AuthActions.LOGIN, payload: data})

  }

  getError() {
    this.error$.subscribe(data => {
      if(data) {
        this._snackBar.open(data.message, "Error Auth");
      }
    })
  }


  checkJWT() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/Admin'])
    }
  }

}
