import { getOptions } from 'loader-utils';
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
    const options = getOptions(this) || {};
    validateOptions(schema, options, 'xlsx Loader');

    source = JSON.stringify(xlsx.toJson(source, options.sheet || null))
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')

    return `export default ${ source }`;
}