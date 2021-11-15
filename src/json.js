import XLSX from 'xlsx'

class JSON_XLSX {
    constructor () {
        this.workbook = null;
    }

    readFile (source, options) {
        this.workbook = XLSX.read(source, options);
    }

    parseSheet (options) {
        const sheetNames = Object.keys(this.workbook.Sheets || {});
        // 单个表
        if (sheetNames.length === 1) {
            return this.parseSingleSheet(sheetNames, options);
        }
        // 多个表
        return this.parseMultipleSheet(sheetNames, options);
    }

    parseSingleSheet (sheetNames, options) {
        options = Array.isArray(options) ? options[0] : options;
            
        let sheetObj = this.workbook.Sheets[sheetNames[0]];
        let { afterParseCallback: callback, ...others } = options || {};
        let json = XLSX.utils.sheet_to_json(sheetObj, others);
        return this.parseSheetResult(json, callback);
    }

    parseMultipleSheet (sheetNames, options) {
        return sheetNames.map((sheet, index) => {
            options = Array.isArray(options) ? options[index] : options;

            let sheetObj = this.workbook.Sheets[sheet];
            let { afterParseCallback: callback, ...others } = options || {};
            let json = {sheet, data: XLSX.utils.sheet_to_json(sheetObj, others)};
            return this.parseSheetResult(json, callback);
        })
    }

    parseSheetResult (json, callback) {
        if (typeof callback === 'function') {
            let result = callback(json)
            if (!result) throw new Error('afterParseCallback need return a object')
            return result
        }
        return json
    }

    toJson (source, options) {
        let { readOptions, parseOptions } = options;
        this.readFile(source, readOptions);
        return this.parseSheet(parseOptions);
    }
}

export default new JSON_XLSX()