import { Component, OnInit } from '@angular/core';
import { ApiService } from './../service/api.service';

/**
* List of users from the database
*/
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

	
	Users: any =[];
	
  constructor(private apiService: ApiService) {
	this.readUsers();
	  }

  ngOnInit() {
  }
  
  /**
  * Read data from Users model
  */
  readUsers(){
    this.apiService.getUsers().subscribe((data) => {
		this.Users = data.users[0];
		
		 console.log('Res data:',this.Users);
    })    
  }

}
