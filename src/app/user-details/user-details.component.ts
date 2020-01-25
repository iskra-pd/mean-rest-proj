import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from './../model/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
	userData: User[];
	userForm: FormGroup;
	
  constructor(
	public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {this.mainForm();}

  ngOnInit() {
	let username = this.actRoute.snapshot.paramMap.get('username');
    this.getUser(username);
	this.userForm.disable();
  }
  
  mainForm() {
    this.userForm = this.fb.group({
      name: ['', []],
      email: ['', []],
      username: ['', []],
    })
  }
  
   // Getter to access form control
  get myForm(){
    return this.userForm.controls;
  }
  
   getUser(username) {
    this.apiService.getUser(username).subscribe(data => {
      this.userForm.setValue({
        name: data['name'],
        email: data['email'],
        username: data['username']
      });
    });
  }

}
