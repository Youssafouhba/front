import { createAction, props } from '@ngrx/store';
import {Admin} from "../../models/admin/admin.model";
export enum AdminActions {
  GET_ANTI_HERO_LIST = '[Admin] Get Admin list',
  SET_ANTI_HERO_LIST = '[Admin] Set Admin list',
  ADD_ANTI_HERO_API = '[Admin] Add Admin (API',
  ADD_ANTI_HERO_STATE = '[Admin] Add Admin (STATE)',
  MODIFY_ANTI_HERO_API = '[Admin] Modify Admin (API)',
  MODIFY_ANTI_HERO_STATE = '[Admin] Modify Admin (STATE)',
  REMOVE_ANTI_HERO_API = '[Admin] Remove Admin (API)',
  REMOVE_ANTI_HERO_STATE = '[Admin] Remove Admin (STATE)',
  REMOVE_ALL_ANTI_HERO_API = '[Admin] Remove All Admin (API)',
  REMOVE_ALL_ANTI_HERO_STATE = '[Admin] Remove ALL Admin (STATE)',
}

export const getAdminList = createAction(
  AdminActions.GET_ANTI_HERO_LIST,
);

export const setAdminList = createAction(
AdminActions.SET_ANTI_HERO_LIST,
props<{ Admines: ReadonlyArray<Admin> }>(),
);


export const addAdminState = createAction(
  AdminActions.ADD_ANTI_HERO_STATE,
  props<{ Admin: Admin }>()
);

export const modifyAdminState = createAction(
    AdminActions.MODIFY_ANTI_HERO_STATE,
    props<{ Admin: Admin }>()
);

export const removeAdminState = createAction(
    AdminActions.REMOVE_ANTI_HERO_STATE,
  props<{ AdminId: string }>()
);

export const removeAllAdminState = createAction(
  AdminActions.REMOVE_ALL_ANTI_HERO_STATE
);
