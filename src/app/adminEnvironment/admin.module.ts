import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntiHeroCommandBarComponent } from './components/admin-command-bar/anti-hero-command-bar.component';
import { AdminListComponent } from './components/admin-list/anti-hero-list.component';
import { AdminFormComponent } from './components/admin-form/anti-hero-form.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AdminReducer } from './state/admin.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './state/admin.effects';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminListComponent,
    AdminFormComponent,
    AntiHeroCommandBarComponent,
    ListComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forFeature('AdminState', AdminReducer),
    EffectsModule.forFeature([AdminEffects])
  ]
})
export class AdminModule { }
