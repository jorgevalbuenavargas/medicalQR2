import { Component } from '@angular/core';
import { ModalController, IonicPage, MenuController, NavController, NavParams } from 'ionic-angular';
import { DatabaseServiceProvider } from '../../providers/database-service/database-service';
import {ModalDoctorPage} from '../modal-doctor/modal-doctor';
import {ChangePasswordPage} from '../change-password/change-password';
import { GlobalDataProvider } from '../../providers/global-data/global-data';

/**
 * Generated class for the HomeAdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-admin',
  templateUrl: 'home-admin.html',
})
export class HomeAdminPage {
  
  role_id : any;
  doctors: any;

  constructor(public menuCtrl: MenuController, public modalCtrl: ModalController, public globalDataCtrl: GlobalDataProvider, public navCtrl: NavController, public navParams: NavParams, public firebase: DatabaseServiceProvider) {
    this.menuCtrl.enable(true, 'myMenu');
    this.role_id = this.globalDataCtrl.getUser_role_id();
  }

  openModal(user_id) {
    
    let modal = this.modalCtrl.create(ModalDoctorPage, user_id);
    modal.present();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomeMinistryPage');
    this.obtainPendingDoctors();
    this.menuCtrl.enable(true, 'myMenu');
  }

  obtainEnabledDoctors(){
    this.doctors = null;
    this.firebase.getEnabledDoctors().valueChanges().subscribe(
      doctors => {
        this.doctors = doctors;
        this.doctors = this.filterByRole(this.doctors) 
    })
  }

  obtainDisabledDoctors(){
    this.doctors = null;
    this.firebase.getDisabledDoctors().valueChanges().subscribe(
      doctors => {
        this.doctors = doctors;
        this.doctors = this.filterByRole(this.doctors)  
    })
  }

  obtainPendingDoctors(){
    this.doctors = null;
    this.firebase.getPendingDoctors().valueChanges().subscribe(
      doctors => {
        this.doctors = doctors; 
        this.doctors = this.filterByRole(this.doctors)    
    })
  }

  filterByRole(users){
    let tempUsers = []
    for (let i = 0; i < users.length; i++) {
      if(users[i].role_id != "4cfd1451-51dd-4f5a-94fb-aae3ef410ef9"){
        tempUsers.push(users[i])
      }
    }
    return tempUsers
  }

  showDoctors(selectedButton){
    if(selectedButton == "enabled"){
      this.obtainEnabledDoctors();
    }
    else if (selectedButton == "disabled"){
      this.obtainDisabledDoctors();
    }
    else {
      this.obtainPendingDoctors();
    }
  }

  enable(doctor){
    let old_state = doctor.user_state_id;
    doctor.user_state_id = "2103d550-17c2-4ff5-9b61-73e7f4ea6a7f";
    this.firebase.editDoctorState(doctor);
    if(old_state == "bfff8fef-7b54-42c1-bf7f-83232a08cf5c"){ //Pending state//
      this.obtainPendingDoctors();
    }else if(old_state == "2103d550-17c2-4ff5-9b61-73e7f4ea6a7f"){ //Enabled state//
      this.obtainEnabledDoctors();
    }else {
      this.obtainDisabledDoctors();
    } 
  }

  disable(doctor){
    let old_state = doctor.user_state_id;
    doctor.user_state_id = "5058ea0c-3e21-4698-bd91-5f9a891caceb"
    this.firebase.editDoctorState(doctor);
    if(old_state == "bfff8fef-7b54-42c1-bf7f-83232a08cf5c"){ //Pending state//
      this.obtainPendingDoctors();
    }else if(old_state == "2103d550-17c2-4ff5-9b61-73e7f4ea6a7f"){ //Enabled state//
      this.obtainEnabledDoctors();
    }else {
      this.obtainDisabledDoctors();
    } 
  }

}
