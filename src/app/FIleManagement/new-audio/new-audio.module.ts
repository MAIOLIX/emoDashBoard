import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule, MatInputModule,MatOption } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NewAudioComponent} from './new-audio.component';
import {RecordingComponentComponent} from '../recording-component/recording-component.component';
import { from } from 'rxjs';
@NgModule({
  declarations: [NewAudioComponent,RecordingComponentComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatOption,
    MatProgressSpinnerModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ]
})
export class NewAudioModule { }
