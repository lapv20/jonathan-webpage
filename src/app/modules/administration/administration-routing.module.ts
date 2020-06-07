import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration.component';

// Pages
import { MainComponent } from './pages/main/main.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NewClientComponent } from './pages/clientes/new-client/new-client.component';
import { NewUserComponent } from './pages/usuarios/new-user/new-user.component';
import { NewProveedorComponent } from './pages/proveedores/new-proveedor/new-proveedor.component';
import { NewProductoComponent } from './pages/productos/new-producto/new-producto.component';
import { NewVentaComponent } from './pages/ventas/new-venta/new-venta.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdministrationComponent,
    children: [
      { path: '', component: MainComponent },

      { path: 'usuarios', component: UsuariosComponent },
      { path: 'nuevo-usuario', component: NewUserComponent },
      { path: 'editar-usuario/:key', component: NewUserComponent },

      { path: 'clientes', component: ClientesComponent },
      { path: 'nuevo-cliente', component: NewClientComponent },
      { path: 'editar-cliente/:key', component: NewClientComponent },

      { path: 'proveedores', component: ProveedoresComponent },
      { path: 'nuevo-proveedor', component: NewProveedorComponent },
      { path: 'editar-proveedor/:key', component: NewProveedorComponent },

      { path: 'productos', component: ProductosComponent },
      { path: 'nuevo-producto', component: NewProductoComponent },
      { path: 'editar-producto/:key', component: NewProductoComponent },

      { path: 'ventas', component: VentasComponent },
      { path: 'nueva-venta', component: NewVentaComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
