# webpack

## 执行过程

- 读取 shell命令参数+配置参数-> 创建 compiler对象（全局唯一） ->执行run()->make()->创建compliation（每种资源对应一个）对象,初始化插件对象
- compliation 执行loader 处理资源
- 回调插件hook
- emit输出准备
- 输出资源

## loader 执行顺序及使用方式

- pre
- normal
- inline
- post

```js
// 1、指定loader的执行顺序
{
  enforce:'pre',//指定loader的执行顺序
  test: /\.(svg|png|gif|jpe?g)$/,
  loader: './loader/file-loader.js'
}
//2、inline loader 通过! 分割，！前面是loader，后面时要处理的资源
import img from './loader/file-loader.js!./src/img2.jpg'
// ！在最前面，跳过normal loader
'!./loader/file-loader.js'
// -！跳过pre normal loader
'-!./loader/file-loader.js'
// !! 跳过其他只执行inline loader
'!!./loader/file-loader.js'

```

## normal loader的实现方式

- 同步loader `this.callback()`
- 异步loader `const callback=this.async()`
- inline loader `import img from ./loader/file-loader.js!./src/img2.jpg` 通过! 分割，！前面是loader，后面时要处理的资源
- pitch 预执行函数 执行loader前 `pitch1->pitch2->pitch3->loader1-> loader2->loader3`,pitch中有`return`则直接跳过后续loader，只执行自己对应的loader
- API

```js
this.getOptions(scheme);
// 输出文件
this.emitFile(name, content);
// 根据绝对路径返回当前相对路径
this.utils.contextify(context, absolutePath);
// 根据相对路径返回绝对路径
this.utils.absoluteify(context, absolutePath);

module.export.pitch = function (remainingRequest) {
  // remainingRequest=  ../node_module/loader/dist/xxx!xxx..
};
```

| 姓名 | 年龄 | 地址 |
| ---- | ---- | ---- |
| 张三 | 20   | 深圳 |
| 李四 | 30   | 广州 |

## plugin

- 调试在package.json中 scripts 下新增debug命令

```js
 "scripts": {
    "debug": "node --inspect-brk ./node_modules/webpack-cli/bin/cli.js --config ./scripts/webpack.prod.js"
  },
```
