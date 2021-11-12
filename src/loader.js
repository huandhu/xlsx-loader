import { urlToRequest } from 'loader-utils';
import validateOptions from 'schema-utils';
import xlsx from './json';

// Loader Mode
export const raw = true;

const schema = {
    type: "object",
    properties: {
        sheet: {
            anyOf: [
                { type: "number" },
                { type: "string" }
            ]
        }
    },
    additionalProperties: true
}
export default function loader(source) {
    const options = this.getOptions();
    // validateOptions(schema, options, 'xlsx Loader');
    source = JSON.stringify(xlsx.toJson(source, options))
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')
    return `export default ${ source }`;
}