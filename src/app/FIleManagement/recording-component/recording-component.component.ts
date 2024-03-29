import { Component, OnInit, NgModule, Input, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {TimerComponent} from '../timer/timer.component';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
declare var $: any;
declare var recorderObject: any;
declare var recordObjectMaiolix: any;
declare function startRecording(button): void;
declare function stopRecording(button): void;
declare function stopRecording2(callback): void;

declare function getRecorder(): any;
declare function uploadOnBucket(filename, directory, callback): any;
declare function attivaMic(): void;
declare function creaLink(callback): string;

@Component({
  selector: 'recording-component',
  templateUrl: './recording-component.component.html',
  styleUrls: ['./recording-component.component.scss'],

})


export class RecordingComponentComponent implements OnInit {

  @Output() funcAppo = new EventEmitter();
  @Output() refreshTable = new EventEmitter();
  breadcrum: string;
  dashboardIcon: string;
  audioIcon: string;
  isOn: boolean;
  isOff: boolean;
  nomeFile: string;
  appoBlob: any;
  directory: string;
  colorRec:string ="warn";
  isStopRecDisabled = true;
  isRecStartDisabled = false;
  isResultHidden = true;
  fileTmpUrl = 'http://emomaiolix.appspot.com/emotions/repository?file=cliente1.wav';
  rec: any;


  constructor() {}

  ngOnInit() {
    this.isRecStartDisabled = false;
    this.isStopRecDisabled = true;
    this.isResultHidden = true;
    recorderObject.recorder();
  }

  start(button): void {
    startRecording(button);
    this.isRecStartDisabled = true;
    this.isStopRecDisabled = false;
    this.isResultHidden = true;
    //this.funcAppo.emit();

  }

  stop(button): void {
    stopRecording2((result) => {
      result.exportWAV(function(blob) {
        // tslint:disable-next-line:prefer-const
        var url = URL.createObjectURL(blob);
        //alert(url);
        (<HTMLAudioElement>document.getElementById("audio")).src = url;
        //alert(url);
      });
      this.rec = result;
      this.isRecStartDisabled = true;
      this.isStopRecDisabled = true;
      this.isResultHidden = false;
    });
  }

  deleteRegistration(): void {
    this.isResultHidden = true;
    this.isStopRecDisabled = true;
    this.isRecStartDisabled = false;
    this.rec.clear();
  }

  pippo(): void {
    alert('salvataggio su Bucket eseguito');
      this.isResultHidden = true;
      this.isStopRecDisabled = true;
      this.isRecStartDisabled = false;
      this.refreshTable.emit();
  }

  upload(): void {

    uploadOnBucket(this.nomeFile, this.directory, () => {
      setTimeout(() => {
        this.refreshTable.emit();
        this.isResultHidden = true;
        this.isResultHidden = true;
        this.isStopRecDisabled = true;
        this.isRecStartDisabled = false;
        this.rec.clear();
        alert('salvataggio su Bucket eseguito');
      }, 1000);

    });
  }
  getBlob(callback): any {
    this.rec.exportWAV(function(blob) {
        callback(blob);
    });
  }

  immediateAnalysis(): void {
    //alert('quindi?');
    this.funcAppo.emit();
  }


}
