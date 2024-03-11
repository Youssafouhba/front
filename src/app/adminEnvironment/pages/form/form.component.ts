import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AdminActions } from '../../state/admin.actions';
import { selectAdmin } from '../../state/admin.selectors';
import {AppState} from "../../../state/app.state";
import { Admin } from '../../../models/admin/admin.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  Admin$: Observable<Admin | undefined>;
  admin: Admin | null = null;
  constructor(private router: ActivatedRoute, private store: Store<AppState>) {
    const id = this.router.snapshot.params['id'];
    this.Admin$ = this.store.select(selectAdmin(id));
    this.Admin$.subscribe(d => {
      if(d) this.admin = d;
    });

   }

  ngOnInit(): void {

  }

  formAction(data: {value: Admin, action: string}) {
    switch(data.action) {
      case "Create" : {
        this.store.dispatch({type: AdminActions.ADD_ANTI_HERO_API, payload: data.value});
        return;
      }
      case "Update" : {
        this.store.dispatch({type: AdminActions.MODIFY_ANTI_HERO_API, payload: data.value});
        return;
      }

      default: ""
    }
  }

}
