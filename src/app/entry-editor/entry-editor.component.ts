import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-entry-editor',
  templateUrl: './entry-editor.component.html',
  styleUrls: ['./entry-editor.component.css']
})
export class EntryEditorComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }
  id: string;
  private sub: any;

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  public UpdateText(event) {
    const inputValue = event.target.value;
    document.getElementById('RenderizedText').innerText = inputValue;
    document.getElementById('charaCount').innerText = inputValue.length;
  }

  public Return() {
    this.router.navigateByUrl('/projects/' + this.id);
  }
}
