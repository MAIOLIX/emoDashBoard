import { Component, OnInit,ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DashboardComponent} from '../layout/dashboard/dashboard.component';

export interface TextItem {
  content: string;
  execTime: number;
  magnitude: number;
  score: number;
}
export interface TextSentimentApi{
  items: TextItem[];
}


@Component({
  selector: 'text-analyze-component',
  templateUrl: './text-analyze-component.component.html',
  styleUrls: ['./text-analyze-component.component.scss']
})
export class TextAnalyzeComponentComponent implements OnInit {

  messaggio: string;

  constructor(private _httpClient: HttpClient) { }

  adaptUrl(myUrl:string):string{
    var result:string='gs';
    var re='gs://audio-bucket-emotions2/';
    var newString=myUrl.replace(re,':');
    result=result+newString;
    //alert(result);
    return result;

  }


  getTextSentiment(urlo: string): Observable<TextSentimentApi> {
    var url = this.adaptUrl(urlo);
    //alert(url);
    var endpoint = 'https://emomaiolix.appspot.com/emotions/sentiment/analyzeFromFileByUrl';
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post<TextSentimentApi>(endpoint, {
      "url": url

    }, httpOptions);

    return null;

  }
  execAnalysis(myUrl: string): void {
    this.getTextSentiment(myUrl).subscribe(result => {
      this.messaggio = JSON.stringify(result);
      
      //alert(JSON.stringify(result));
    });

  }

  ngOnInit() {


    this.messaggio = 'ECCOCI';
  }

}
