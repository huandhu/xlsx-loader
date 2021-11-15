
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
|**[`ReadOptions`](#https://github.com/SheetJS/sheetjs#parsing-options)**|`{Object}`|`undefined`|读取文件配置选项|
|**[`parseOptions`](#sheet)**|`{Object、Array}`|`undefined`|解析json配置选项|
