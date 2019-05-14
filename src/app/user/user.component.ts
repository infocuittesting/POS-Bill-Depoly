import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ToastrService } from 'ngx-toastr'
import { SessionStorageService } from "ngx-webstorage";

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [CommonService]

})

export class UserComponent implements OnInit{
    constructor(private user: CommonService,private toastr: ToastrService,public session: SessionStorageService) { }
    public business_id:any;

    showSuccess(message) {
      this.toastr.success(message);
    }
    public selectfod: any = [];
    public reinitselectfod:any = [];
    public fdname: any;
    public fdid: any[];
    public fdcatagory: any;
    public itcatid: any;cate:any;
    public showhide: boolean = true;
  
    public getuser: any = [];
    public insert: any = [];
    public foodcat:any;
    public fdprice:any;
    
  
    public cat: any = [];
    public ftype: any = [];
  
    public insertitemimg: any;
    public image: any="";
    public insertfoodimg: any;
    public updateitemimg:any;
    public updatefoodimg:any;
    public img:any=[]
  
    public foodstatus: any = [
      {
        status_id: 1,
        status: "Active"
      },
      {
        status_id: 2,
        status: "InActive"
      }
    ]
  
    public foodtype: any = [
      {
        food_type_id: 1,
        food_type: "Veg"
      },
      {
        food_type_id: 2,
        food_type: "Non-Veg"
      }
  
    ]
  
    public special: any = [
      {
        today_special_id: 1,
        today_special_status: "YES",
  
      },
      {
        today_special_id: 2,
        today_special_status: "NO",
  
      }
    ]
    public specialss
    cehkfil(specials){
      if(specials== true){
        this.specialss="Yes"
      }else{
        this.specialss="";
      }
    }
    cehkfils(param){
      if(param === true){
        this.selectfod = this.selectfod.filter((items)=>{
            return items.offer_value != 0;
        })
      }
      else{
        this.selectfod = this.reinitselectfod;
      }
      console.log("filter",JSON.stringify(this.selectfod));
    }
    ngOnInit(){
      this.business_id=this.session.retrieve("branch_id");
        this.Select_food();
        this.Catagory();

    }
    testfun(){
      this.showhide=false;
    }
test(){
  this.showhide=true;
}

    Select_food() {
      let body={
        "branch_id":this.business_id
      }
        this.user.Select_food(body).subscribe((Response: any) => {
          console.log("select", Response)
          this.selectfod = Response.Returnvalue;
          this.open=[];this.close=[];
            for(var i=0;i<this.selectfod.length;i++){
             if(this.selectfod[i].food_status_id=="1"){
               this.open.push(this.selectfod[i])
               console.log(this.open)
             }
             else{
               this.close.push(this.selectfod[i])
             }
            }
          this.reinitselectfod = this.selectfod;
        });
    
      }
    
      public category_id:any="";
      public item:any="";
      public food:any="";
      public fdcat:any;fdcat1:any;
      public fdtype:any;
      public status:any;
      public tdyspecial:any;

      Insert_food(param1, param2, param3, param4, param5) {
    
        if (param3 != undefined) {
          this.category_id = param3
         
        }
        else if (param3 === undefined && param2 != undefined) {
          this.category_id = param2.toString();
        }else{
       this.showSuccess("somthing error");

        }
        if(param4===undefined){
          param4=""
        }
        if(param1.fdprice===undefined){
          param1.fdprice=""
        }

        if(this.insertitemimg===undefined){
          this.insertitemimg=""
        }
        if(this.insertfoodimg===undefined){
          this.insertfoodimg=""
        }
     
    
        
    
        let body = {
          "food_name": param1.fdname,
          "price": param1.fdprice,
          "item_category_id": this.category_id,
          "image_url": this.insertfoodimg,
          "food_status_id": 1,
          "food_description": "",
          "food_id_url":this.insertitemimg,
          "food_type_id": param4,
          "today_special_id": 2,
          "offer_value": 0,
          "branch_name":"adayar", 
	        "branch_id":this.business_id
        }
        console.log(JSON.stringify(body));
        this.user.Insert_food(body).subscribe((Response: any) => {
          console.log("resp", Response)
          if (Response.ReturnCode == "RIS") {
            this.showSuccess("The Iteam is Add successfully");
            this.Select_food();           
          }
        })
      }
    
      Catagory() {
        let body={
          "branch_id":this.business_id
        }
        this.user.Catagory(body).subscribe((Response: any) => {
          if (Response.ReturnCode == "RRS") {
            this.cat = Response.Returnvalue;
          }
        });
      }
    
    
      editfood(param) {
        console.log(param)
        this.fdcat=param.item_category_id;
        this.getuser.fname = param.food_name;
        this.getuser.offer=param.offer_value
        this.fdid = param.food_id;
        this.getuser.fdcatagory = param.food_type;
        this.getuser.fdprice=param.price;
        this.fdtype=param.food_type_id;
        this.status=param.food_status_id;
        this.tdyspecial=param.today_special_id;
        this.cate=param.category;
      }
    
      public itcatagoryid;
      public fdtypeid;
      addfood(param) {
        this.fdtypeid = param.food_type_id
      }
    
      public foodimage:any="";
      public catimg:any="";
      public offer:any;
      public price:any;




      Update_food(param1, param2, param3, param4, param5, param6,param7) {
        if(this.updateitemimg===undefined)
        {
          this.updateitemimg="";
        }
       
        
        if(this.updatefoodimg===undefined ||this.updatefoodimg===null){
          this.updatefoodimg="";
        }
        if(param1.fdprice===undefined){
          param1.fdprice=""
        }
         if(param1.offer===undefined || param1.offer==""){
           param1.offer=0
         }
        if(param3===undefined){
          param3="";
        }
        if(param4===undefined){
          param4=""
        }
        if(param5===undefined){
          param5=""
        }
        if(param6===undefined){
          param6=""
        }

        

    
        let body={
          "food_name":param1.fname,
          "price":param1.fdprice,
          "food_id":param2,
          "item_category_id":this.fdcat,
          "image_url":this.updateitemimg, 
          "food_status_id":param5, 
          "food_description":"",
          "food_id_url":this.updatefoodimg,
          "food_type_id":param4,
          "today_special_id":param6,
          "offer_value":param1.offer,
          "branch_name":"adayar",
          "category":param3
        }
        console.log("gf", body)
        this.user.Update_food(body).subscribe((Response: any) => {
          if (Response.ReturnCode == "RUS") {
            this.showSuccess("The Iteam and Category is Updated successfully")
            this.Select_food();
          }
        });
      }

public open:any=[];
public close:any=[];
public enable:any=[];


      togglebutton(param){

 if(param.food_status_id==1){
   let body={
     "food_name":param.food_name,
     "price":param.price,
     "food_id":param.food_id,
     "item_category_id":param.item_category_id,
     "image_url":"",
     "food_status_id":2,
     "food_description":"",
     "food_id_url":"",
     "food_type_id":param.food_type_id,
     "branch_name":"adayar",
     "offer_value":param.offer_value,
     "category":param.category
   }
   this.user.Update_food(body).subscribe((Response:any)=>{
     if(Response.ReturnCode=="RUS"){
       this.showSuccess("The Food Iteam Was Disabled");
 }
 
 });

 }else{
   let body={
     "food_name":param.food_name,
     "price":param.price,
     "food_id":param.food_id,
     "item_category_id":param.item_category_id,
     "image_url":"",
     "food_status_id":1,
     "food_description":"",
     "food_id_url":"",
     "food_type_id":param.food_type_id,
     "branch_name":"adayar",
     "offer_value":param.offer_value,
     "category":param.category
   }
   this.user.Update_food(body).subscribe((Response:any)=>{
     if(Response.ReturnCode=="RUS"){
      this.showSuccess("The Food Iteam Was Enabled");
 }
 });

 }
 this.Select_food();
}
    
    
    
changeListener($event): void {
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file: File = inputValue.files[0];
  var myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.insertitemimg = this.image.split(",", 2)[1]
    console.log(this.insertitemimg)
  }
  myReader.readAsDataURL(file);
}


ActiveListener($event): void {
  this.readThat($event.target);
}

readThat(inputValue: any): void {
  var file: File = inputValue.files[0];
  var myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.insertfoodimg = this.image.split(",", 2)[1]

  }
  myReader.readAsDataURL(file);
}


UnchangeListener($event): void {
  this.read($event.target);
}

read(inputValue: any): void {
  var file: File = inputValue.files[0];
  var myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.updatefoodimg = this.image.split(",", 2)[1]
    console.log(this.updatefoodimg)
  }
  myReader.readAsDataURL(file);
}

InActiveListener($event): void {
  this.readTat($event.target);
}

readTat(inputValue: any): void {
  var file: File = inputValue.files[0];
  var myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.updateitemimg = this.image.split(",", 2)[1]
    console.log(this.updateitemimg)
  }
  myReader.readAsDataURL(file);
}
}
