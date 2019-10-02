import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {TimerComponent} from '../timer/timer.component';
declare var $:any;
declare var recorderObject: any;
declare var recordObjectMaiolix:any;
declare function startRecording(button) : void;
declare function stopRecording(button) : void;
declare function getRecorder(): any;
declare function uploadOnBucket(filename, directory): any;
declare function attivaMic():void;
@Component({
  selector: 'recording-component',
  templateUrl: './recording-component.component.html',
  styleUrls: ['./recording-component.component.scss'],

})


export class RecordingComponentComponent implements OnInit {
  breadcrum: string;
  dashboardIcon: string;
  audioIcon: string;
  isOn: boolean;
  isOff: boolean;
  nomeFile: string;
  directory: string;
  colorRec:string ="warn";
  isStopRecDisabled = true;
  isRecStartDisabled = false;
  isResultHidden = true;

  constructor() {}

  ngOnInit() {
    this.isOn = false;
  	this.isOff = true;
    recorderObject.recorder();

  }

  start(button): void {
    //attivaMic();
    //startRecording(button);
    this.isRecStartDisabled=true;
    this.isStopRecDisabled=false;
  }

  stop(button): void {
    //stopRecording(button);
    this.isRecStartDisabled=false;
    this.isStopRecDisabled=true;
    this.isResultHidden=false;
  }
  deleteRegistration(): void {
    this.isResultHidden=true;
    this.isStopRecDisabled=true;
    this.isRecStartDisabled=false;

  }



  upload(): void{
    uploadOnBucket("mimmo2","custom");

  }
  enableMic():void {
   attivaMic();

  }


}
