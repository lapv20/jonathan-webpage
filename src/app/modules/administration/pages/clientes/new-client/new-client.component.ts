import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IClienteInfo } from '@interfaces/common.interface';
import { DatabaseService } from '@services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { COLLECTIONS } from '@env/environment';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  isUpdate = false;

  newClienteForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    telephone: new FormControl('', [Validators.required]),
    nit: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    key: new FormControl(''),
  });

  title = 'Registro de Clientes';
  btnString = 'Guardar cliente';
  editclientKey = '';
  clienteData: IClienteInfo = {} as IClienteInfo;

  constructor(
    private dbServ: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.editclientKey = params.get('key');
      console.log(this.editclientKey);
      if (this.editclientKey) {
        this.isUpdate = true;
        this.dbServ.getOneUserByKey(COLLECTIONS.clientes, this.editclientKey).then(doc => {
          if (doc.exists) {
            this.clienteData = doc.data() as IClienteInfo;
            this.newClienteForm.patchValue(this.clienteData);
          }
        });
      }
    });
    // update the string to reflect edition
    this.title = (this.editclientKey === null) ? 'Registro de Clientes' : 'Editar Cliente';
    this.btnString = (this.editclientKey === null) ? 'Guardar Cliente' : 'Actualizar Cliente';
  }

  saveForm() {
    let cliente: IClienteInfo = null;

    if (this.newClienteForm.valid) {
      cliente = this.newClienteForm.value as IClienteInfo;

      cliente.key = this.isUpdate ? this.editclientKey : '';

      this.dbServ.saveOrUpdateOne(COLLECTIONS.clientes, cliente, this.isUpdate).then(val => {
        this.newClienteForm.reset();
        this.router.navigate(['admin/clientes']);
      }).catch(e => {
        console.error(e);
      });
    } else {
      console.log(this.newClienteForm.value);
    }
  }

}
