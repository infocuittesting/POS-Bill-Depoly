import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  Gettable(body) {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    return this.http.post('https://tos-production.herokuapp.com/Query_Table_Status',body,options)
      .map(this.extractData)
  }


  bill(param) {
    let body={
        "table_no":param.table_no,
        "branch_id":"buhady145"
      }
      const headers = new Headers({ 'Content-Type': 'application/json' })
      const options = new RequestOptions({ headers: headers });
    return this.http.post('https://tos-production.herokuapp.com/Get_Order_Item_Table',body,options)
      .map(this.extractData)
  }

  occupiedbill(param) {
    let body={
        "table_no":param.table_no,
        "branch_id":"buhady145"
      }
      const headers = new Headers({ 'Content-Type': 'application/json' })
      const options = new RequestOptions({ headers: headers });
    return this.http.post('https://tos-production.herokuapp.com/Query_today_food_order_table',body,options)
      .map(this.extractData)
  }

  billclose(param) {
      const headers = new Headers({ 'Content-Type': 'application/json' })
      const options = new RequestOptions({ headers: headers });
    return this.http.post('https://tos-production.herokuapp.com/Update_Table_Available_Status',param,options)
      .map(this.extractData)
  }

  Table_Status(param){
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    return this.http.post("https://tos-production.herokuapp.com/Query_Table_Status",param,options)
    .map(this.extractData)
  }

  //Report 
  Getchartreport(param) {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
  return this.http.post('https://tos-production.herokuapp.com/Report_Service',param,options)
    .map(this.extractData)
}

// Configurationn category componet service
Select_food(select){   
  return this.http.post("https://tos-production.herokuapp.com/Query_Food_Menu_Based_On_Branch",select)
  .map(this.extractData)
}
Insert_food(insert){
  return this.http.post("https://tos-production.herokuapp.com/Add_Food_Menu_Items",insert)
  .map(this.extractData)
}

Update_food(up){
    return this.http.post("https://tos-production.herokuapp.com/Edit_Food_Menu_Items",up)
    .map(this.extractData)
}

Catagory(select){
    return this.http.post("https://tos-production.herokuapp.com/Select_Item_Category",select)
    .map(this.extractData)
}
//login component
login(insert){
  console.log(insert)
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  return this.http.post("https://tos-production.herokuapp.com/Billing_KOT_Login",insert,options)
  .map(this.extractData)
}

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  }