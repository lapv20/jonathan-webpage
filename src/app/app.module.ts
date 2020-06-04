import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

// Services
import { DatabaseService } from '@services/database/database.service';
import { UserService } from '@services/user/user.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VentasComponent } from './modules/administration/pages/ventas/ventas.component';
import { AdministrationModule } from '@admin-module/administration.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'babaria-webpage'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AdministrationModule,
  ],
  providers: [
    DatabaseService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
