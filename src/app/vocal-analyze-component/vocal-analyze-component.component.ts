import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Sentiment{
  sentiment:string;
  valore: number;
}

export interface SentimentAPI{
    anger: number;
    fear: number;
    happiness: number;
    netrual: number;
    sadness: number;
}



@Component({
  selector: 'vocal-analyze-component',
  templateUrl: './vocal-analyze-component.component.html',
  styleUrls: ['./vocal-analyze-component.component.scss']
})




export class VocalAnalyzeComponentComponent implements OnInit {
  dataSource2 = new MatTableDataSource();
  displayedColumns = ['sentimento', 'valore'];

  constructor(private _httpClient: HttpClient) {}
  messaggio: string='Eccoci';
  hiddenLoading = true;
  hiddenPanel = true;
  FileChoosed = '';
  
  AngryEmotion ="" ;
  NeutralEmotion ="";
  HappyEmotion = "";
  SadEmotion = "";
  FearEmotion = "";


  getSentiment(file: string): Observable<SentimentAPI> {
    var url = this.adaptUrl(file);
    var endpoint = 'http://emomaiolix.appspot.com/emotions/audio/analyzeByUrl';
    var requestBody ={"url": url};
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //let options = new Request({ headers: headers });
    return this._httpClient.post<SentimentAPI>(endpoint, {
      "url": url

    }, httpOptions);


  }
  adaptUrl(myUrl:string): string {
    var result:string='gs';
    var re='gs://audio-bucket-emotions2/';
    var newString=myUrl.replace(re,':');
    result=result+newString;
    //alert(result);
    return result;

  }
  execAnalysis(url: string): void {
    //alert(url);
    this.getSentiment(url).subscribe(result=>{
      this.messaggio=JSON.stringify(result);
      




      this.AngryEmotion=(result.anger*100).toFixed(1)+"%";
      this.NeutralEmotion=(result.netrual*100).toFixed(1)+"%";
      this.SadEmotion=(result.sadness*100).toFixed(1)+"%";
      this.FearEmotion=(result.fear*100).toFixed(1)+"%";
      this.HappyEmotion=(result.happiness*100).toFixed(1)+"%";
      
      this.hiddenLoading = true;
      this.hiddenPanel = false;
      

    });

  }

  ngOnInit() {
      }

}
