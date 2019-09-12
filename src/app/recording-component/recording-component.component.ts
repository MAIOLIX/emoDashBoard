import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
declare function prova(): void;
declare var recorderObject: any;
declare function startRecording(button): void;
declare function stopRecording(button): void;
declare function uploadOnBucket(filename, directory): void;
declare function getRecorder();
@Component({
  selector: 'recording-component',
  templateUrl: './recording-component.component.html',
  styleUrls: ['./recording-component.component.scss']
})
export class RecordingComponentComponent implements OnInit {

  constructor() {}
  isOn: boolean;
  isOff: boolean;
  mioInput: string;
  miaDirectory: string;
  cartelle = ['emovo' , 'smartCenter', 'custom'];



  ngOnInit() {
    recorderObject.recorder();
    this.isOn = false;
    this.isOff = true;


  }
  public start(button){
    startRecording(button);
  	this.isOn = true;
    this.isOff = false;
  };

  public stop(button){
  	stopRecording(button);
  	this.isOn = false;
    this.isOff = true;
  }
  settaValore(valore){
    this.mioInput = valore;

  }
  scegliCartella(valore){

    this.miaDirectory = valore;
    //alert(this.miaDirectory);
  }
  public uploadBucket(){
   uploadOnBucket(this.mioInput,this.miaDirectory);

  }


}
