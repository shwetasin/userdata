import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static setItem(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  static getItem(arg0: string): string {
    throw new Error('Method not implemented.');
  }

  key="123";
  decrpyt: any;
  value: any;
  constructor() { }


  public saveData(key: string, value: string) {
    localStorage.setItem(key,JSON.stringify(value));
  }

  public getData(key: string) {
    let data=localStorage.getItem(key) || "";
    return data;
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public (key: string){
    localStorage['editItem'](key);
  }
  public clearData() {
    localStorage.clear();
  }
  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  public decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}


