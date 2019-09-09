import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vocal-analyze-component',
  templateUrl: './vocal-analyze-component.component.html',
  styleUrls: ['./vocal-analyze-component.component.scss']
})
export class VocalAnalyzeComponentComponent implements OnInit {

  messaggio='Eccomi';
  eccoci(){
    alert(this.messaggio);
  }
  constructor() { }

  ngOnInit() {
  }

}
