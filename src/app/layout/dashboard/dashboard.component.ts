import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError} from '@angular/material/dialog';
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

    constructor(private _httpClient: HttpClient, public dialog: MatDialog) {}
    displayedColumns2 = ['nome', 'posizione', 'audio', 'azione','cancella'];
    dataSource2 = new MatTableDataSource();
    bucketData: Array<RepoData> = [];
    FileSelected = 'Nessuna Selezione';
    hiddenLoading = true;
    hiddenPanel = true;
    myDialogRef: any;
    myInsertDialogRef : any;
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

    cancellaFileDalServer(filename):Observable<any> {
      const requestUrl = 'http://emomaiolix.appspot.com/emotions/repository';
      var appo=requestUrl+'?file='+filename;
      return this._httpClient.delete(appo,{responseType: 'text'});


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
    refreshFileTable(): void {
      this.hiddenLoading = false;
      this.hiddenPanel = true;
      this.datiDalServer().subscribe(result => {
        const dati: EmoAudioFile[] = [];
        result.forEach(element => {
            if (element.nome.includes('wav')) {
                const appo: EmoAudioFile = this.convertiRepoToFileEmo(element);
                dati.push(appo);
            }
        });
        this.dataSource2.data = dati;
        this.hiddenLoading = true;
        this.hiddenPanel = false;
      });
    }

    ngOnInit() {
        this.refreshFileTable();
        this.FileSelected='Nessuna Selezione';
        this.dataSource2.paginator = this.paginator;
    }
    deleteFileFromServer(filename): void {
      this.hiddenLoading = false;
      this.hiddenPanel = true;
      this.cancellaFileDalServer(filename).subscribe(result => {
        this.refreshFileTable();
      });

    }
    openInsertDialog(): void {
      this.myInsertDialogRef=this.dialog.open(InsertDialog,{
        width: '500px',
        height:'500px',
        data: 'Insert dialog'
      });
      this.myInsertDialogRef.afterClosed().subscribe(result=>{
        alert('Eseguire il reload dei dati.......');
        alert(result);
      });
    }

    openDeleteDialog(filename): void {
      this.myDialogRef = this.dialog.open(DeleteDialog,{
        width: '250px',
        data: filename
      });
      this.myDialogRef.afterClosed().subscribe(result => {
        this.deleteFromBucket(result);
      });
    }
    deleteFromBucket(filename): void {
      if(filename!=undefined)
       this.deleteFileFromServer(filename);

    }
}
export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'delete-Dialog',
  templateUrl: './deleteDialog.html',
})

export class DeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'insert-Dialog',
  templateUrl: './insertDialog.html',
})
export class InsertDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
      this.dialogRef.close();

    }


}




