import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LifecycleComponent } from '../lifecycle/lifecycle.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LifecycleComponent, ReactiveFormsModule,],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {
  title = 'Reactive form'
  myform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.pattern('[a-zA-Z]*')]),
    DOB: new FormControl(''),
    address: new FormArray([
      new FormControl('add1'),
      new FormControl('add2')
    ]),
  })

  getAddressFormArray() {
    return this.myform.get('address') as FormArray;

  }
  addForm() {
    this.getAddressFormArray().push(new FormControl('add'))
    this.myform.valueChanges.subscribe((res) => {
      console.log(res);
    })
  }
  removeForm(index: number) {
    this.getAddressFormArray().removeAt(index, {
      emitEvent: true
    })
  }
  submit() {
    if (this.myform.invalid) {
      window.alert('pls fill this form')
    };
    console.log(this.myform.valid);

    console.log(this.myform.value);

  }
}
