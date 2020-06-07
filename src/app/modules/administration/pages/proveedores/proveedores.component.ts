import { Component, OnInit } from '@angular/core';
import { IProveedor } from '@interfaces/common.interface';
import { DatabaseService } from '@services/database/database.service';
import { COLLECTIONS } from '@env/environment';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  allProveedor: Array<IProveedor> = [];

  constructor(
    private databaseServ: DatabaseService
  ) { }

  ngOnInit() {
    this.databaseServ.getAll(COLLECTIONS.proveedor).subscribe(resp => { this.allProveedor = resp; console.log(resp); });
    console.log(this.allProveedor);
  }

  deleteProveedor(cliente: IProveedor) {
    this.databaseServ.deleteOne(COLLECTIONS.proveedor, cliente.key).then(val => {
      if (val) {
        console.log('Se ha eliminado');
        window.alert(`Se ha eliminado a ${cliente.proveedor} de la lista de proveedores`);
      } else {
        console.log('No se ha podido eliminar');
      }
    });
  }

}
