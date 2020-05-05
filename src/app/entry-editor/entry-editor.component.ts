import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.css']
})
export class EntryEditorComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  public UpdateText(event) {
    const inputValue = event.target.value;
    document.getElementById('RenderizedText').innerText = inputValue;
  }
}
