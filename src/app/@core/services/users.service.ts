import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Logger} from '../utils/logger-service';
import {ServiceBase} from '../base/service-base';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const log = new Logger(`user-service`);

@Injectable({
    providedIn: 'root',
})
export class UserService extends ServiceBase {

    private time: Date = new Date;

    constructor(http: HttpClient) {
        super(http);
    }

    public logout(): Observable<boolean> {
        return new Observable(subscriber => {
            return subscriber.next(true);
        });
    }

    public validate(): Observable<string> {
        return new Observable(subscriber => {
            const date = new Date();
            const fifteenMinutesInMs = (60 * 1000) * 12;
            const createdDate = new Date(+ fifteenMinutesInMs);
            if (!environment.production) {
                const testToken = 'test-token-developer';
                const value = {
                    createdAt: createdDate,
                    name: 'nb:auth:simple:token',
                    ownerStrategyName: 'email',
                    value: testToken,
                };
                localStorage.setItem('auth_app_token', JSON.stringify(value));
                return subscriber.next(testToken);
            }
            const token = JSON.parse(sessionStorage.getItem('auth_app_token') || localStorage.getItem('auth_app_token'));
            if (!token) {
                return subscriber.next(null);
            }

            if (date.getTime() > createdDate.getTime()) {
                log.debug('refresh token');
                const getUrl = `${environment.authEndpoint}/${environment.authEndpoint_refresh_token}`;
                this.get(getUrl).subscribe((res: any) => {
                    const value = {
                        createdAt: res.token_create_date,
                        name: 'nb:auth:simple:token',
                        ownerStrategyName: 'email',
                        value: res.token,
                    };
                    localStorage.setItem('auth_app_token', JSON.stringify(value));
                    return subscriber.next(res.token);
                }, error => {
                    return subscriber.next(null);
                });
            }
            log.debug(createdDate, token);
            if (!token.value) {
                return subscriber.next(null);
            }
        });
    }

    public getUsers(): Observable<any> {
        const postUrl = `${environment.apiEndpoint}/users`;
        return this.get(postUrl);
    }

    public getGuardInfo(): Observable<any> {
        const postUrl = `${environment.apiEndpoint}/users/get-info`;
        return this.post(postUrl);
    }

    public add(data: any): Observable<any> {
        const postUrl = `${environment.apiEndpoint}/users`;
        return this.put(postUrl, data);
    }

    public update(key: any, data: any): Observable<any> {
        const postUrl = `${environment.apiEndpoint}/users/${key}`;
        return this.postWithData(postUrl, data);
    }
}
