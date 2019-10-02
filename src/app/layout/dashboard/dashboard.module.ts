import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule, MatInputModule,MatOptionModule,MatSelectModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent, DeleteDialog,InsertDialog } from './dashboard.component';
import {VocalAnalyzeComponentComponent} from '../../DashboardAnalyze/vocal-analyze-component/vocal-analyze-component.component';
import {TextAnalyzeComponentComponent} from '../../DashboardAnalyze/text-analyze-component/text-analyze-component.component';
import {UploadAudioComponent} from '../../FIleManagement/upload-audio/upload-audio.component';
import {TimerComponent} from '../../FIleManagement/timer/timer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {RecordingComponentComponent} from '../../FIleManagement/recording-component/recording-component.component';
@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [DashboardComponent, VocalAnalyzeComponentComponent, TextAnalyzeComponentComponent, DeleteDialog,InsertDialog,UploadAudioComponent,TimerComponent,RecordingComponentComponent],
    entryComponents: [ DeleteDialog, InsertDialog, ]
})
export class DashboardModule {}
