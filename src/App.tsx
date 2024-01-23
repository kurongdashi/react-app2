// 引入环境变量
import './public-path';
import React, { Suspense } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import styles from './App.less';
import { runAfterFirstMounted } from 'qiankun';
// 可合并reducer
// const reduceMerge=combineReducers(reducer);
// 使用applyMiddleware 中间件，可以支持action 返回一个方法
// 做 provider 层

const App = props => {
  const clickBtn = () => {
    // 子应用修改state
    console.log('-子应用修改state-');
    props.setGlobalState({
      account: '张三丰',
      email: '1362388@qq.com'
    });
  };
  return (
    // antd 配置
    <div>
      <div className={styles.bg}>112</div>
      <div>
        这里是一个组件子应用，主应用在某个页面动态加载我,
        <div>
          1、通过mount(props)函数获得主应用初始化传递的参数，user:{props.user}
          ,age:
          {props.age}，name:{props.name}
          <div>
            2、 state相关参数：account:{props.account},email:{props.email}
          </div>
        </div>
      </div>
      <button onClick={clickBtn}>点击向主应用发送信息</button>
    </div>
  );
};
const render = (props?: any) => {
  debugger;
  const root = createRoot(
    props.container
      ? props.container.querySelector('#root')
      : document.getElementById('root')
  );
  root.render(<App {...props} />);
};
// 非乾坤还是走原来的逻辑
console.log(
  '(window as any).__POWERED_BY_QIANKUN__',
  (window as any).__POWERED_BY_QIANKUN__
);
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app2 bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  console.log('react app2 mount', props);
  // 主应用更新state后，子应用在mount回调中调用onGlobalStateChange()
  props.onGlobalStateChange((state, prev) => {
    console.log('子应用2监听state', state, prev);
    render({ ...props, ...state });
  });
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
  console.log('react app2 unmount');
  const root = createRoot(
    props.container
      ? props.container.querySelector('#root')
      : document.getElementById('root')
  );
  root.unmount();
}
// 主应用手动更新时调用子应的update
export async function update(props: any) {
  console.log('react app2 update', props);
  render(props);
}
// 首个子应用加载后，可执行回调
runAfterFirstMounted(() => {
  console.log('第二个子应用启动了~');
});
