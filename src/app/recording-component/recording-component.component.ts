import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'recording-component',
  templateUrl: './recording-component.component.html',
  styleUrls: ['./recording-component.component.scss']
})
export class RecordingComponentComponent implements OnInit {

  URL = window.URL || (window as any).webkitURL;
  gumStream: any; // stream from getUserMedia()
  rec: any; 		 // Recorder.js object
  input: any;   // MediaStreamAudioSourceNode we'll be recording
  AudioContext =
  audioContext: any; // audio context to help us record
  audioSrc= '';
  isAudioHidden= true;


  constructor() {}

  ngOnInit() {}

  startRecording(): void {

    const constraints = { audio: true, video: false };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
        this.audioContext = new AudioContext();
        this.gumStream = stream;
        const input = this.audioContext.createMediaStreamSource(stream);
        this.rec = new Recorder(input,{numChannels:1});
        this.rec.record();
		    console.log("Recording started");
      })
      .catch(function(err) {alert(err);});
  }

  stopRecording(): void {
    this.rec.stop();
    this.gumStream.getAudioTracks()[0].stop();
    this.rec.exportWAV(this.createDownloadLink);
  }
  createDownloadLink(blob: any) {
    var url = URL.createObjectURL(blob);
    this.isAudioHidden=false;
    alert(url);


  }




}
