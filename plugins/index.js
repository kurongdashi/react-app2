/**
 * 实现webpack插件，需要执行apply()方法即可
 */
class MyWebpackPlugin {
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
    compiler.hooks.emit.tapAsync("MyWebpackPlugin", (compilation, callback) => {
      //   编译对象中有chunk：模块，assets：资源
      const { chunks, assets } = compilation;
      // chunks中可以查看所有的依赖
      chunks.forEach((chunk) => {
        for (const module of chunk.modulesIterable) {
          module.dependencies.forEach((dependency) => {
            // console.log("依赖的模块有：", dependency);
          });
        }
      });
      //  生成manifest文件：修改assets对象可以输出对应资源,需要实现source(),size()两个方法
      const manifesh = {};
      Object.keys(assets).forEach((key) => {
        manifesh[key] = assets[key].size();
      });
      assets["manifest.json"] = {
        // 文件内容
        source() {
          return JSON.stringify(manifesh);
        },
        // 文件size
        size() {
          return this.source().length;
        },
      };
      // 完成钩子任务回调
      callback();
    });
  }
}
module.exports = MyWebpackPlugin;
