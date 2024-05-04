/**
 * 自定义loader
 * @param {*} content 接受到的当前文件内容
 * @param {*} map sourceMap
 * @param {*} meta 其他参数
 */

module.exports = function (content, map, meta) {
  // 异步loader：需要执行异步操作并且返回的时候使用，callback函数来源于async();
  //   const callback = this.async();
  const err = null;
  //   console.log('map', map);
  //   console.log('meta', meta);
  console.log('loader 2');
  // 同步loader：直接使用this.callbakc()返回；将参数继续传递给下一个loader
  this.callback(err, content, map, meta);
};
/**
 * 1、可导出pitch方法，用于在loader 执行前执行
 * 2、如果pitch方法里有return，则只会执行其自身对应的loader了，其他loader将跳过不执行了
 */
module.exports.pitch = function () {
  // console.log('pitch 2');
};
