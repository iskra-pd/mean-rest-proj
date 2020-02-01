import { Component, OnInit } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

/**
* Login component
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	public username: string;
	public password: string;
	public error: string;
	
  constructor( private auth: AuthService, private router : Router) { }

  ngOnInit() {
	if(this.auth.loggedIn){
		this.router.navigate(['/users']);
	}
  }
  
/**
* Login form submit 
*/
 public  onSubmit(){
    this.auth.login(this.username, this.password)
	.pipe(first())
      .subscribe(
        result => this.router.navigate(['/users']),
        err => this.error = 'Could not authenticate'
      );
  }

}
