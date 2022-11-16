import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showStream() {
    if (document.getElementById("hyper").classList.contains("active")) {
      document.getElementById("hyper").classList.remove("active")
    } else {
      document.getElementById("hyper").classList.add("active")
    }
  } 
  selectedElement:string='';
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('selectedFilter')!=null){
      this.selectedElement=localStorage.getItem('selectedFilter');
    }
  }
  getSelected(event){
    //console.log(event);
    this.selectedElement=event;
    localStorage.setItem('selectedFilter',event);
  }
  refreshFilter(){
    localStorage.removeItem('selectedFilter');
    this.selectedElement='';
    this.showStream();
  }
}
