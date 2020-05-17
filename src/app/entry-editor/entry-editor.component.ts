import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PoEntry} from "../interfaces/poEntry";
import {DataService} from "../data.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.css']
})
export class EntryEditorComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataService: DataService) {
  }
  id: string;
  idEntry: string;
  entry: PoEntry;
  private sub: any;
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.idEntry = params["po"];
    });

    this.dataService.sendGetRequest("/pofile/json/get/"+this.id+"/"+this.idEntry).subscribe((data: any[])=> {
      // @ts-ignore
      this.entry = data;
    });
    this.UpdateText();
  }

  public UpdateText() {
    document.getElementById('RenderizedText').innerText = (this.entry.Translated=="")?this.entry.Original:this.entry.Translated;
    document.getElementById('charaCount').innerText = this.entry.Translated.length.toString();
  }

  public Return() {
    this.router.navigateByUrl('/projects/' + this.id);
  }

  public ChangeEntry(event?:PageEvent){
    this.dataService.sendGetRequest("/pofile/json/get/"+this.id+"/"+this.idEntry+"/"+event.pageIndex).subscribe((data: any[])=> {
      // @ts-ignore
      this.entry = data;
    });
    this.UpdateText();
    return event;
  }
}
