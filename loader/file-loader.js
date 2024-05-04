/**
 * 自定义loader
 * @param {*} content 接受到的当前文件内容
 * @param {*} map sourceMap
 * @param {*} meta 其他参数
 */
const loaderUtils = require('loader-utils');
module.exports = function (content, map, meta) {
  // 生成hash文件名称
  const interpolateName = loaderUtils.interpolateName(
    this,
    '[hash].[ext][query]',
    { content }
  );
  // 输出文件 参数1：名称 参数2：内容
  this.emitFile(interpolateName, content);
  // 返回文件地址的引用
  return `module.exports= "${interpolateName}"`;
};
// raw 表示接受buffer数据，上面的content将变成buffer数据
module.exports.raw = true;
