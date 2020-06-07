import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PoList} from '../interfaces/poList';
import {DataService} from "../data.service";

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.css'],
})

@Injectable()
export class PoListComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  id: string;
  projectName: string
  poLists: PoList[];
  private sub: any;

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });

    this.dataService.sendGetRequest("/api/entries/"+this.id).subscribe((data: any[])=> {
      this.poLists = data["Entries"];
      this.projectName = data["ProjectName"];
    });
  }


  public GoTo(link) {
    this.router.navigateByUrl('/projects/' + this.id + '/' + link);
  }
}
