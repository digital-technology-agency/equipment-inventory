import {Component, OnInit} from '@angular/core';
import {LocalDataService} from '../../@core/data/local-data.service';
import {Logger} from '../../@core/utils/logger-service';
import {PdfService} from '../../@core/services/pdf.service';

const log = new Logger(`dashboard`);

@Component({
    selector: 'dashboard',
    styleUrls: ['dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    equipments: any[];

    constructor(private dataService: LocalDataService,
                private pdf: PdfService) {
    }

    ngOnInit(): void {
        this.equipments = this.dataService.getEquipments();
    }

    editEnd() {
        log.debug('edit-end: ', this.equipments);
        this.dataService.saveEquipments(this.equipments);
    }

    exportPDF() {
        const watermark = {
            text: 'Агентство цифровых технологий',
            color: 'rgba(64,19,255,0.18)',
            opacity: 0.05,
            bold: false,
            italics: false,
        };
        const rows = this.equipments.map(i => {
            /*return [i.equipmentName, i.equipmentType, i.equipmentCode, {qr: `${i.equipmentCode}`, fit: '50'}];*/
            return [i.equipmentName, i.equipmentType, i.equipmentCode];
        });
        const content = {
            compress: true,
            info: {
                title: 'Оборудование',
                author: 'Дмитрий К',
                subject: 'Список оборудования',
                keywords: 'equipments',
            },
            content: [
                {text: 'АГЕНТСТВО ЦИФРОВЫХ ТЕХНОЛОГИЙ', link: 'https://dta.agency', color: '#4013ff'},
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['*', 'auto', '*'],
                        body: [
                            ['Название', 'Тип', 'Код'],
                            ...rows,
                        ],
                    },
                },
            ],
        };
        this.pdf.openWaterMark(content, watermark);
    }

    exportPDFWithSecret() {
        const content = {
            /*compress: true,*/
            info: {
                title: 'Оборудование',
                author: 'Дмитрий К',
                subject: 'Список оборудования',
                keywords: 'equipments',
            },
            watermark: {text: 'Агентство цифровых технологий', color: 'blue', opacity: 0.1, bold: true, italics: false},
            content: [
                {text: 'Агентство цифровых технологий', link: 'https://dta.agency', color: '#4013ff'},
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['auto', 'auto', 'auto'],
                        /*                        body: rows,*/
                        body: [
                            ['Название', 'Тип', 'Код'],
                        ],
                    },
                },
            ],
        };
        this.pdf.openWithSecret(content, '123');
    }
}
