import { Button, message } from 'antd';
import React from 'react';
import css from './index.less';
export default function (props) {
  return (
    <div className={css.myBtn}>
      app2 的button
      <Button
        type="primary"
        className={css.cancel}
        onClick={() => message.info({ content: '这是APP2的按钮' })}
      >
        点击
      </Button>
    </div>
  );
}
