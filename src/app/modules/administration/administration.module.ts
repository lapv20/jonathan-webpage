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
import { NewClientComponent } from './pages/clientes/new-client/new-client.component';
import { NewUserComponent } from './pages/usuarios/new-user/new-user.component';
import { NewProveedorComponent } from './pages/proveedores/new-proveedor/new-proveedor.component';
import { NewProductoComponent } from './pages/productos/new-producto/new-producto.component';
import { NewVentaComponent } from './pages/ventas/new-venta/new-venta.component';

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
    NewClientComponent,
    NewUserComponent,
    NewProveedorComponent,
    NewProductoComponent,
    NewVentaComponent,
  ],
})
export class AdministrationModule { }
