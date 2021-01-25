import {Component, OnInit} from '@angular/core';
import {LocalDataService} from '../../@core/data/local-data.service';
import {Logger} from '../../@core/utils/logger-service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


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

    exportPDF() {
        const rows = [];
        this.equipments.forEach(item => {
            rows.push(`${item.equipmentCode}`);
        });
        const content = {
            compress: true,
            info: {
                title: 'Оборудование',
                author: 'Дмитрий К',
                subject: 'Список оборудования',
                keywords: 'equipments',
            },
            watermark: { text: 'Агентство цифровых технологий', color: 'blue', opacity: 0.1, bold: true, italics: false },
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
        pdfMake.createPdf(content).open();
    }

    exportPDFWithSecret() {
        const content = {
            userPassword: '123',
            ownerPassword: '123456',
            compress: true,
            info: {
                title: 'Оборудование',
                author: 'Дмитрий К',
                subject: 'Список оборудования',
                keywords: 'equipments',
            },
            watermark: { text: 'Агентство цифровых технологий', color: 'blue', opacity: 0.1, bold: true, italics: false },
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
        pdfMake.createPdf(content).open();
    }
}
