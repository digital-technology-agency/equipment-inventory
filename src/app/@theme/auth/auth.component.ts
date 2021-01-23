import {Component, OnInit} from '@angular/core';
import {NbLoginComponent} from '@nebular/auth';
import {Logger} from '../../@core/utils/logger-service';

const log = new Logger(`auth.component`);

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends NbLoginComponent implements OnInit {

    errors: string[];

    login(): void {
        log.debug(this.user);
        super.login();
    }

    getConfigValue(key: string): any {
        super.getConfigValue(key);
    }

    ngOnInit(): void {
        this.strategy = 'email';
    }
}
