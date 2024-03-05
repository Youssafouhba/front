import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { TableActions } from '../../enums/table-actions.enum';

import { AdminActions } from '../../state/admin.actions';
import {selectAdmins, selectAdmin} from '../../state/admin.selectors';
import {AppState} from "../../../state/app.state";
import {Admin} from "../../../models/admin/admin.model";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  // sample data of anti hero
  Admines: ReadonlyArray<Admin> = [];
  Admines$ = this.store.select(selectAdmins());

  headers: {headerName: string, fieldName: keyof Admin}[] = [
    {headerName: "First Name", fieldName: "firstName"},
    {headerName: "Last Name", fieldName: "lastName"},
  ]

  constructor(
    private router: Router,
    private store: Store<AppState>,
    ) { }

  ngOnInit(): void {
    this.store.dispatch({type: AdminActions.GET_ANTI_HERO_LIST});
    this.assignAdmines();
  }

  assignAdmines() {
    this.Admines$.subscribe((data) => {
      this.Admines = data;
    });
  }

  selectAdmin(data: {Admin: Admin, action: TableActions}) {
    switch(data.action) {
      case TableActions.View: {
        this.router.navigate(['Admins', 'form', data.Admin.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: AdminActions.REMOVE_ANTI_HERO_API, payload: data.Admin.id});
        return;

      }
      default: ""
    }
  }

  executeCommandBarAction(action: CommandBarActions) {
    switch(action) {
      case CommandBarActions.Create: {
        this.router.navigate(["Admin", "form"]);
        return;
      }
      case CommandBarActions.DeleteAll: {
        this.store.dispatch({type: AdminActions.REMOVE_ALL_ANTI_HERO_API, payload: [...this.Admines.map(d => d.id)]})
        return;

      }
      default: ""

    }
  }

  protected readonly selectAntiHero = selectAdmin;
}
