
## If webpack version >= 5 go to use [excels-loader](https://www.npmjs.com/package/excels-loader)

<h2 align="center">Install</h2>

```bash
npm install --save-dev xls-loader
```

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
            {
                test: /\.xls.?$/,
                use: {
                    loader: 'xls-loader'
                }
            }
        ]
    }
}
```

<h2 align="center">Options</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`sheet`](#sheet)**|`{Number, String}`|`undefined`|a single sheet to json object|
