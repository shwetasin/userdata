import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service'
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  userlist: any = [];
  userData: any = [];
  getdata: any;
  id: any;
  holder: any;

  formSubmitted: boolean = false;
  editUser: FormGroup;



  constructor(
    public localStorageService: LocalStorageService,
    private actRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router
  ) {



    this.editUser = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      userName: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      phone: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      age: new FormControl("",)
    });

    console.log(typeof (this.userData));

    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit() {
    this.userlist = JSON.parse(this.localStorageService.getData('userList'));
    this.holder = this.userlist[this.id];

    this.editUser.controls['userName'].setValue(this.holder.userName);
    this.editUser.controls['email'].setValue(this.holder.email);
    this.editUser.controls['phone'].setValue(this.holder.phone);
    this.editUser.controls['age'].setValue(this.holder.age);
  }

  onEdit(value: any) {
    if (value != null || value != undefined) {
      if ((this.userlist != null || this.userlist != undefined || this.userlist != '')) {
        this.userlist[this.id] = value;
        localStorage.setItem('userList', JSON.stringify(this.userlist));
        this.router.navigate(['view/'])
      }
    }
  }
}