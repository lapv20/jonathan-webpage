import { Component, OnInit } from '@angular/core';
import { IUserInfo, UserTypes } from '@interfaces/common.interface';
import { DatabaseService } from '@services/database/database.service';
import { COLLECTIONS } from '@env/environment';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  allUser: Array<IUserInfo> = [];
  userTypes = UserTypes;

  constructor(
    private databaseServ: DatabaseService
  ) { }

  ngOnInit() {
    this.databaseServ.getAll(COLLECTIONS.usuarios).subscribe(resp => { this.allUser = resp; console.log(resp); });
    console.log(this.allUser);
  }

  deleteUser(user: IUserInfo) {
    this.databaseServ.deleteOne(COLLECTIONS.usuarios, user.key).then(val => {
      if (val) {
        console.log('Se ha eliminado');
        window.alert(`Se ha eliminado a ${user.first_name} de la lista de Usuarios`);
      } else {
        console.log('No se ha podido eliminar');
      }
    });
  }

}
