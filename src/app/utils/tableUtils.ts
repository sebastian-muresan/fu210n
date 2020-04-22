import * as XLSX from "xlsx";
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
//import { UserOptions } from 'jspdf-autotable';
/*
interface jsPDFWithPlugin extends jsPDF {
    autotable: (options: UserOptions) => jsPDF;
}*/

export class TableUtil {
    static exportToExcel(tableId: string, name?: string) {
        let timeSpan = new Date().toISOString();
        let prefix = name || "ExportResult";
        let fileName = `${prefix}-${timeSpan}`;
        let targetTableElm = document.getElementById(tableId);
        let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
}

export class PdfUtil {
    static exportToPDF(data, name) {
        let doc = new jsPDF('portrait', 'px', 'a4');// as jsPDFWithPlugin;
        doc.autoTable({
            head: [['Name', 'Email', 'Country']],
            body: [[
                'Seb', 'a@a.de', 'Romania'
            ]]
        });
        doc.save(name);

    }
}