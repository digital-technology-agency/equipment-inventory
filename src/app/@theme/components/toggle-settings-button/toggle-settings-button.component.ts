import {Component, OnInit} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';

@Component({
    selector: 'toggle-settings-button',
    template: `
        <div class="settings-row">
            <nb-action class="toggle-settings">
                <nb-icon
                        class="settings-icon"
                        [options]="{ animation: { type: 'zoom' } }"
                        icon="settings-outline">
                </nb-icon>
            </nb-action>
        </div>
    `,
    styleUrls: ['./toggle-settings-button.component.scss'],
})
export class ToggleSettingsButtonComponent implements OnInit {

    sidebarEnd = false;
    expanded = false;
    wasExpanded = false;

    constructor() {
        this.sidebarEnd = true;
    }

    ngOnInit(): void {
    }

}
