import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {DxDataGridModule, DxToolbarModule} from 'devextreme-angular';
import {DxoToolbarModule} from 'devextreme-angular/ui/nested';

@NgModule({
    imports: [
        NbCardModule,
        ThemeModule,
        DxDataGridModule,
        DxoToolbarModule,
        DxToolbarModule,
        NbButtonModule,
    ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
