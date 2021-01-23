import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UserService} from '../../../@core/services/users.service';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();
    userPictureOnly: boolean = false;
    user: any;

    themes = [
        {
            value: 'default',
            name: 'СВЕТЛАЯ',
        },
        {
            value: 'dark',
            name: 'ТЕМНАЯ',
        },
    ];

    currentTheme = 'default';

    userMenu = [{title: 'Profile'}, {title: 'Log out'}];

    constructor(private sidebarService: NbSidebarService,
                private menuService: NbMenuService,
                private themeService: NbThemeService,
                private userAuthService: UserService,
                private breakpointService: NbMediaBreakpointsService,
                private router: Router) {
    }

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;
        this.userAuthService.validate()
            .subscribe(token => {
                if (!token) {
                    sessionStorage.removeItem(environment.authTokenKey);
                    localStorage.removeItem(environment.authTokenKey);
                    this.router.navigate(['auth/login']);
                }
            });

        const {xl} = this.breakpointService.getBreakpointsMap();
        this.themeService.onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$),
            )
            .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

        this.themeService.onThemeChange()
            .pipe(
                map(({name}) => name),
                takeUntil(this.destroy$),
            )
            .subscribe(themeName => this.currentTheme = themeName);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');

        return false;
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }
}
