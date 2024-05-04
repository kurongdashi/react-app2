module.exports = {
  type: 'object', // 配置项类型为对象
  properties: {
    // 配置项属性
    user: {
      type: 'string'
    }
  },
  // 是否允许追加其他属性
  additionalProperties: false
};
