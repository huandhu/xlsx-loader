import XLSX from 'xlsx'

class JSON_XLSX {
    constructor () {
        this.workbook = null;
        this.sheet = null;
        this.sheetNames = []
    }

    readFile (source) {
        this.workbook = XLSX.read(source);
        this.sheetNames = this.workbook.SheetNames;
    }

    selectSheet (sheet) {
        sheet = (typeof sheet === 'string' || typeof sheet === 'number') ? sheet : 0;
        sheet = (typeof sheet === 'string')
            ? sheet
            : (typeof sheet === 'number')
            ? this.sheetNames[sheet]
            : this.sheetNames[0];

        if (sheet) {
            this.sheet = this.workbook.Sheets[sheet];
        } else {
            throw new Error('options sheet is undifined')
        }
    }

    singleSheet (sheet) {
        this.selectSheet(sheet || 0);       
        let data = XLSX.utils.sheet_to_json(this.sheet)
        return data
    }

    allSheet () {
        let data = Object.keys(this.workbook.Sheets).map(sheet => {
            this.sheet = this.workbook.Sheets[sheet];
            return {sheet, data: XLSX.utils.sheet_to_json(this.sheet)}
        })
        return data
    }

    toJson (source, sheet) {
        this.readFile(source);
        if (sheet) {
            return this.singleSheet(sheet)
        } else {
            return this.allSheet()
        }
    }
}

export default new JSON_XLSX()