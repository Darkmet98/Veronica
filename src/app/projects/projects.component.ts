import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../interfaces/project';
import {DataService} from "../data.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent implements OnInit {
  projects: Project[];
  page : number = 0;
  size : number = 0;

  constructor(public router: Router, public dataService: DataService) { }

  ngOnInit(): void {
    const json = {
      "page" : 1,
      id: JSON.parse(localStorage.getItem("user")).Id
    };
    this.dataService.sendPostRequest("/api/projects", json).subscribe((data: any[])=> {
      this.projects = data["Projects"];
      this.size = data["NumberPages"];
    });
  }

  public GoTo(id) {
    this.router.navigateByUrl('/projects/' + id);
  }

  public getData(obj) {
    const json = {
      "page" : obj.pageIndex+1,
      id: JSON.parse(localStorage.getItem("user")).Id
    }
    this.dataService.sendPostRequest("/api/projects", json).subscribe((data: any[])=> {
      this.projects = data["Projects"];
    });
  }
}
