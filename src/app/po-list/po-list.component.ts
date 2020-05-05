import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PoList} from '../interfaces/poList';

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.css'],
})

@Injectable()
export class PoListComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  id: string;
  poLists: PoList[];
  private sub: any;

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });

    switch (this.id) {
      case 'Persona_4':
        this.poLists = [
          {id: 1, name: 'P00-1', status: 'Incomplete', translated: 40},
          {id: 2, name: 'P00-2', status: 'Incomplete', translated: 70},
          {id: 3, name: 'P00-3', status: 'Complete', translated: 100},
          {id: 4, name: 'P00-4', status: 'Not started', translated: 0},
        ];
        break;
      case 'smt_nocturne':
        this.poLists = [
          {id: 1, name: 'NC-1', status: 'Incomplete', translated: 40},
          {id: 2, name: 'NC-2', status: 'Complete', translated: 100},
        ];
        break;
      default:
        this.poLists = [
          {id: 1, name: 'Generic', status: 'Incomplete', translated: 40},
        ];
        break;
    }
  }


  public GoTo(link) {
    this.router.navigateByUrl('/projects/' + this.id + '/' + link);
  }
}
