import { Component, OnInit } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule, MatInputModule } from '@angular/material';



@Component({
  selector: 'new-audio',
  templateUrl: './new-audio.component.html',
  styleUrls: ['./new-audio.component.scss']
})
export class NewAudioComponent implements OnInit {

  nomeFile: string;
  directory: string;
  elencoDirectory: string[] = ['emovo', 'custom', 'smartCenter'];
  constructor() { }

  ngOnInit() {
  }
  mioClick(nomeFIle, directory): void {
    this.nomeFile = nomeFIle;
    this.directory = directory;
  }

}
