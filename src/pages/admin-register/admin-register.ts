import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { BrMaskerModule } from 'brmasker-ionic-3';
import {Md5} from 'ts-md5/dist/md5';
import { Guid } from "guid-typescript";
import { AlertController } from 'ionic-angular';
import { PasswordValidator } from  '../../validators/password';
import { HomeAdminPage } from '../home-admin/home-admin';

/**
 * Generated class for the AdminRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-register',
  templateUrl: 'admin-register.html',
})
export class AdminRegisterPage {

  newUser : any = {};
  allUsers : any = {};
  allRoles : any = [];
  allStates : any = [];
  errorMessage : any;
  passwordErrorMessage : any;
  cPasswordErrorMessage : any;

  constructor(public menuCtrl: MenuController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public firebase: DatabaseServiceProvider, private formBuilder: FormBuilder) {
    
    this.newUser = this.formBuilder.group({
      document: ['', Validators.compose([Validators.required, Validators.minLength(13)])],
      name : ['', Validators.required],
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*'), PasswordValidator.isValid])],
      cPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*'), PasswordValidator.isValid])],
      role_id: ['', Validators.required],
    })
    this.allUsers = {};
    this.obtainAllRoles();
    this.obtainAllUsers();   
    this.menuCtrl.enable(true, 'myMenu'); 
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'myMenu');
    this.obtainAllRoles();
    this.obtainAllUsers();
  }

  ionViewWillEnter(){
    this.obtainAllRoles();
    this.obtainAllUsers();
  }


  obtainAllUsers(){
    this.firebase.getAllUsers().valueChanges().subscribe(
      allUsers => {
        this.allUsers = allUsers;
      }
    )
  }

  obtainAllRoles(){
    this.firebase.getRoles().valueChanges().subscribe(
      roles => {
        this.allRoles = roles;
        let tempRoles = []
        for (let i = 0; i < this.allRoles.length; i++) {
          if(this.allRoles[i].roles_id == "35d0b156-e7be-4af1-a84d-3e9e30a2bd06" || this.allRoles[i].roles_id == "dd1bc611-ad23-4ec6-9cb2-a4081fab1039"){
            tempRoles.push(this.allRoles[i])
          }
        }
        this.allRoles = tempRoles 
      }
    )
  }

  obtainAllUsersStates(){
    this.firebase.getAllUsersStates().valueChanges().subscribe(
      usersStates => {
        this.allStates = usersStates;
      }
    )
  }

  registerForm(){
    this.errorMessage = null;
    this.newUser.value.document = this.newUser.value.document.replace('-', '');
    this.newUser.value.document = this.newUser.value.document.replace('-', '');
    this.findDuplicateDocument(this.newUser.value.document);
    let password = Md5.hashStr(this.newUser.value.password);
    let cPassword = Md5.hashStr(this.newUser.value.cPassword);
    if(this.errorMessage == null){
      this.comparePasswords(password, cPassword)
    }
    if(this.errorMessage == null){
      let createdUser = {
        document : this.newUser.value.document,
        license : "",
        name : this.newUser.value.name,
        email : this.newUser.value.email,
        password : cPassword,
        role_id : this.newUser.value.role_id,
        user_id : Guid.create().toString(),
        user_state_id : "2103d550-17c2-4ff5-9b61-73e7f4ea6a7f"
      }
      this.firebase.createUser(createdUser);
      this.showPrompt();
    }
  }

  findDuplicateDocument(document){
    this.errorMessage = null;
    for (let i = 0; i < this.allUsers.length; i++) {
      if(this.allUsers[i].document == document){
        this.errorMessage = "El usuario ya se encuentra registrado";
        break;
      }
    } 
  }

  comparePasswords(password, confirmPassword){
    this.errorMessage = null;
    if(password != confirmPassword){
      this.errorMessage = "Las contraseñas ingresadas no coinciden";
    }
  }

  showPrompt() {
    const alert = this.alertCtrl.create({
      title: '¡Éxito!',
      subTitle: "Usuario registrado con éxito",
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(HomeAdminPage);
  }

}
