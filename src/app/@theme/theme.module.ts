import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    NbActionsModule,
    NbLayoutModule,
    NbMenuModule,
    NbSearchModule,
    NbSidebarModule,
    NbUserModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbThemeModule, NbAlertModule, NbInputModule, NbCheckboxModule,
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbSecurityModule} from '@nebular/security';

import {
    FooterComponent,
    HeaderComponent,
    LayoutDirectionSwitcherComponent,
    SearchInputComponent,
    SwitcherComponent,
} from './components';
import {
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
    NumberWithCommasPipe,
} from './pipes';
import {
    OneColumnLayoutComponent,
    ThreeColumnsLayoutComponent,
    TwoColumnsLayoutComponent,
} from './layouts';
import {DEFAULT_THEME} from './styles/theme.default';
import {COSMIC_THEME} from './styles/theme.cosmic';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {DARK_THEME} from './styles/theme.dark';
import {ToggleSettingsButtonComponent} from './components/toggle-settings-button/toggle-settings-button.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

const NB_MODULES = [
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbSecurityModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbEvaIconsModule,
];
const COMPONENTS = [
    SwitcherComponent,
    LayoutDirectionSwitcherComponent,
    ToggleSettingsButtonComponent,
    HeaderComponent,
    FooterComponent,
    SearchInputComponent,
    OneColumnLayoutComponent,
    ThreeColumnsLayoutComponent,
    TwoColumnsLayoutComponent,
];
const PIPES = [
    CapitalizePipe,
    PluralPipe,
    RoundPipe,
    TimingPipe,
    NumberWithCommasPipe,
];

@NgModule({
    imports: [CommonModule, ...NB_MODULES, NbAlertModule, FormsModule, NbInputModule, NbCheckboxModule, RouterModule],
    exports: [CommonModule, ...PIPES, ...COMPONENTS],
    declarations: [...COMPONENTS, ...PIPES, AuthComponent],
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders<ThemeModule> {
        return {
            ngModule: ThemeModule,
            providers: [
                ...NbThemeModule.forRoot(
                    {
                        name: 'default',
                    },
                    [DEFAULT_THEME, DARK_THEME],
                ).providers,
            ],
        };
    }
}
