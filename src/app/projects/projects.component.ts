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


  constructor(public router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    const json = {
      id: JSON.parse(localStorage.getItem("user")).Id
    };
    this.dataService.sendPostRequest("/api/projects", json).subscribe((data: any[])=> {
      this.projects = data;
    });
  }

  public GoTo(id) {
    this.router.navigateByUrl('/projects/' + id);
  }
}
