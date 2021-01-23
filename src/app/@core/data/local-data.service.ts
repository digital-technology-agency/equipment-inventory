import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalDataService {

    equipmentsKey = 'dta_equipments';

    constructor() {
    }

    public getEquipments(): any[] {
        return JSON.parse(localStorage.getItem(`${(this.equipmentsKey)}`)) || [];
    }

    public saveEquipments(data: any[]) {
        localStorage.setItem(`${(this.equipmentsKey)}`, JSON.stringify(data));
    }
}
