import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IProveedor } from '@interfaces/common.interface';
import { COLLECTIONS } from '@env/environment';
import { DatabaseService } from '@services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.scss']
})
export class NewProveedorComponent implements OnInit {

  isUpdate = false;

  newProveedorForm = new FormGroup({
    proveedor: new FormControl('', Validators.required),
    contacto: new FormControl('', Validators.required),
    telephone: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
    key: new FormControl(''),
  });

  title = 'Registro de Proveedor';
  btnString = 'Guardar proveedor';
  editProveedorKey = '';
  proveedorData: IProveedor = {} as IProveedor;

  constructor(
    private dbServ: DatabaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.editProveedorKey = params.get('key');
      console.log(this.editProveedorKey);
      if (this.editProveedorKey) {
        this.isUpdate = true;
        this.dbServ.getOneUserByKey(COLLECTIONS.proveedor, this.editProveedorKey).then(doc => {
          if (doc.exists) {
            this.proveedorData = doc.data() as IProveedor;
            this.newProveedorForm.patchValue(this.proveedorData);
          }
        });
      }
    });
    // update the string to reflect edition
    this.title = (this.editProveedorKey === null) ? 'Registro de Proveedores' : 'Editar Proveedor';
    this.btnString = (this.editProveedorKey === null) ? 'Guardar Proveedor' : 'Actualizar Proveedor';
  }

  saveForm() {
    let proveedor: IProveedor = null;

    if (this.newProveedorForm.valid) {
      proveedor = this.newProveedorForm.value as IProveedor;

      proveedor.key = this.isUpdate ? this.editProveedorKey : '';

      this.dbServ.saveOrUpdateOne(COLLECTIONS.proveedor, proveedor, this.isUpdate).then(val => {
        this.newProveedorForm.reset();
        this.router.navigate(['admin/proveedores']);
      }).catch(e => {
        console.error(e);
      });
    } else {
      console.log(this.newProveedorForm.value);
    }
  }

}
