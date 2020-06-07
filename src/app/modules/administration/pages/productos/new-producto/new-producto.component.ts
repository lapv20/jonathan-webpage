import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProducto, IProveedor } from '@interfaces/common.interface';
import { DatabaseService } from '@services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { COLLECTIONS } from '@env/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.scss']
})
export class NewProductoComponent implements OnInit {

  isUpdate = false;

  newProductoForm = new FormGroup({
    proveedor: new FormControl('', Validators.required),
    producto: new FormControl('', [Validators.required]),
    precio: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    key: new FormControl(''),
  });

  title = 'Registro de Producto';
  btnString = 'Guardar producto';
  editProductoKey = '';
  productoData: IProducto = {} as IProducto;
  proveedoresList: Array<IProveedor> = [];

  constructor(
    private dbServ: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.editProductoKey = params.get('key');
      if (this.editProductoKey) {
        this.isUpdate = true;
        this.dbServ.getOneUserByKey(COLLECTIONS.productos, this.editProductoKey).then(doc => {
          if (doc.exists) {
            this.productoData = doc.data() as IProducto;
            this.newProductoForm.patchValue(this.productoData);
          }
        });
      }
    });
    // update the string to reflect edition
    this.title = (this.editProductoKey === null) ? 'Registro de Producto' : 'Editar Producto';
    this.btnString = (this.editProductoKey === null) ? 'Guardar Producto' : 'Actualizar Producto';

    this.dbServ.getAll(COLLECTIONS.proveedor).subscribe(resp => {
      console.log(resp);
      this.proveedoresList = resp;
    });
  }

  saveForm() {
    let producto: IProducto = null;

    if (this.newProductoForm.valid) {
      producto = this.newProductoForm.value as IProducto;

      producto.key = this.isUpdate ? this.editProductoKey : '';
      const index = _.findIndex(this.proveedoresList, (proveedor: any) => proveedor.key === producto.proveedor);
      if (index !== -1) {
        producto.proveedor_name = this.proveedoresList[index].proveedor;
      }

      this.dbServ.saveOrUpdateOne(COLLECTIONS.productos, producto, this.isUpdate).then(val => {
        this.newProductoForm.reset();
        this.router.navigate(['admin/productos']);
      }).catch(e => {
        console.error(e);
      });
    } else {
      console.log(this.newProductoForm.value);
    }
  }

}
