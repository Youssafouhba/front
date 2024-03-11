import { createReducer, on } from '@ngrx/store';

import { addAdminState, modifyAdminState, removeAllAdminState, removeAdminState, setAdminList } from './admin.actions';
import {AdminService} from "../services/admin.service";
import {Admin} from "../../models/admin/admin.model";

export interface AdminState {
  Admines: ReadonlyArray<Admin>;
}

export const initialState: AdminState = {
  Admines: []
}

export const AdminReducer = createReducer(
  initialState,
  on(setAdminList, (state, { Admines }) => { return {...state, Admines}}),
  on(removeAdminState, (state, { AdminId }) => {
    return {...state, Admines: state.Admines.filter(data => data.id != AdminId)}
  }),
  on(addAdminState, (state, {Admin}) => {
    return {...state, Admines: [...state.Admines, Admin]}
  }),
  on(modifyAdminState, (state, {Admin}) => {
    return {...state, Admines: state.Admines.map(data => data.id === Admin.id ? Admin : data)}
  }),
  on(removeAllAdminState, (state) => {
    return {...state, Admines: []}
  }),
  );
