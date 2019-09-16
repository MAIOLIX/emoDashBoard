import { Component, OnInit,ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { MatTableDataSource, MatPaginator} from '@angular/material';

export interface TextItem {
  content: string;
  execTime: number;
  magnitude: number;
  score: number;
}
export interface TextSentimentApi{
  items: TextItem[];
}

const datiFake: TextItem[] = [
{content: 'suca','execTime':0, 'magnitude':1, 'score':2}

];

@Component({
  selector: 'text-analyze-component',
  templateUrl: './text-analyze-component.component.html',
  styleUrls: ['./text-analyze-component.component.scss']
})
export class TextAnalyzeComponentComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['frase', 'punteggio', 'intensita'];
  messaggio: string;
  loadDivVisible = false;
  divDataHidden = true;
  FileChoosed = '';
 
  constructor(private _httpClient: HttpClient) { }

  adaptUrl(myUrl:string):string{
    var result:string='gs';
    var re='gs://audio-bucket-emotions2/';
    var newString=myUrl.replace(re,':');
    result = result + newString;
    return result;

  }


  getTextSentiment(urlo: string): Observable<TextItem[]> {
    var url = this.adaptUrl(urlo);
    //alert(url);
    const endpoint = 'https://emomaiolix.appspot.com/emotions/sentiment/analyzeFromFileByUrl';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._httpClient.post<TextItem[]>(endpoint, {
      "url": url

    }, httpOptions);

  }
  execAnalysis(myUrl: string): void {
    const dati: TextItem[] = [];
    this.getTextSentiment(myUrl).subscribe(result => {
      this.loadDivVisible = false;
      this.divDataHidden = false;
      this.dataSource.data = result;
    });
  }

  ngOnInit() {

    this.messaggio = 'ECCOCI';
  }

}
