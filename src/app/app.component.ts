import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm!: FormGroup;
  forbiddenUsername = ['john', 'doe'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenName.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });   

    this.signupForm.valueChanges.subscribe(
      value => {
        console.log(value);
      }
    );

    this.signupForm.statusChanges.subscribe(
      status => {
        console.log(status);
      }
    );

    // this.signupForm.setValue({
    //   'userData':{
    //     'username': 'iip',
    //     'email': 'uipaddr@gmail.com'
    //   },
    //   'gender':'male',
    //   'hobbies': []
    // });

    // this.signupForm.patchValue({
    //   'userData':{
    //     'username': 'ipaddr',
    //   }
    // });

  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // async validator
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any>{
    const promies = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'johndoe@gmail.com'){
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promies;
  }

  // the validator function
  forbiddenName(control: FormControl): {[s:string]: boolean} {
    console.log('Hi');
    if(this.forbiddenUsername.indexOf(control.value) !== -1){
      console.log('invalid');
      return {'nameIsForbidden': true};
    }
    // if valid return null
    console.log('valid');
    return null;
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset({'gender':'male'});
  }

}
