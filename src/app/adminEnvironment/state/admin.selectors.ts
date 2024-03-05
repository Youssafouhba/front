import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Admin } from '../../models/admin/admin.model';
import {AdminState} from './admin.reducers';


export const selectAdminState = createFeatureSelector<AdminState>('AdminState')

export const selectAdmins = () => createSelector(
    selectAdminState,
    (state: AdminState) => state.Admines
)
export const selectAdmin = (id: string) => createSelector(
    selectAdminState,
    (state: AdminState) => state.Admines.find(d => d.id === id)
)
