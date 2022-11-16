import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Dropdown } from 'bootstrap';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss'],
})
export class SelectDropdownComponent implements OnInit, AfterViewInit {
  @ViewChild('select_dropdown', { static: false })
  selectDropdownEle?: ElementRef;
  selected: string;
  @Input('items') items: DropdownItem[];

  constructor() {
    this.selected = 'Select';
    this.items = [
      {
        name: 'Action 1',
        value: '1',
      },
      {
        name: 'Action 2',
        value: '2',
      },
      {
        name: 'Action 3',
        value: '3',
      },
    ];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.selectDropdownEle)
      this.selectDropdown = new Dropdown(this.selectDropdownEle.nativeElement);
  }

  selectDropdown?: Dropdown;
  toggleDropdown() {
    if (this.selectDropdown) this.selectDropdown?.toggle();
  }

  selectItem(item: string) {
    this.selected = item;
  }
}

interface DropdownItem {
  name: string;
  value: string;
}
