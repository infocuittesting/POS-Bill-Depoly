import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CommonService } from '../common.service';
import { SessionStorageService } from "ngx-webstorage";


@Component({
    selector: 'sign-in-cmp',
    moduleId: module.id,
    templateUrl: 'sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    providers:[CommonService]

})

export class SignInComponent implements OnInit{

  constructor(private router:Router, private signin:CommonService,public session: SessionStorageService) { }


  public book2=false;
  public book1=true;
  ngOnInit(){}

  btnClick(param,param1,param2){
    let body = {
      "branch_id":param,
      "screen":"BILLING",
      "login_status_id":1,
      "mobile":parseInt(param1) ,
      "password":param2
    }
    this.signin.login(body).subscribe((Response:any)=>{
      console.log("theeeee",Response)
      if(Response.ReturnCode=='LS'){
        this.session.store("branch_id",Response.branch_details[0].branch_id) 
        this.session.store("restaurant_name",Response.branch_details[0].restaurant_name) 
        this.session.store("logoimages",Response.branch_details[0].restaurant_logo)
        this.session.store("password",Response.branch_details[0].branch_password)
        this.session.store("mobile",parseInt(param1))
        this.session.store("address",Response.branch_details[0].address)
        this.router.navigate(['menus']);
      }
    });
  }
}