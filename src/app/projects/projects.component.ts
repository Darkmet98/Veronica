import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  public GoTo(link) {
    this.router.navigateByUrl(link);
  }
}
