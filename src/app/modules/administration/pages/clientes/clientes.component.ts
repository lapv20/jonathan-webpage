import { Component, OnInit } from '@angular/core';
import { IClienteInfo } from '@interfaces/common.interface';
import { DatabaseService } from '@services/database/database.service';
import { COLLECTIONS } from '@env/environment';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  allClientes: Array<IClienteInfo> = [];

  constructor(
    private databaseServ: DatabaseService
  ) { }

  ngOnInit() {
    this.databaseServ.getAll(COLLECTIONS.clientes).subscribe(resp => { this.allClientes = resp; console.log(resp); });
    console.log(this.allClientes);
  }

  deleteCliente(cliente: IClienteInfo) {
    this.databaseServ.deleteOne(COLLECTIONS.clientes, cliente.key).then(val => {
      if (val) {
        console.log('Se ha eliminado');
        window.alert(`Se ha eliminado a ${cliente.first_name} de la lista de Clientes`);
      } else {
        console.log('No se ha podido eliminar');
      }
    });
  }

}
