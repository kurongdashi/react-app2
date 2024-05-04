// 引入环境变量
import React, { Suspense, lazy } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import styles from './App.less';
import img from './result.png';
import img2 from './img2.jpg';
const MyButton = React.lazy(() => import('app1Module/MyButton'));
// import { runAfterFirstMounted } from 'qiankun';
// 可合并reducer
// const reduceMerge=combineReducers(reducer);
// 使用applyMiddleware 中间件，可以支持action 返回一个方法
// 做 provider 层

const App = () => {
  return (
    // antd 配置
    <div>
      app2 的页面
      <img src={img} width={200} />
      <img src={img2} width={200} />
      <MyButton />
    </div>
  );
};
export default App;
