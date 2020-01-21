import { Component, OnInit } from '@angular/core';
import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

	
	User: any =[];
	
  constructor(private apiService: ApiService) {
	this.readUsers();
	  }

  ngOnInit() {
  }
  
  readUsers(){
    this.apiService.getUsers().subscribe((data) => {
     this.User = data;
    })    
  }

}
