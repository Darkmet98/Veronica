import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProjectsComponent} from './projects/projects.component';
import {PoListComponent} from './po-list/po-list.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/:id', component: PoListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
