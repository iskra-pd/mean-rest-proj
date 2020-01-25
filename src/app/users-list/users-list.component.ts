import { Component, OnInit } from '@angular/core';
import { ApiService } from './../service/api.service';

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
  
  readUsers(){
    this.apiService.getUsers().subscribe((data) => {
		this.Users = data.users[0];
		
		 console.log('Res data:',this.Users[0])
    })    
  }

}
