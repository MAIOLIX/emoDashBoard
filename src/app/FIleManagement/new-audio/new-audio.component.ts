import { Component, OnInit,ViewChild } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule, MatInputModule,MatDividerModule } from '@angular/material';
import {RecordingComponentComponent} from '../recording-component/recording-component.component';


@Component({
  selector: 'new-audio',
  templateUrl: './new-audio.component.html',
  styleUrls: ['./new-audio.component.scss']
})
export class NewAudioComponent implements OnInit {

  nomeFile: string;
  directory: string;
  elencoDirectory: string[] = ['emovo', 'custom', 'smartCenter'];
  isHiddenRecording = true;
  isHiddenUpload = true;
  isDisableReset=true;
  isDisableUpload=false;
  isDisableMic=false;
  @ViewChild(RecordingComponentComponent, { static: true })recording: RecordingComponentComponent;

  constructor() { }

  ngOnInit() {}

  mioClick(nomeFIle, directory): void {
    this.nomeFile = nomeFIle;
    this.directory = directory;
  }
  creaNomeFile(nomefile, emozione, sesso): string {
    return nomefile + '-' + emozione + '-' + sesso;
  }

  startRecording(nomefile, directory, emozione, sesso): void {
    const appo = this.creaNomeFile(nomefile, emozione, sesso);
    //alert(appo);
    this.isDisableUpload=true;
    this.isDisableReset=false;
    this.isHiddenRecording = false;
    this.recording.directory = directory;
    this.recording.nomeFile = appo;
    //this.recording.enableMic();
  }
  reset(): void{
    this.isDisableUpload=false;
    this.isDisableMic=false;
    this.isDisableReset=true;
    this.isHiddenRecording=true;

  }

}
