import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { MainComponent } from './pages/main/main.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AdministrationRoutingModule,
  ],
  declarations: [
    AdministrationComponent,
    MainComponent,
    NavigationComponent,
    SideMenuComponent,
  ],
})
export class AdministrationModule { }
