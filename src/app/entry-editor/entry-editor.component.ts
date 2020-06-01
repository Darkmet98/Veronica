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
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.idEntry = params["po"];
    });

    this.dataService.sendGetRequest("/api/entries/"+this.id+"/"+this.idEntry).subscribe((data: any[])=> {
      // @ts-ignore
      this.entry = data;
      this.entryCount = this.entry.Index
    });
  }
  id: string;
  idEntry: string;
  entryCount: number;
  entry: PoEntry;
  private sub: any;
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.pageEvent = new PageEvent();
  }

  public UpdateText(translated:string) {
    document.getElementById('charaCount').innerText = translated.length.toString();
  }

  public Return() {
    this.router.navigateByUrl('/projects/' + this.id);
  }

  public ChangeIndex(event?:PageEvent){
    this.entryCount = event.pageIndex;
    this.ChangeEntry();
    return event;
  }

  private ChangeEntry(){
    this.dataService.sendGetRequest("/api/entries/"+this.id+"/"+this.idEntry+"/"+ this.entryCount).subscribe((data: any[])=> {
      (<HTMLInputElement>document.getElementById('translatedText')).value = "";
      // @ts-ignore
      this.entry = data;
    });
  }

  public NextEntry(){
    this.entryCount++;
    this.pageEvent.pageIndex++;
    this.ChangeEntry();
  }

  public GoToEntry(position:string){
    const pos = Number(position) - 1;
    if(isNaN(pos))
      return;
    if(pos+1 <= this.entry.Size && pos >= 0){
      this.entryCount = pos;
      this.pageEvent.pageIndex = pos;
      this.ChangeEntry();
    }
  }

  public UpdateEntry(translated:string){

    const entry = {
      translation : translated,
      position : this.entryCount,
      id : this.idEntry
    }
    this.dataService.sendData("/api/entries/set", entry);
    this.NextEntry();
  }
}
