import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss']
})
export class EditInputComponent implements OnInit {
  @Input() data: string;
  @Input() defaultText:string;
  @Output() focusOut: EventEmitter<string> = new EventEmitter<string>();
  @Input() fieldName:string;
  @Input() showEdit:boolean;
  currency = '$';
  editMode = false;
  txtValue:string = null;
  message : string;
  formInline: FormGroup;
  storeData:any;
  isSubmitted:boolean=true;
  showMsg:boolean=false;
  userRole: any;

  constructor() { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('user-role')
    if(this.data==null){this.data=''}
    this.storeData=this.data;
    localStorage.removeItem("edited_data");
    this.formInline = new FormGroup(
      {
        editInline: new FormControl(null, [
          Validators.required,
        ])
      }
    );

  }
  get forcedFormControl() {
    return this.formInline.controls;
  }
  onSubmit() {
    if (this.formInline.invalid) {
      this.forcedFormControl.editInline.markAsDirty();
      this.showMsg=true;
      return;
    }
    this.focusOut.emit(this.data);
    localStorage.setItem("edited_data",this.data);
    this.editMode=false;
    this.isSubmitted=false;
  }
  reset(){
    //this.formInline.reset();
    this.data= localStorage.getItem("edited_data");
    this.onSubmit();
    this.editMode=false;
    this.showMsg=false;
   //location.reload();
  }
  // onFocusOut() {
  //   console.log('call');
  //   if(this.data.length>0){
  //    this.focusOut.emit(this.data);
  //    this.editMode=false
  //   }else{
  //     this.editMode=true;
  //   }
  // }
  // onCancel()
  // {
  //   console.log("aaaaaaaaaaaaaaaaaaaaaaa");
  //  this.editMode = false
  // }
  setValue(){
    localStorage.setItem("edited_data",this.data);
  }
}
