import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { HomeDoctorsPage } from '../pages/home-doctors/home-doctors';
import { HomePharmacyPage } from '../pages/home-pharmacy/home-pharmacy';
import { HomeMinistryPage } from '../pages/home-ministry/home-ministry';
import { NewQrPage } from '../pages/new-qr/new-qr';
import { ModalDoctorPage } from '../pages/modal-doctor/modal-doctor';
import { RegisterPage } from '../pages/register/register';
import { ModalQrPage } from '../pages/modal-qr/modal-qr';
import { ChangePasswordPage } from '../pages/change-password/change-password';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { DatabaseServiceProvider } from '../providers/database-service/database-service';
import { BrMaskerModule } from 'brmasker-ionic-3';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Guid } from "guid-typescript";
import { ModalPharmacyPage } from '../pages/modal-pharmacy/modal-pharmacy';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { GlobalDataProvider } from '../providers/global-data/global-data';
import { AdminRegisterPage } from '../pages/admin-register/admin-register';
import { HomeAdminPage } from '../pages/home-admin/home-admin';

//Obtener los datos de la base de firebase, nunca hacer commit con esa info
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "m",
  messagingSenderId: ""
};

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    HomeDoctorsPage,
    HomePharmacyPage,
    HomeMinistryPage,
    ModalDoctorPage,
    RegisterPage,
    NewQrPage,
    ModalDoctorPage,
    ModalQrPage,
    ModalPharmacyPage,
    ChangePasswordPage,
    UserProfilePage,
    AdminRegisterPage,
    HomeAdminPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config,'medicalqr'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrMaskerModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    LoginPage,
    HomeDoctorsPage,
    HomePharmacyPage,
    HomeMinistryPage,
    ModalDoctorPage,
    RegisterPage,
    NewQrPage,
    ModalDoctorPage,
    ModalQrPage,
    ModalPharmacyPage,
    ChangePasswordPage,
    UserProfilePage,
    AdminRegisterPage,
    HomeAdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseServiceProvider,
    BarcodeScanner,
    GlobalDataProvider
  ]
})
export class AppModule {}
