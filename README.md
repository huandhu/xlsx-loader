This is a WebPack5 Loader library for converting Excel files into JSON objects

<h2 align="center">Install</h2>

```bash
npm install --save-dev excels-loader
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
            {
                test: /\.xls.?$/,
                use: {
                    loader: 'excels-loader'
                }
            }
        ]
    }
}
```
```js
// Parse to line 3
module.exports = {
  module: {
    rules: [
            {
                test: /\.xls.?$/,
                use: {
                    loader: 'excels-loader',
                    {
                        readOptions: {
                            sheetRows: 3
                        }
                    }
                }
            }
        ]
    }
}
```
```js
// Parsing ’sheet1‘ table
module.exports = {
  module: {
    rules: [
            {
                test: /\.xls.?$/,
                use: {
                    loader: 'excels-loader',
                    {
                        readOptions: {
                            sheets: 'sheet1',
                        }
                    }
                }
            }
        ]
    }
}
```
```js
// Parsing first table
module.exports = {
  module: {
    rules: [
            {
                test: /\.xls.?$/,
                use: {
                    loader: 'excels-loader',
                    {
                        readOptions: {
                            sheets: 0,
                        }
                    }
                }
            }
        ]
    }
}
```
```js
// Parsing 'Sheet2' table
module.exports = {
  module: {
    rules: [
            {
                test: /\.xls.?$/,
                use: {
                    loader: 'excels-loader',
                    {
                        readOptions: {
                            sheets: ['Sheet2'],
                        }
                    }
                }
            }
        ]
    }
}
```
```js
// Parsing 'sheet1' table, after 2 line and ['id', 'name', 'age'] column
module.exports = {
  module: {
    rules: [
            {
                test: /\.xls.?$/,
                use: {
                    loader: 'excels-loader',
                    {
                        readOptions: {
                            sheets: 'sheet1',
                        },
                        parseOptions: { range: 2, header: ['id', 'name', 'age'] }
                    }
                }
            }
        ]
    }
}
```
```js
// AfterParseCallback function processes data
module.exports = {
  module: {
    rules: [
            {
                test: /\.xls.?$/,
                use: {
                    loader: 'excels-loader',
                    {
                       readOptions: {
                            sheets: 'sheet1',
                        },
                        parseOptions: {
                            range: 2,
                            header: ['id', 'name', 'age'],
                            afterParseCallback: (data) => {
                                return data.reduce((result, cur) => {
                                    result[cur.id] = { name: cur.name, age: cur.age };
                                    return result;
                                }, {})
                            }
                        }
                    }
                }
            }
        ]
    }
}
```
```js
// The parseOptions array corresponds to the sheet array
module.exports = {
  module: {
    rules: [
            {
                test: /\.xls.?$/,
                use: {
                    loader: 'excels-loader',
                    {
                       parseOptions: [{ range: 2, header: ['id', 'name', 'age'] }]
                    }
                }
            }
        ]
    }
}
```


<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`ReadOptions`](#ReadOptions)**|`{Object}`|`undefined`|read excel file option|
|**[`parseOptions`](#parseOptions)**|`{Object、Array}`|`undefined`|parse json option|

### ReadOptions 
| Option Name | Default | Description                                          |
| :---------- | ------: | :--------------------------------------------------- |
|`type`       |         | Input data encoding (see Input Type below)           |
|`raw`        | false   | If true, plain text parsing will not parse values ** |
|`codepage`   |         | If specified, use code page when appropriate **      |
|`cellFormula`| true    | Save formulae to the .f field                        |
|`cellHTML`   | true    | Parse rich text and save HTML to the `.h` field      |
|`cellNF`     | false   | Save number format string to the `.z` field          |
|`cellStyles` | false   | Save style/theme info to the `.s` field              |
|`cellText`   | true    | Generated formatted text to the `.w` field           |
|`cellDates`  | false   | Store dates as type `d` (default is `n`)             |
|`dateNF`     |         | If specified, use the string for date code 14 **     |
|`sheetStubs` | false   | Create cell objects of type `z` for stub cells       |
|`sheetRows`  | 0       | If >0, read the first `sheetRows` rows **            |
|`bookDeps`   | false   | If true, parse calculation chains                    |
|`bookFiles`  | false   | If true, add raw files to book object **             |
|`bookProps`  | false   | If true, only parse enough to get book metadata **   |
|`bookSheets` | false   | If true, only parse enough to get the sheet names    |
|`bookVBA`    | false   | If true, copy VBA blob to `vbaraw` field **          |
|`password`   | ""      | If defined and file is encrypted, use password **    |
|`WTF`        | false   | If true, throw errors on unexpected file features ** |
|`sheets`     |         | If specified, only parse specified sheets **         |
|`PRN`        | false   | If true, allow parsing of PRN files **               |
|`xlfn`       | false   | If true, preserve `_xlfn.` prefixes in formulae **   |

https://docs.sheetjs.com/docs/api/parse-options
### parseOptions
| Option Name |  Default | Description                                         |
| :---------- | :------: | :-------------------------------------------------- |
|`afterParseCallback`        | `function`   | Provides the callback after the sheet is parsed into JSON. The parameter is the parsed JSON data. You can edit the returned JSON result here  |
|`raw`        | `true`   | Use raw values (true) or formatted strings (false)  |
|`range`      | from WS  | Override Range (see table below)                    |
|`header`     |          | Control output format (see table below)             |
|`dateNF`     |  FMT 14  | Use specified date format in string output          |
|`defval`     |          | Use specified value in place of null or undefined   |
|`blankrows`  |    **    | Include blank lines in the output **                |

- `raw` only affects cells which have a format code (`.z`) field or a formatted
  text (`.w`) field.
- If `header` is specified, the first row is considered a data row; if `header`
  is not specified, the first row is the header row and not considered data.
- When `header` is not specified, the conversion will automatically disambiguate
  header entries by affixing `_` and a count starting at `1`.  For example, if
  three columns have header `foo` the output fields are `foo`, `foo_1`, `foo_2`
- `null` values are returned when `raw` is true but are skipped when false.
- If `defval` is not specified, null and undefined values are skipped normally.
  If specified, all null and undefined points will be filled with `defval`
- When `header` is `1`, the default is to generate blank rows.  `blankrows` must
  be set to `false` to skip blank rows.
- When `header` is not `1`, the default is to skip blank rows.  `blankrows` must
  be true to generate blank rows

`range` is expected to be one of:

| `range`          | Description                                               |
| :--------------- | :-------------------------------------------------------- |
| (number)         | Use worksheet range but set starting row to the value     |
| (string)         | Use specified range (A1-style bounded range string)       |
| (default)        | Use worksheet range (`ws['!ref']`)                        |

`header` is expected to be one of:

| `header`         | Description                                               |
| :--------------- | :-------------------------------------------------------- |
| `1`              | Generate an array of arrays ("2D Array")                  |
| `"A"`            | Row object keys are literal column labels                 |
| array of strings | Use specified strings as keys in row objects              |
| (default)        | Read and disambiguate first row as keys                   |

If header is not `1`, the row object will contain the non-enumerable property
`__rowNum__` that represents the row of the sheet corresponding to the entry.

<details>
  <summary><b>Examples</b> (click to show)</summary>

For the example sheet:

```js
> XLSX.utils.sheet_to_json(ws);
[ { S: 1, h: 2, e: 3, e_1: 4, t: 5, J: 6, S_1: 7 },
  { S: 2, h: 3, e: 4, e_1: 5, t: 6, J: 7, S_1: 8 } ]

> XLSX.utils.sheet_to_json(ws, {header:"A"});
[ { A: 'S', B: 'h', C: 'e', D: 'e', E: 't', F: 'J', G: 'S' },
  { A: '1', B: '2', C: '3', D: '4', E: '5', F: '6', G: '7' },
  { A: '2', B: '3', C: '4', D: '5', E: '6', F: '7', G: '8' } ]

> XLSX.utils.sheet_to_json(ws, {header:["A","E","I","O","U","6","9"]});
[ { '6': 'J', '9': 'S', A: 'S', E: 'h', I: 'e', O: 'e', U: 't' },
  { '6': '6', '9': '7', A: '1', E: '2', I: '3', O: '4', U: '5' },
  { '6': '7', '9': '8', A: '2', E: '3', I: '4', O: '5', U: '6' } ]

> XLSX.utils.sheet_to_json(ws, {header:1});
[ [ 'S', 'h', 'e', 'e', 't', 'J', 'S' ],
  [ '1', '2', '3', '4', '5', '6', '7' ],
  [ '2', '3', '4', '5', '6', '7', '8' ] ]
```

Example showing the effect of `raw`:

```js
> ws['A2'].w = "3";                          // set A2 formatted string value

> XLSX.utils.sheet_to_json(ws, {header:1, raw:false});
[ [ 'S', 'h', 'e', 'e', 't', 'J', 'S' ],
  [ '3', '2', '3', '4', '5', '6', '7' ],     // <-- A2 uses the formatted string
  [ '2', '3', '4', '5', '6', '7', '8' ] ]

> XLSX.utils.sheet_to_json(ws, {header:1});
[ [ 'S', 'h', 'e', 'e', 't', 'J', 'S' ],
  [ 1, 2, 3, 4, 5, 6, 7 ],                   // <-- A2 uses the raw value
  [ 2, 3, 4, 5, 6, 7, 8 ] ]
```
</details>

https://docs.sheetjs.com/docs/api/utilities/#array-of-objects-input
