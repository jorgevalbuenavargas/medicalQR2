import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalDataProvider {

  user_id : any;
  user_role_id : any;
  homePage : any;

  constructor() {
    this.user_id = "";
    this.user_role_id = "";
    this.homePage = {};
  }

  setUser_id(value) {
    this.user_id = value;
  }

  getUser_id() {
    return this.user_id;
  }

  setUser_role_id(value) {
    this.user_role_id = value;
  }

  getUser_role_id() {
    return this.user_role_id;
  }

  setHomePage(value) {
    this.homePage = value;
  }

  getHomePage() {
    return this.homePage;
  }

}
