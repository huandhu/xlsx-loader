这是一个 webpack loader 库, 用于将 excel 文件转换为 json 对象

<h2 align="center">安装</h2>

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

<h2 align="center">配置</h2>

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**[`ReadOptions`](#ReadOptions)**|`{Object}`|`undefined`|读取文件配置选项|
|**[`parseOptions`](#parseOptions)**|`{Object、Array}`|`undefined`|解析json配置选项|

### ReadOptions
- 配置: https://github.com/SheetJS/sheetjs#parsing-options

### parseOptions
- afterParseCallback: 提供解析完sheet 为 json后的回调，参数为解析后的json数据，可在此处编辑返回的json结果
- 其他配置项: https://github.com/SheetJS/sheetjs#json
