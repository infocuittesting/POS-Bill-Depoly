import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { AmChartsService } from "amcharts3-angular2";
import *as moment from 'moment';

@Component({
  selector: 'typography-cmp',
  moduleId: module.id,
  templateUrl: 'typography.component.html',
  providers: [CommonService,]
})

export class TypographyComponent implements OnInit {

  constructor(private commonservice: CommonService, private AmCharts: AmChartsService) { }

  public tablelist: any[];

  public todate = moment().format('YYYY-MM-DD');
  public startdate = moment().subtract('days', 7).format('YYYY-MM-DD');
  public checkboxvalue=3;
  ngOnInit() {
    this.getreport(this.startdate, this.todate, this.checkboxvalue);

  }

  public showhide:boolean=true;
  getreport(startdate, todate, checkboxvalue) {

    if(checkboxvalue=='1'||checkboxvalue=='2'){
      this.showhide=false;
    }else{
      this.showhide=true;
    }
    let body = {
      "from_date": startdate,
      "to_date": todate,
      "type": parseInt(checkboxvalue)
    }
    console.log(body)
    this.commonservice.Getchartreport(body)
      .subscribe((resp: any) => {
        var chartData1 = resp.Return;
        // chartData = resp.Return_Category;
        console.log("testt",chartData1)
        if (chartData1 == "Table") {
        var chartData=resp.Return_Table;
          var collectiveData = [];
          for (var x in chartData) {
            var dataPoint = chartData[x];
            if ('0' == x) {
              for (var y in dataPoint.category_reports) {
                collectiveData.push({
                  "Category_name": dataPoint.category_reports[y].Category_name,
                  "Count": dataPoint.category_reports[y].Count
                });
              }
            } 
            // else {
            //   for (var y in dataPoint.category_reports) {
            //     collectiveData[y].Count += dataPoint.category_reports[y].Count;
            //   }
            // }
          }
          // create pie chart
          var chart = this.AmCharts.makeChart("chartdiv1", {
            "type": "pie",
            "dataProvider": chartData,
            "valueField": "Count",
            "titleField": "table_no",
            "radius": "35%",
            "innerRadius": "50%",
            "marginTop":30,
            "depth3D": 15,
            "theme": "light",
            "labelText": "[[title]]: [[value]]",
            "pullOutOnlyOne": true,
          });

          // create column chart
          var chart2 = this.AmCharts.makeChart("chartdiv2", {
            "type": "serial",
            "theme": "light",
            "pathToImages": "/lib/3/images/",
            "autoMargins": false,
            "marginLeft": 70,
            "marginRight": 15,
            "marginTop": 40,
            "marginBottom": 100,
            "depth3D": 20,
            "angle": 30,
            "titles": [{
              "text": "Table 1"
            }],
            "dataProvider": collectiveData,
            "startDuration": 1,
            "graphs": [{
              "title": "Count",
              "type": "column",
              "fillAlphas": 0.8,
              "valueField": "Count"
            }],
            "categoryField": "Category_name",
            "categoryAxis": {
              "gridPosition": "start",
              "labelRotation": 25
            },
            "valueAxes": [{
              "integersOnly": true
            }]
          });

          chart.addListener("pullOutSlice", function (event) {
             //   for (var y in dataPoint.category_reports) {
            //     collectiveData[y].Count += dataPoint.category_reports[y].Count;
            //   }
            
            chart2.dataProvider = event.dataItem.dataContext.category_reports;
            chart2.titles[0].text = event.dataItem.dataContext.table_no;
            chart2.validateData();
            chart2.animateAgain();
          });

          chart.addListener("pullInSlice", function (event) {
            // chart2.dataProvider = collectiveData;
            // chart2.titles[0].text = "All Table";
            // chart2.validateData();
            // chart2.animateAgain();
          });

        }
/**********************IF completed ***************************************/
        else if(chartData1=="Category"){
          chartData=resp.Return_Category;
          var collectiveData = [];
          console.log("Chart Data",chartData);
          for (var x in chartData) {
            var dataPoint = chartData[x];
            if ('0' == x) {
              for (var y in dataPoint.food_items_reports) {
                collectiveData.push({
                  "food_name": dataPoint.food_items_reports[y].food_name,
                  "Count": dataPoint.food_items_reports[y].Count
                });
              }
            } 
            // else {
            //   for (var y in dataPoint.food_items_reports) {
            //     collectiveData[y].Count += dataPoint.food_items_reports[y].Count;
            //   }
            // }
            // console.log("Collective Data",collectiveData);
          }
          // create pie chart
          var chart = this.AmCharts.makeChart("chartdiv1", {
            "type": "pie",
            "dataProvider": chartData,
            "valueField": "Count",
            "titleField": "category",
            "radius": "29%",
            "innerRadius": "40%",
            "labelRadius":4,
            "marginTop":100,
            "depth3D": 15,
            "theme": "light",
            "labelText": "[[title]]: [[value]]",
            "pullOutOnlyOne": true,
          });

          // create column chart
          var chart2 = this.AmCharts.makeChart("chartdiv2", {
            "type": "serial",
            "theme": "light",
            "pathToImages": "/lib/3/images/",
            "autoMargins": false,
            "marginLeft": 100,
            "marginRight": 15,
            "marginTop": 20,
            "marginBottom": 110,
            "depth3D": 20,
            "angle": 30,
            "titles": [{
              "text": "Category 1"
            }],
            "dataProvider": collectiveData,
            "startDuration": 1,
            "graphs": [{
              "title": "Count",
              "type": "column",
              "fillAlphas": 0.8,
              "valueField": "Count"
            }],
            "categoryField": "food_name",
            "categoryAxis": {
              "gridPosition": "start",
              "autoGridCount": false,
              "labelRotation": 25,
              "gridCount": 12
            },
            "valueAxes": [{
              "integersOnly": true
            }]
          });

          chart.addListener("pullOutSlice", function (event) {
            chart2.dataProvider = event.dataItem.dataContext.food_items_reports;
            chart2.titles[0].text = event.dataItem.dataContext.category;
            chart2.validateData();
            chart2.animateAgain();
          });

          chart.addListener("pullInSlice", function (event) {
            // chart2.dataProvider = collectiveData;
            // chart2.titles[0].text = "All Table";
            // chart2.validateData();
            // chart2.animateAgain();
          });
        }
        
        else{
          var chart = this.AmCharts.makeChart( "chartdiv1", {
            "type": "serial",
            "theme": "light",
            "dataDateFormat": "YYYY-MM-DD",
            "graphs": [ {
              "id": "g1",
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletColor": "#FFFFFF",
              "bulletSize": 5,
              "hideBulletsCount": 50,
              "lineThickness": 2,
              "title": "red line",
              "useLineColorForBulletBorder": true,
              "valueField": "amount"
            } ],
            "chartScrollbar": {
              "graph": "g1",
              "oppositeAxis": false,
              "offset": 30,
              "scrollbarHeight": 80,
              "backgroundAlpha": 0,
              "selectedBackgroundAlpha": 0.1,
              "selectedBackgroundColor": "#888888",
              "graphFillAlpha": 0,
              "graphLineAlpha": 0.5,
              "selectedGraphFillAlpha": 0,
              "selectedGraphLineAlpha": 1,
              "autoGridCount": true,
              "color": "#AAAAAA"
            },
            "chartCursor": {
              "cursorAlpha": 1,
              "cursorColor": "#258cbb"
            },
            "categoryField": "date",
            "categoryAxis": {
              "parseDates": true,
              "equalSpacing": true,
              "gridPosition": "middle",
              "dashLength": 1,
              "minorGridEnabled": true
            },
            "zoomOutOnDataUpdate": false,
            "listeners": [ {
              "event": "init",
              "method": function( e ) {
          
                /**
                 * Pre-zoom
                 */
                e.chart.zoomToIndexes( e.chart.dataProvider.length - 40, e.chart.dataProvider.length - 1 );
          
                /**
                 * Add click event on the plot area
                 */
                e.chart.chartDiv.addEventListener( "click", function() { 
                  // we track cursor's last known position by "changed" event
                  if ( e.chart.lastCursorPosition !== undefined ) {
                    // get date of the last known cursor position
                    var date = e.chart.dataProvider[ e.chart.lastCursorPosition ][ e.chart.categoryField ];
          
                    // create a new guide or update position of the previous one
                    if ( e.chart.categoryAxis.guides.length === 0 ) {
                      var guide = new this.AmCharts.Guide();
                      guide.date = date;
                      guide.lineAlpha = 1;
                      guide.lineColor = "#c44";
                      e.chart.categoryAxis.addGuide( guide );
                    } else {
                      e.chart.categoryAxis.guides[ 0 ].date = date;
                    }
                    e.chart.validateData();
                  }
                } )
                //handle touch screens so that subsequent guides can
                //be added. Requires that the user taps the next
                //point twice. Needed in order to not break zoom/pan
                e.chart.chartDiv.addEventListener( "touchend", function() {
                  e.chart.tapped = false;
                });
              }
            }, {
              "event": "changed",
              "method": function( e ) {
                /**
                 * Log cursor's last known position
                 */
                e.chart.lastCursorPosition = e.index;
              }
            } ],
            "dataProvider": resp.dataProvider
          } );
        }



      });
  }
}
