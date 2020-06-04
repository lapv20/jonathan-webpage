import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration.component';

// Pages
import { MainComponent } from './pages/main/main.component';
import { VentasComponent } from './pages/ventas/ventas.component';

const adminRoutes: Routes = [

  {
    path: 'admin',
    component: AdministrationComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'ventas',
        component: VentasComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
