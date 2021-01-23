/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {SeoService, AnalyticsService} from './@core/utils';

// @ts-ignore
import * as messages from 'devextreme/localization/messages/ru.json';
import {locale as devextremeLocale, loadMessages} from 'devextreme/localization';

@Component({
    selector: 'ngx-app',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

    constructor(private analytics: AnalyticsService,
                private seoService: SeoService) {
    }

    ngOnInit() {
        loadMessages(messages.ru);
        devextremeLocale('ru');
        this.analytics.trackPageViews();
        this.seoService.trackCanonicalChanges();
    }
}
