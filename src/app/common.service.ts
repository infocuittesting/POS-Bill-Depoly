import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  Gettable() {
    return this.http.get('https://table-ordering-system.herokuapp.com/Query_Table_Status')
      .map(this.extractData)
  }


  bill(param) {
    let body={
        "table_no":param.table_no
      }
      const headers = new Headers({ 'Content-Type': 'application/json' })
      const options = new RequestOptions({ headers: headers });
    return this.http.post('https://table-ordering-system.herokuapp.com/Get_Order_Item_Table',body,options)
      .map(this.extractData)
  }

  occupiedbill(param) {
    let body={
        "table_no":param.table_no
      }
      const headers = new Headers({ 'Content-Type': 'application/json' })
      const options = new RequestOptions({ headers: headers });
    return this.http.post('https://table-ordering-system.herokuapp.com/Query_today_food_order_table',body,options)
      .map(this.extractData)
  }

  billclose(param) {
      const headers = new Headers({ 'Content-Type': 'application/json' })
      const options = new RequestOptions({ headers: headers });
    return this.http.post('https://table-ordering-system.herokuapp.com/Update_Table_Available_Status',param,options)
      .map(this.extractData)
  }

  Getchartreport(param) {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
  return this.http.post('https://table-ordering-system.herokuapp.com/Report_Service',param,options)
    .map(this.extractData)
}

// Configurationn category componet service
Select_food(){

  return this.http.get("https://table-ordering-system.herokuapp.com/Add_Food_Menu_Items")
  .map(this.extractData)
}
Insert_food(insert){

  return this.http.post("https://table-ordering-system.herokuapp.com/Add_Food_Menu_Items",insert)
  .map(this.extractData)
}

Update_food(up){
    return this.http.post("https://table-ordering-system.herokuapp.com/Edit_Food_Menu_Items",up)
    .map(this.extractData)
}

Catagory(){
    let select={}
    return this.http.post("https://table-ordering-system.herokuapp.com/Select_Item_Category",select)
    .map(this.extractData)
}
Enable_Food(){
  let insert={}
  return this.http.get("https://table-ordering-system.herokuapp.com/Add_Food_Menu_Items",insert)
  .map(this.extractData)
}

Disable_Food(){
  let insert={}
  return this.http.get("https://table-ordering-system.herokuapp.com/Display_Disable_Food_Item",insert)
  .map(this.extractData)
}
Table_Status(){
  return this.http.get("https://table-ordering-system.herokuapp.com/Query_Table_Status")
  .map(this.extractData)
}
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  }