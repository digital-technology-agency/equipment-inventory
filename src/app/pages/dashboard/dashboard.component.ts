import {Component, OnInit} from '@angular/core';
import {LocalDataService} from '../../@core/data/local-data.service';
import {Logger} from '../../@core/utils/logger-service';

const log = new Logger(`dashboard`);

@Component({
    selector: 'dashboard',
    styleUrls: ['dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    equipments: any[];

    constructor(private dataService: LocalDataService) {
    }

    ngOnInit(): void {
        this.equipments = this.dataService.getEquipments();
    }

    editEnd() {
        log.debug('edit-end: ', this.equipments);
        this.dataService.saveEquipments(this.equipments);
    }
}
