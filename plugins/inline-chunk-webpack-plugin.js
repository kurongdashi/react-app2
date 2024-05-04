/**
 * 实现 将小文件内联到index.html中减少文件请求数量
 */
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');
class MyWebpackPlugin {
  reg = /runtime~(.*)\.js$/;
  constructor(options = {}) {
    // 创建插件对象时传入参数
    this.options = options;
  }
  // compiler 为编译对象，有几种生命周期钩子可回调
  /**
   * compiler常用钩子hooks
   * entryOption：初始化入口
   * afterPlugin:初始化插件后
   * compile:创建compilation对象前
   * compilation：编译对象创建后
   * emit:输出资源前
   * afterEmit:输出资源后
   * done:结束
   */
  apply(compiler) {
    /**
     * 钩子触发有三种方法
     * tap()，同步触发
     * tapAsync():异步触发
     * tapPromise():异步promise的方式触发
     */
    debugger;
    const eventName = 'InlineChunkWebpackPlugin';
    compiler.hooks.compilation.tap(eventName, compilation => {
      //   编译对象中有chunk：模块，assets：资源
      // const { chunks, assets } = compilation;
      // 1、获取htmlwebpack 的 hooks
      const hooks = HtmlWebpackPlugin.getHooks(compilation);
      // 2、输出标签前
      hooks.alterAssetTagGroups.tap(eventName, assets => {
        /**
         * [
             {
                tagName: 'meta',
                voidTag: true,
                meta: { plugin: 'html-webpack-plugin' },
                attributes: {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1'
                }
              }
         * ]
         */
        console.log('===============', assets.headTags);
        console.log('===============', assets.bodyTags);
        assets.headTags = this.getInlineChunk(
          assets.headTags,
          compilation.assets
        );
        assets.bodyTags = this.getInlineChunk(
          assets.bodyTags,
          compilation.assets
        );
      });
      // 2、输出标签前
      hooks.afterEmit.tap(eventName, assets => {
        Object.keys(compilation.assets).forEach(key => {
          if (this.reg.test(key)) {
            Reflect.deleteProperty(compilation.assets, key);
          }
        });
      });
    });
  }
  getInlineChunk(tags, assets) {
    // 覆盖标签内容
    return tags.map(tag => {
      const attributes = tag.attributes || {};
      const path = attributes.src;
      const tagName = tag.tagName;
      if (this.reg.test(path) && tagName === 'script' && path) {
        return {
          tagName: 'script',
          innerHTML: assets[path].source(),
          closeTag: true
        };
      } else {
        return tag;
      }
    });
  }
}
module.exports = MyWebpackPlugin;
