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
  loadDivVisible = false;
  divDataHidden = true;
  FileChoosed = '';
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    
  }
  constructor(private _httpClient: HttpClient) { }

  adaptUrl(myUrl:string):string{
    var result:string='gs';
    var re='gs://audio-bucket-emotions2/';
    var newString=myUrl.replace(re,':');
    result = result + newString;
    return result;

  }


  getTextSentiment(urlo: string): Observable<TextSentimentApi> {
    var url = this.adaptUrl(urlo);
    //alert(url);
    const endpoint = 'https://emomaiolix.appspot.com/emotions/sentiment/analyzeFromFileByUrl';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post<TextSentimentApi>(endpoint, {
      "url": url

    }, httpOptions);

  }
  execAnalysis(myUrl: string): void {
    this.getTextSentiment(myUrl).subscribe(result => {
      this.messaggio = JSON.stringify(result);
      this.loadDivVisible=false;
      this.divDataHidden=false;
    });
  }

  ngOnInit() {


    this.messaggio = 'ECCOCI';
  }

}
