/**
 * 自定义loader
 * @param {*} content 接受到的当前文件内容
 * @param {*} map sourceMap
 * @param {*} meta 其他参数
 */
const scheme = require('./scheme');
module.exports = function (content, map, meta) {
  // 异步loader：需要执行异步操作并且返回的时候使用，callback函数来源于async();
  //   const callback = this.async();
  const options = this.getOptions(scheme);
  const err = null;
  // 同步loader：直接使用this.callbakc()返回；将参数继续传递给下一个loader
  const prefix = `
  /*
  * @user:${options.user}
  */
  `;
  this.callback(err, prefix + content, map, meta);
};
// 可导出pitch方法，用于在loader 执行前执行
module.exports.pitch = function () {
  // console.log('pitch 1');
};
