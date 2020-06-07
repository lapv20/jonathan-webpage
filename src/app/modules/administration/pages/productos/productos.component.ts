import { Component, OnInit } from '@angular/core';
import { IProducto } from '@interfaces/common.interface';
import { DatabaseService } from '@services/database/database.service';
import { COLLECTIONS } from '@env/environment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  allProductos: Array<IProducto> = [];

  constructor(
    private databaseServ: DatabaseService
  ) { }

  ngOnInit() {
    this.databaseServ.getAll(COLLECTIONS.productos).subscribe(resp => { this.allProductos = resp; console.log(resp); });
    console.log(this.allProductos);
  }

  deleteProducto(producto: IProducto) {
    this.databaseServ.deleteOne(COLLECTIONS.productos, producto.key).then(val => {
      if (val) {
        console.log('Se ha eliminado');
        window.alert(`Se ha eliminado a ${producto.producto} de la lista de productos`);
      } else {
        console.log('No se ha podido eliminar');
      }
    });
  }

}
