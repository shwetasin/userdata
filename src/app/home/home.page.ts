import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators ,EmailValidator} from "@angular/forms";
import { AlertController } from '@ionic/angular';
import { ServiceNameService } from '../service-name.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userFrom: FormGroup;
  formSubmitted: boolean = false;
  userData: any[] = [];
  defaultDate :any;

  constructor(
    private alertController: AlertController,
    private service: ServiceNameService,
  ) {

    this.userFrom = new FormGroup({

     
      userName: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      phone: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      age: new FormControl("",),
      date: new FormControl ("",)
    });

  }
  
  onSubmit(value: any) {
    console.log("onSubmit:",value)
    var saved_data = JSON.parse(localStorage.getItem('userList') as string);
    console.log(saved_data)
    if (saved_data != null){
      let index = saved_data.findIndex((element: any) => element.email == value.email);
      console.log(index)
      if (index > -1) {
        this.service.presentAlert ("Email already registered.");
      } else {
        console.log("saved_data:", saved_data);
        saved_data = [...saved_data, ...[value]]
        localStorage.setItem('userList', JSON.stringify(saved_data));
        this.userFrom.reset();
        this.service.presentAlert("registered successfully.");      
      }
    } else{
      this.userData.push(value)
      localStorage.setItem('userList', JSON.stringify( this.userData))
      this.userFrom.reset();
      this.service.presentAlert("registered successfully.");
    }
    

  }

}



