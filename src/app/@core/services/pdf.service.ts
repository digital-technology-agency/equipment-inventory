import {Injectable} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root',
})
export class PdfService {

    constructor() {
    }

    public open(option: any) {
        return pdfMake.createPdf(option).open();
    }

    public openWaterMark(option: any, watermark: any) {
        option.watermark = watermark;
        return pdfMake.createPdf(option).open();
    }

    public openWithSecret(option: any, pwd: string) {
        option.userPassword = pwd;
        option.ownerPassword = pwd;
        return pdfMake.createPdf(option).open();
    }
}
