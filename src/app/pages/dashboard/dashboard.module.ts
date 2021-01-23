import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {DxDataGridModule} from 'devextreme-angular';

@NgModule({
    imports: [
        NbCardModule,
        ThemeModule,
        DxDataGridModule,
    ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
