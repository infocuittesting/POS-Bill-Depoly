import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CommonService } from '../../common.service';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
  providers: [CommonService,]

})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    @ViewChild("navbar-cmp") button;

    constructor(private commonservice: CommonService,location:Location, private renderer : Renderer, private element : ElementRef, private router: Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    public timeinterval:any;
public ac:any;uc :any;pc:any;
    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       })
       this.Table_Status();
       this.timeinterval=setInterval(() => {
        this.Table_Status(); 
      }, 2000); 
      }
     
      Table_Status(){
        this.commonservice.Table_Status().subscribe((Response:any)=>{
            this.ac=Response.Available_count;
            this.uc=Response.unavailable_count;
            this.pc=Response.payment_count;
        });
    }
    getTitle(){
        var titlee = window.location.pathname;
        titlee = titlee.substring(1);
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    sidebarToggle() {
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const body = document.getElementsByTagName('body')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          body.classList.add('nav-open');

          this.sidebarVisible = true;
      };
      sidebarClose() {
          const body = document.getElementsByTagName('body')[0];
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          body.classList.remove('nav-open');
      };
}
