import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  candidateCount : any;
  leaderboard: any;
  allUsers: any;
  leaderboardcolumns:any;
  dataSource: any;
  displayedColumns: any;
  position = 1;
  
  activeCategory = 1;

  constructor(private _adminService : AdminService) { }

  ngOnInit(): void {
    this._adminService.getLeaderBoard().subscribe(res=>{
      this.candidateCount = res.length;
      this.leaderboard = res.map((value: any,ind: number) =>{
        return {
          position: ind+1,
          name: value.name,
          email: value.email,
          score: value.score
        }
      });
     
    });
    this._adminService.getUsers().subscribe(res=>{
      this.allUsers = res.map((value: any,ind: number) =>{
        return {
          position: ind+1,
          name: value.name,
          email: value.email,
          phone: value.phone
        }
      });
    });
   
  }

  changeActiveCategory(tab:number){
    this.activeCategory = tab;
  }
}


