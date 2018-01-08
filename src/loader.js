import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import xlsx from '../lib';

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
    additionalProperties: false
}

module.exports = function (source) {
    const options = getOptions(this);
    validateOptions(schema, options, 'xlsx Loader');
    source = JSON.stringify(xlsx.toJson(source, options.sheet || null))
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')
    return `export default ${ source }`;
}
module.exports.raw = true;