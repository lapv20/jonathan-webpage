import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { MainComponent } from './pages/main/main.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { InfoHeaderComponent } from './components/info-header/info-header.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ProductosComponent } from './pages/productos/productos.component';

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
    InfoHeaderComponent,
    UsuariosComponent,
    ClientesComponent,
    ProveedoresComponent,
    ProductosComponent,
  ],
})
export class AdministrationModule { }
