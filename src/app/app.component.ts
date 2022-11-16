import { Component, OnInit,HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Redium';
   @HostListener('window:beforeunload', ['$event'])
   
  unloadHandler(event) {
    // event.preventDefault();
    // event.returnValue = 'Your data will be lost!';
    //localStorage.clear();
    // return false;
    
  }

  // public doBeforeUnload(): void {
  //   // Clear localStorage
  //   localStorage.clear();
  // }
    
    constructor(private router: Router){}
  ngOnInit() {

    window.addEventListener('storage', (event) => {
        if (event.storageArea == localStorage) {
             let token = localStorage.getItem('fullname');
             if(token == undefined) { 
               // Perform logout
               //Navigate to login/home
                this.router.navigate(['/login']); 
             }
        }
    });

}
}
