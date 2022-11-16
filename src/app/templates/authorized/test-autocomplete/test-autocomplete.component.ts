import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { exit } from 'process';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { allUsers } from 'src/app/interfaces/signup.interface';
import { AuthHttpService } from 'src/app/service/auth-http.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { TokenFilterPipe } from 'src/app/pipes/token-filter.pipe';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './test-autocomplete.component.html',
  styleUrls: ['./test-autocomplete.component.scss'],
  providers: [TokenFilterPipe],
})
export class TestAutocompleteComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emailCtrl = new FormControl();
  filteredEmails: Observable<string[]>;
  emails: string[] = [];
  emailArr: string[] = [];
  nameArray:string[]=[];
  imgArr: string[] = [];
  arr = [];
  emailError: boolean = false;
  currentUserEmail: string = '';
  currentValue: string = '';
  showDrop: boolean = true;
  st: string = '';

  @Output() public hasError: EventEmitter<boolean> = new EventEmitter();
  @Output() public sameUser: EventEmitter<boolean> = new EventEmitter();
  @Output() public showButton: EventEmitter<boolean> = new EventEmitter();
  @Output() public inList: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('EmailInput') EmailInput: ElementRef<HTMLInputElement>;

  constructor(private authHttp: AuthHttpService,private emitter:EventEmitterService) {
    let data: any = {
      regionid: localStorage.getItem('regions_id'),
      is_full_tree_user_req: 'true',
    };
    this.authHttp.getAllUsers(data).subscribe(
      (response) => {
        localStorage.setItem('all_users', JSON.stringify(response.data));
      },
      (error) => {
        //this.isSubmitFormLoading = false;
      }
    );
    setTimeout(() => this.fetchData(), 1500);

    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      map((email: string | null) =>
        email ? this._filter(email) : this.emailArr.slice()
      )
    );
    this.showButton.emit(false);
    this.currentUserEmail = localStorage.getItem('user-email');
  }

  ngOnInit(): void {
    this.emitter.memberInvCloseEventEmitter.subscribe((_) => {
     this.emails=[];
     this.emailArr=[];
     this.hasError.emit(false);
     this.sameUser.emit(false);
      this.inList.emit(false);
    });
  }
  fetchData() {
    let users = JSON.parse(localStorage.getItem('all_users'));
    let x = [];
    let y = [];
       users.forEach(function (data) {
       x.push(data.fname.charAt(0).toUpperCase()+data.fname.slice(1)+" "+data.lname.charAt(0).toUpperCase()+data.lname.slice(1)+" : "+data.email);
       y[data.email]=data.userpicture;
     });
    this.emailArr =x;
    this.nameArray=y;
  }
 
  add(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
   
    let V:any =value.split(": ");
    //value = V[1].toString();
    
    if(V[1]){
      value = V[1].toString();
    }else{
      value = event.value
    }
    //this.emailArr=[];
    var re =
      /^(([^<>()[\]\\.,;=+_#*%^$!:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      String(event.value).toLowerCase() != '' &&
      re.test(String(event.value).toLowerCase()) === false
    ) {
      this.emailError = true;
      this.hasError.emit(true);
      this.showButton.emit(true);
      this.sameUser.emit(false);
      this.inList.emit(false);
      this.showDrop = false;
    } else {
      
      if (this.currentValue === this.currentUserEmail) {
        this.hasError.emit(false);
        this.showButton.emit(true);
        this.sameUser.emit(true);
      } else {
        this.emailError = false;
        this.hasError.emit(false);
        this.showButton.emit(false);
        
        if (value) {
          console.log(this.emails.indexOf(value));
          console.log(this.emails);
          console.log(this.currentValue);
          if (this.emails.indexOf(value) ==-1){
            console.log(value);
          this.emails.push(value.toLowerCase());
          }else{
            this.inList.emit(true);
          }
        }
        // Clear the input value
        event.chipInput!.clear();
        this.emailCtrl.setValue(null);
      }
      //console.log(")()()()()()",this.sameUser);
    }
    // Add our fruit
    //console.log('def');
    let emailText = this.emails.filter(Boolean).join(', ');
    localStorage.setItem('invited_emails', JSON.stringify(this.emails));

    var index = "Invite";
      for(var i = this.emailArr.length - 1; i >= 0; i--) {
          if(this.emailArr[i].indexOf(index) !== -1 ) {
            this.emailArr[i]='';
          }
      }
  }

  remove(fruit: string): void {
    const index = this.emails.indexOf(fruit);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }
    //console.log('abc');
    let emailText = this.emails.filter(Boolean).join(', ');

    if (fruit == this.currentUserEmail) {
      this.hasError.emit(false);
      this.sameUser.emit(true);
      this.showButton.emit(true);
    } else {
      if (this.emails.length > 0) {
        this.sameUser.emit(false);
        this.hasError.emit(false);
        this.showButton.emit(false);
      } else {
        this.inList.emit(false);
        this.sameUser.emit(false);
        this.hasError.emit(false);
        this.showButton.emit(true);
      }
    }

    localStorage.setItem('invited_emails', JSON.stringify(this.emails));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let V:any =event.option.viewValue.split(": ");
    if(V[1]){
      this.currentValue = V[1].toString();
    }else{
      this.currentValue = event.option.viewValue
    }
    
    let val = this.currentValue.split("'");
    if (val[1]) {
      this.currentValue = val[1];
    } else {
      this.currentValue =  V[1];
    }
    var re =
      /^(([^<>()[\]\\.,;=+_%^*$!:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      String(this.currentValue).toLowerCase() != '' &&
      re.test(String(this.currentValue).toLowerCase()) === false
    ) {
      // console.log('*******' + currentVal[1]);
      this.emails.splice(this.emails.indexOf(this.currentValue), -1);
      this.hasError.emit(true);
    } else {
     // this.emailArr=[];
      //console.log(this.currentValue);
      //console.log(">?>?>?"+this.emails.indexOf(this.currentValue));
      if (this.emails.indexOf(this.currentUserEmail) !== -1) {
        this.currentValue = this.currentUserEmail;
      } else {
        if (this.emails.indexOf(this.currentValue) == -1) {
          let st = event.option.viewValue.split("'");
          if (st[1]) {
            this.emails.push(st[1]);
          } else {
            this.emails.push(this.currentValue);
          }
          this.inList.emit(false);
        } else {
          this.inList.emit(true);
        }
        // this.emails.push(event.option.viewValue);
        this.EmailInput.nativeElement.value = '';
        this.emailCtrl.setValue(null);
        this.emailError = false;
      }

      if (this.currentValue == this.currentUserEmail) {
        this.hasError.emit(false);
        this.sameUser.emit(true);
        this.showButton.emit(true);
      } else {
        this.showButton.emit(false);
        this.hasError.emit(false);
        this.sameUser.emit(false);
      }
      let emailText = this.emails.filter(Boolean).join(', ');
      localStorage.setItem('invited_emails', JSON.stringify(this.emails));
    }

      var index = "Invite";
      for(var i = this.emailArr.length - 1; i >= 0; i--) {
          if(this.emailArr[i].indexOf(index) !== -1 ) {
            this.emailArr[i]='';
          }
      }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let filtered = this.emailArr.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue) 
    );
    console.log(this.nameArray);
    if (filtered.length <= 0) {
      let filterValue1 = "+ Invite :'" + filterValue + "' via email";
      this.emailArr.push(filterValue1);
    }
    return this.emailArr.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }

  handleEmptyInput(event: any) {
    if (event.target.value === '') {
      this.showButton.emit(true);
      this.hasError.emit(false);
    }
  }
}
