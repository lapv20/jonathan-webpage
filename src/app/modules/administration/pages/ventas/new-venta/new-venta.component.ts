import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { DatabaseService } from '@services/database/database.service';
import { COLLECTIONS } from '@env/environment';
import { IProducto, IClienteInfo, IVenta, IUserInfo } from '@interfaces/common.interface';
import { Router } from '@angular/router';

interface IFilterProducto {
  key: string;
  descripcion: string; // producto
  existencia: number; // cantidad actual de producto
  cantidad: number; // cantidad en la venta
  precio: number;
}

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.component.html',
  styleUrls: ['./new-venta.component.scss']
})
export class NewVentaComponent implements OnInit {

  title = 'Nueva Venta';
  ivaValue = Number('19');

  clientList: Array<IClienteInfo> = [];
  productList: Array<IProducto> = [];
  items: Array<IFilterProducto> = [];
  totalItems = 0;
  totalItemsIva = 0;

  productoToAdd = {
    key: 'vy7XkIrPO06gR7KsZUUk', // null,
    descripcion: '-',
    existencia: 0,
    cantidad: 0,
    precio: 0,
  } as IFilterProducto;

  ventaForm = new FormGroup({
    nit: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
  });

  constructor(
    private dbService: DatabaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dbService.getAll(COLLECTIONS.productos).subscribe(resp => { this.productList = resp; });
    this.dbService.getAll(COLLECTIONS.clientes).subscribe(resp => { this.clientList = resp; });
  }

  resetCurrentProduct() {
    this.productoToAdd.key = null;
    this.productoToAdd.descripcion = '-';
    this.productoToAdd.existencia = 0;
    this.productoToAdd.cantidad = 0;
    this.productoToAdd.precio = 0;
  }

  addProductToList() {
    if (!this.productoToAdd.key) {
      window.alert('Debes elegir un producto');
    }
    if (this.productoToAdd.cantidad === 0) {
      window.alert('La cantidad debe ser mayor a cero');
    }

    console.log(this.productoToAdd);

    if (this.productoToAdd.existencia === 0) {
      window.alert('No hay suficiente producto para agregar');
    } else {

      this.items.push({ ...this.productoToAdd });
      this.updateItemTotal();

      const index = _.findIndex(this.productList, (prod: any) => prod.key === this.productoToAdd.key);
      this.productList[index].cantidad = this.productoToAdd.existencia - this.productoToAdd.cantidad;

      this.resetCurrentProduct();
    }
  }

  triggerFilter(e) {
    const key = e.target.value;
    const index = _.findIndex(this.productList, (prod: any) => prod.key === key);
    const result = Object.assign({}, this.productList[index]);

    if (index !== -1) {
      this.productoToAdd.descripcion = result.producto;
      this.productoToAdd.precio = result.precio;
      this.productoToAdd.key = result.key;

      this.productoToAdd.existencia = result.cantidad > 0 ? result.cantidad : 0;
    } else {
      this.productoToAdd.key = null;
    }
  }

  removeItem(position: number) {
    console.log(position);

    const deletedItem = this.items.splice(position, 1)[0];
    console.log('Deleted Item was: ', deletedItem);

    const index = _.findIndex(this.productList, (prod: any) => prod.key === deletedItem.key);
    const newExistencia = this.productList[index].cantidad + deletedItem.cantidad;
    this.productList[index].cantidad = newExistencia;

    this.updateItemTotal();

    if (this.productoToAdd.key === deletedItem.key) {
      this.productoToAdd.existencia = newExistencia;
    }
  }

  updateItemTotal() {
    this.totalItems = this.items.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0);
    this.totalItemsIva = (this.totalItems * this.ivaValue) / 100;
  }

  anularVenta() {
    while (this.items.length > 0) {
      this.removeItem(0);
    }
    this.resetCurrentProduct();
  }

  procesarVenta() {
    if (!this.ventaForm.valid) {
      window.alert('Los datos del cliente no están completos o son los valores adecuados');
    }
    if (this.items.length === 0) {
      window.alert('No puede realizar esta venta sin productos');
    }
    if (this.ventaForm.valid && this.items.length > 0) {

      const ventaData: IVenta = {} as IVenta;
      const clientInfo = this.ventaForm.value as IClienteInfo;

      console.log(clientInfo);
      console.log(this.clientList);
      const index = _.findIndex(this.clientList, (client: any) => client.nit === clientInfo.nit);
      console.log(index);
      if (index === -1) {
        // es nuevo cliente
        this.dbService.saveOrUpdateOne(COLLECTIONS.clientes, clientInfo, false).then((resp) => {
          ventaData.cliente = Object.assign({}, clientInfo);
          ventaData.cliente.key = resp;
        });
      } else {
        // el cliente existe
        ventaData.cliente = Object.assign({}, this.clientList[index]);
      }

      // match the client using their NIT
      ventaData.items = this.items as unknown as Array<IProducto>;
      ventaData.subtotal = this.totalItems;
      ventaData.iva = this.totalItemsIva;
      ventaData.total = this.totalItems + this.totalItemsIva;

      ventaData.vendedor = { first_name: 'Florence Welch', mail: 'florence.w@outlook.com' };

      this.dbService.saveOrUpdateOne(COLLECTIONS.ventas, ventaData, false).then(() => {
        this.dbService.transactionVenta(this.items).then((resp) => {
          console.log('Response: ', resp);
          window.alert('La venta fue almacenada con exito!');
          this.router.navigate(['admin/ventas']);
        });
      });
    }
  }

}
