import {environment} from 'environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Logger} from '../utils/logger-service';

const log = new Logger(`service-base`);
const contentType = 'application/json;charset=utf-8';

interface LocalToken {
  value: string;
}

export abstract class ServiceBase {

  token: any;
  apiEndpoint: any;

  constructor(private http: HttpClient) {
    this.token = ServiceBase.getToken();
    this.apiEndpoint = `${environment.apiEndpoint}`;
  }

  private tokenStorageItem(): any {
    const savedCredentials = sessionStorage.getItem(environment.authTokenKey) || localStorage.getItem(environment.authTokenKey);
    const tokenItem = <any>JSON.parse(savedCredentials);
    log.debug(tokenItem);
    return tokenItem;
  }

  private static getToken(): string {
    const savedCredentials = sessionStorage.getItem('auth_app_token') || localStorage.getItem('auth_app_token');
    const tokenBody = <LocalToken>JSON.parse(savedCredentials);
    if (!tokenBody) {
      return null;
    }
    return tokenBody.value;
  }

  public get<T>(url: string): Observable<T> {
    this.token = ServiceBase.getToken();
    const httpHeaders = new HttpHeaders({
      token: `${this.token}`,
      'Content-type': contentType,
    });
    return this.http.get<T>(url, {headers: httpHeaders});
  }

  public post<T>(url: string): Observable<T> {
    return this.postWithData(url, {});
  }

  public postWithData<T>(url: string, data: any): Observable<T> {
    let httpHeaders: HttpHeaders;
    httpHeaders = new HttpHeaders({
      token: `${this.token}`,
      'Content-type': contentType,
    });
    return this.http.post<T>(url, JSON.stringify(data), {headers: httpHeaders});
  }

  public delete<T>(url: string): Observable<T> {
    let httpHeaders: HttpHeaders;
    httpHeaders = new HttpHeaders({
      token: `${this.token}`,
      'Content-type': contentType,
    });
    return this.http.delete<T>(url, {headers: httpHeaders});
  }

  public put<T>(url: string, data: any): Observable<T> {
    let httpHeaders: HttpHeaders;
    httpHeaders = new HttpHeaders({
      token: `${this.token}`,
      'Content-type': contentType,
    });
    return this.http.put<T>(url, JSON.stringify(data), {headers: httpHeaders});
  }
}
