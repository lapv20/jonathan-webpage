import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUserInfo, UserTypes } from '@interfaces/common.interface';
import { DatabaseService } from '@services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { COLLECTIONS } from '@env/environment';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userTypes = UserTypes;
  isUpdate = false;

  newUserForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    user_type: new FormControl('', Validators.required),
    key: new FormControl(''),
  });

  title = 'Registro de Usuarios';
  btnString = 'Crear Usuario';
  editUserKey = '';
  userData: IUserInfo = {} as IUserInfo;

  constructor(
    private dbServ: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.editUserKey = params.get('key');
      console.log(this.editUserKey);
      if (this.editUserKey !== null) {
        this.isUpdate = true;
        this.dbServ.getOneUserByKey(COLLECTIONS.usuarios, this.editUserKey).then(doc => {
          if (doc.exists) {
            this.userData = doc.data() as IUserInfo;
            this.newUserForm.patchValue(this.userData);
          }
        });
      }
    });
    // update the string to reflect edition
    this.title = (this.editUserKey === null) ? 'Registro de Usuarios' : 'Editar Usuario';
    this.btnString = (this.editUserKey === null) ? 'Crear Usuario' : 'Actualizar Usuario';
  }

  saveForm() {
    let user: IUserInfo = null;

    if (this.newUserForm.valid) {
      user = this.newUserForm.value as IUserInfo;

      user.key = this.isUpdate ? this.editUserKey : '';

      this.dbServ.saveOrUpdateOne(COLLECTIONS.usuarios, user, this.isUpdate).then(val => {
        this.newUserForm.reset();
        // lista de usuarios
        this.router.navigate(['admin/usuarios']);
      }).catch(e => {
        console.error(e);
      });
    }
  }

}
