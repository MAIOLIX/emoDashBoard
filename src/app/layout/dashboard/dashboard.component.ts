import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VocalAnalyzeComponentComponent} from '../../DashboardAnalyze/vocal-analyze-component/vocal-analyze-component.component';
import {TextAnalyzeComponentComponent} from '../../DashboardAnalyze/text-analyze-component/text-analyze-component.component';

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
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private _httpClient: HttpClient) {}
    displayedColumns2 = ['nome', 'posizione', 'audio', 'azione'];
    dataSource2 = new MatTableDataSource();
    bucketData: Array<RepoData> = [];
    FileSelected = 'Nessuna Selezione';
    hiddenLoading = true;
    hiddenPanel = true;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(VocalAnalyzeComponentComponent, { static: true })vocal: VocalAnalyzeComponentComponent;
    @ViewChild(TextAnalyzeComponentComponent, { static: true })text: TextAnalyzeComponentComponent;

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
        let result: EmoAudioFile= {nome: '', url: '', audioData: '', action: ''};
        const url = 'http://emomaiolix.appspot.com/emotions/repository';
        result.nome = r.nome;
        result.url = r.uri;
        result.audioData = url + '?file=' + r.nome;
        result.action = r.nome;
        return result;
    }
    myClickFunction(url,nome){
        this.vocal.hiddenLoading=false;
        this.vocal.hiddenPanel=true;
        this.vocal.FileChoosed=nome;
        this.vocal.execAnalysis(url);
        this.text.loadDivVisible = true;
        this.text.divDataHidden = true;
        this.text.FileChoosed=nome;
        this.text.execAnalysis(url);
        this.FileSelected=nome;
    }
    ngOnInit() {
        this.hiddenLoading=false;
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
            this.hiddenLoading = true;
            this.hiddenPanel=false;


        });
        this.FileSelected='Nessuna Selezione';
        this.dataSource2.paginator = this.paginator;
    }
}

