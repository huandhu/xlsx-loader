import { validate } from 'schema-utils';
import xlsx from './json';

// Loader Mode
export const raw = true;

const schema = {
    type: "object",
    properties: {
        readOptions: {
            type: 'object',
            properties: {
                sheetRows: {
                    type: 'number',
                },
                sheets: {
                    anyOf: [
                        { type: "number" },
                        { type: "string" },
                        { type: "array" },
                    ]
                }
            }
        },
        parseOptions: {
            anyOf: [
                { type: "object" },
                { type: "array" },
            ],
            properties: {
                range: {
                    anyOf: [
                        { type: "number" },
                        { type: "string" },
                    ],
                },
                header: {
                    anyOf: [
                        { type: "number" },
                        { type: "string" },
                        { type: "array" },
                    ],
                    afterParseCallback: {
                        type: 'function'
                    }
                }
            }
        }
    },
    additionalProperties: true
}

export default function loader(source) {
    const options = this.getOptions();
    validate(schema, options, { name: 'xlsx Loader' });
    source = JSON.stringify(xlsx.toJson(source, options))
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')
    return `export default ${ source }`;
}