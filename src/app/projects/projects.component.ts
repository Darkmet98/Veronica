import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../interfaces/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})

export class ProjectsComponent implements OnInit {

  projects: Project[] = [
    {id: 'Persona_4', name: 'Persona 4', description: 'La tradu to flama de glow'},
    {id: 'smt_nocturne', name: 'Shin Megami Tensei: Nocturne', description: 'El siguiente proyecto de HyperTraducciones'},
    {id: 'FFF_ADV', name: 'Fairy Fencer F: Advent Dark Force', description: 'El otro proyecto de HyperTraducciones'},
    {id: 'Persona_1', name: 'Persona 1', description: 'El más aclamado proyecto de Amala liderado por Darko bueno'},
  ];

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  public GoTo(id) {
    this.router.navigateByUrl('/projects/' + id);
  }
}
