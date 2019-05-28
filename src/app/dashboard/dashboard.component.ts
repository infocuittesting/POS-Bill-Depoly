import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from "ngx-webstorage";
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [CommonService]
})

export class DashboardComponent implements OnInit {

    constructor(private router: Router, private commonservice: CommonService, private toastr: ToastrService, public session: SessionStorageService) { }

    public business_id: any;

    showSuccess(message) {
        this.toastr.success(message);
    }
    public tablevalue: any[]; total: any;
    public order: any;
    public amount: any;
    public gstbill: any; sgstbill: any;
    public tablelist: any[];
    public billtable: any[];
    public showhide: boolean = true;
    public showhide1: boolean = false;
    public showhide2: boolean = false;
    public timeinterval: any;
    public pic :any;
    ngOnInit() {
        this.business_id = this.session.retrieve("branch_id");
        this.pic=this.session.retrieve("logoimages");
        let body = {
            "branch_id": this.business_id
        }
        this.commonservice.Gettable(body)
        .subscribe((resp1: any) => {
                this.tablelist = resp1.Returnvalue;
                console.log("testttttt", resp1)             
        });
        this.timeinterval = setInterval(() => {
            this.getcard();
        }, 5000);
    }

    getcard() {
        let body = {
            "branch_id": this.business_id
        }
                
        this.commonservice.Gettablestatus(body)
            .subscribe((resp: any) => {
                console.log("tablestatus", resp) 
             if(resp.Changes_Flage=="1"){                
                this.commonservice.Gettable(body)
                .subscribe((resp1: any) => {
                    if(resp1.ReturnCode=="RRS"){
                        this.tablelist = resp1.Returnvalue;
                        console.log("testttttt", resp1) 
                        this.commonservice.Gettableupdate(body)
                        .subscribe((resp2: any) => {
                        resp;                          
                        });
                    }
                });
             }   
            });
    }
    getbill(param) {
        this.showhide = false;
        this.showhide1 = true;
        this.showhide2 = false;
        this.commonservice.bill(param)
            .subscribe((resp: any) => {
                console.log("testtttttt bill", resp)
                this.tablevalue = resp.Returnvalue;
                this.billtable = resp.Returnvalue.items;
            });
    }

    public getoccvalue: any;
    public occupied: any;
    public getoccvaluetableno:any;
    getoccupied(param) {
        this.showhide = false;
        this.showhide1 = false;
        this.showhide2 = true;
        this.commonservice.occupiedbill(param)
            .subscribe((resp: any) => {
                console.log("testtttttt occbill", resp)
                this.getoccvalue = resp.Returnvalue;
                this.getoccvaluetableno=param.table_no;
            });
        this.occupied = setInterval(() => {
            this.getcard();
        }, 5000);
    }
    closeoccupied() {
        this.showhide = true;
        this.showSuccess("The Order Status is viewed")
        clearInterval(this.occupied);
    }

    printbill(cmpName){
        let printContents = document.getElementsByClassName(cmpName)[0].innerHTML;
        var printWin = window.open();
        printWin.document.write(printContents);
        printWin.document.close();
        printWin.focus();
        printWin.print();
        printWin.close();
    }
    closebill(param) { 
        let body = {
            "table_no": param.table_no,
            "order_no": param.order_no,
            "grand_total": param.grand_total,
            "CGST_Amount": param.CGST_Amount,
            "SGST_Amount": param.SGST_Amount,
            "total_items": param.total_items,
            "sub_total": param.sub_total,
            "total_amount_offers": param.total_amount_offers,
            "total_offers": param.total_offers,
            "branch_id": this.business_id
        }
        console.log("testinput", body)
        this.commonservice.billclose(body)
            .subscribe((resp: any) => {
                console.log("tesssss", resp)
                if (resp.ReturnCode == "RUS") {
                    this.showhide=true;
                    this.showSuccess("The Bill for Table Number " + param.table_no);
                    this.getcard();
                }
            });

    }

    ngOnDestroy() {
        clearInterval(this.timeinterval);
    }
}
