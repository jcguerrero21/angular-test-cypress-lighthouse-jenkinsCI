import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface Subject {
  name: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  matcher = new MyErrorStateMatcher();
  genders: string[] = ['Male', 'Female'];
  selected: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  myForm: FormGroup;
  @ViewChild('chipList', { static: true }) chipList;
  GradeArray: any = ['8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
  SubjectsArray: Subject[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  /* Reactive form */
   reactiveForm() {
     this.myForm = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [
          Validators.required,
          Validators.email,
        ]],
       gender: ['Male'],
       dob: ['', [Validators.required]],
       grade: [''],
  //     subjects: [this.SubjectsArray]
     });
   }

  /* Date */
  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob').setValue(convertDate, {
      onlyself: true
    });
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.SubjectsArray.length < 5) {
      this.SubjectsArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.SubjectsArray.indexOf(subject);
    if (index >= 0) {
      this.SubjectsArray.splice(index, 1);
    }
  }

  /* Handle form errors in Angular 8 */
   public errorHandling = (control: string, error: string) => {
     if (this.myForm && this.myForm.controls && this.myForm.controls[control]){
      return this.myForm.controls[control].hasError(error);
     }
   }

  submitForm() {
  }
}
