import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbSecurityModule, NbRoleProvider} from '@nebular/security';
import {of as observableOf} from 'rxjs';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {AnalyticsService, SeoService} from './utils';
import {MockDataModule} from './mock/mock-data.module';
import {environment} from '../../environments/environment';

export class NbSimpleRoleProvider extends NbRoleProvider {
    getRole() {
        return observableOf('guest');
    }
}

export const NB_CORE_PROVIDERS = [
    ...MockDataModule.forRoot().providers,
    ...NbAuthModule.forRoot({
        strategies: [
            NbPasswordAuthStrategy.setup({
                name: 'email',
                baseEndpoint: environment.authEndpoint,
                token: {
                    key: environment.authTokenBody,
                },
                login: {
                    endpoint: environment.authEndpoint_login,
                    method: 'post',
                    defaultErrors: ['Проверьте сочетание логина и Пароля!'],
                    defaultMessages: ['Данные введены правильно!'],
                },
            }),
        ],
        forms: {
            login: {},
            register: {},
        },
    }).providers,

    NbSecurityModule.forRoot({
        accessControl: {
            guest: {
                view: '*',
            },
            user: {
                parent: 'guest',
                create: '*',
                edit: '*',
                remove: '*',
            },
        },
    }).providers,

    {
        provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
    },
    AnalyticsService,
    SeoService,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        NbAuthModule,
    ],
    declarations: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                ...NB_CORE_PROVIDERS,
            ],
        };
    }
}
