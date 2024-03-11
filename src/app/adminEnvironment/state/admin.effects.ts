import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, forkJoin } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AdminService } from '../services/admin.service';
import {AdminActions, removeAllAdminState} from './admin.actions';
import {Admin} from "../../models/admin/admin.model";


@Injectable()
export class AdminEffects {

  // get list of anti heroes in the external API
  // set retrieved anti hero list in the state
  getAdmines$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AdminActions.GET_ANTI_HERO_LIST),
        mergeMap(() => this.AdminService.getAdmines()
          .pipe(
            map(Admines => ({ type: AdminActions.SET_ANTI_HERO_LIST, Admines })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );

  // add anti-heroes in the database
  addAdmin$ = createEffect(() =>{
    return this.actions$.pipe(
        ofType(AdminActions.ADD_ANTI_HERO_API),
        mergeMap((data: {type: string, payload: Admin}) => this.AdminService.addAdmin(data.payload)
          .pipe(
            map(Admines => ({ type: AdminActions.ADD_ANTI_HERO_STATE, Admin: data.payload })),
            tap(() =>  this.router.navigate(["anti-heroes"])),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true})

   modifyAdmin$ = createEffect(() =>{
    return this.actions$.pipe(
        ofType(AdminActions.MODIFY_ANTI_HERO_API),
        mergeMap((data: {type: string, payload: Admin}) => this.AdminService.updateAdmin(data.payload.id, data.payload)
          .pipe(
            map(Admines => ({ type: AdminActions.MODIFY_ANTI_HERO_STATE, Admin: data.payload })),
            tap(() =>  this.router.navigate(["anti-heroes"])),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true})

  // remove anti-heroes in the database
  removeAdmin$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AdminActions.REMOVE_ANTI_HERO_API),
        mergeMap((data: { payload: string}) => this.AdminService.deleteAdmin(data.payload)
          .pipe(
            map(() => ({ type: AdminActions.REMOVE_ANTI_HERO_STATE, AdminId: data.payload })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );
  // remove all anti-heroes in the database
  removeAllAdmin$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AdminActions.REMOVE_ALL_ANTI_HERO_API),
        mergeMap((data: {type: string, payload: string[]}) =>
        forkJoin([...data.payload.map((id) => this.AdminService.deleteAdmin(id))])
          .pipe(
            map(() => ({ type: AdminActions.REMOVE_ALL_ANTI_HERO_STATE })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );

  constructor(
    private actions$: Actions,
    private AdminService: AdminService,
    private router: Router
  ) {}
}
