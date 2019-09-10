import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VocalAnalyzeComponentComponent} from '../../vocal-analyze-component/vocal-analyze-component.component';
import{TextAnalyzeComponentComponent} from '../../text-analyze-component/text-analyze-component.component';


export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}
export interface EmoAudioFile {
    nome: string;
    url: string;
    audioData: string;
    action: string;
}
export interface RepoData {
    nome: string;
    uri: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
];


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private _httpClient: HttpClient) {}
    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    displayedColumns2 = ['nome', 'posizione', 'audio', 'azione'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    // dataSource2 = new MatTableDataSource(ELEMENT_DATA2);
    dataSource2 = new MatTableDataSource();
    places: Array<any> = [];
    bucketData: Array<RepoData> = [];
    FileSelected:string='Nessuna Selezione';
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(VocalAnalyzeComponentComponent)vocal: VocalAnalyzeComponentComponent;
    @ViewChild(TextAnalyzeComponentComponent)text: TextAnalyzeComponentComponent;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource2.filter = filterValue;
    }
    datiDalServer(): Observable<RepoData[]> {
        const requestUrl = 'http://emomaiolix.appspot.com/emotions/repository';
        return  this._httpClient.get<RepoData[]>(requestUrl);
    }
    convertiRepoToFileEmo(r: RepoData) {
        let result: EmoAudioFile= {nome: 'Cliente1', url: 'gs:Cliente1.wav', audioData: 'http://emomaiolix.appspot.com/emotions/repository?file=cliente1.wav', action: 'ANALIZZA'};
        const url = 'http://emomaiolix.appspot.com/emotions/repository';
        result.nome = r.nome;
        result.url = r.uri;
        result.audioData = url + '?file=' + r.nome;
        result.action = r.nome;
        return result;


    }
    myClickFunction(url,nome){
      this.vocal.execAnalysis(url);
      this.text.execAnalysis(url);
      this.FileSelected = nome;
      //alert(nomeFile);
      //this.vocal.messaggio=nomeFile;
      //this.vocal.datiSentimenti();
      //var pippo=this.vocal.getSentiment('gs://audio-bucket-emotions2/emovo/neu-m3-l2.wav');
      //sthis.vocal.eccoci();
      //console.log(event);
    }

    ngOnInit() {
        this.datiDalServer().subscribe(result => {
            const dati: EmoAudioFile[] = [];
            result.forEach(element => {
                if (element.nome.includes('wav')) {
                    const appo: EmoAudioFile = this.convertiRepoToFileEmo(element);
                // console.log(element);
                // const appo: EmoAudioFile = {};
                // appo.nome = element.nome;
                 dati.push(appo);
                }

            });
            //console.log(dati.length);
            this.dataSource2.data = dati;

        });
        this.FileSelected='Nessuna Selezione';
        this.dataSource2.paginator = this.paginator;
    }
}

