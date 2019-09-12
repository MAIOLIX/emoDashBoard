import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {VocalAnalyzeComponentComponent} from '../../vocal-analyze-component/vocal-analyze-component.component';
import {TextAnalyzeComponentComponent} from '../../text-analyze-component/text-analyze-component.component';

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
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [DashboardComponent, VocalAnalyzeComponentComponent, TextAnalyzeComponentComponent]
})
export class DashboardModule {}
