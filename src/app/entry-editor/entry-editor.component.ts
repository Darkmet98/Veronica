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
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public dataService: DataService) {

    //Get the current id and EntryId
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      this.idEntry = params["po"];
    });

    //Send a request and get the entry data
    this.dataService.sendGetRequest("/api/entries/"+this.id+"/"+this.idEntry).subscribe((data: any[])=> {
      // @ts-ignore
      this.entry = data;
      this.entryCount = this.entry.Index
      this.entryLength = this.entry.Size;
    });
  }

  id: string;
  idEntry: string;
  entryCount: number;
  entry: PoEntry;
  entryLength :number;
  private sub: any;
  pageEvent: PageEvent;

  //Create new PageEvent
  ngOnInit(): void {
    this.pageEvent = new PageEvent();
  }

  //Update realtime the visualizator and the chara count
  public UpdateText(translated:string) {
    document.getElementById('charaCount').innerText = translated.length.toString();
    document.getElementById('RenderizedText').innerText = translated;
  }

  //Return to the project list
  public Return() {
    this.router.navigateByUrl('/projects/' + this.id);
  }

  //Change the current entru from the PageEvent
  public ChangeIndex(event?:PageEvent){
    this.entryCount = event.pageIndex;
    this.ChangeEntry();
    return event;
  }

  //Change the entry and obtain the new data
  private ChangeEntry(){
    this.dataService.sendGetRequest("/api/entries/"+this.id+"/"+this.idEntry+"/"+ this.entryCount).subscribe((data: any)=> {
      (<HTMLInputElement>document.getElementById('translatedText')).value = "";
      this.entry = data;
      document.getElementById('charaCount').innerText = this.entry.CurrentEntry.Translated.length.toString();
      document.getElementById('RenderizedText').innerText = this.entry.CurrentEntry.Translated == "" ? this.entry.CurrentEntry.Original : this.entry.CurrentEntry.Translated;
    });
  }

  //Change the next entry from the keyboard shortcut
  public NextEntry(){
    if(this.pageEvent.pageIndex != this.entryLength){
      this.entryCount++;
      this.pageEvent.pageIndex++;
      this.ChangeEntry();
    }

  }
  //Change the previous entry from the keyboard shortcut
  public PreviousEntry(){
    if(this.entryCount != 0){
      this.entryCount--;
      this.pageEvent.pageIndex--;
      this.ChangeEntry();
    }
  }

  //Go to the specific entry from the input
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

  //Update the current entry
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
