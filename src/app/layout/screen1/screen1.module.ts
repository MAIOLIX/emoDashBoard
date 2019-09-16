import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Screen1Component } from './screen1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StatModule } from '../../shared/modules/stat/stat.module';

import { Screen1RoutingModule } from './screen1-routing.module';
//import {RecordingComponentComponent} from '../../FIleManagement/recording-component/recording-component.component';
import {AudioTableComponent} from '../../FIleManagement/audio-table/audio-table.component';
import {NewAudioComponent} from '../../FIleManagement/new-audio/new-audio.component';
import {RecordingComponentComponent} from '../../FIleManagement/recording-component/recording-component.component';
import { from } from 'rxjs';
@NgModule({
  declarations: [Screen1Component, AudioTableComponent, NewAudioComponent,RecordingComponentComponent],
  imports: [
    CommonModule,
    Screen1RoutingModule,
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
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ]
})
export class Screen1Module { }
