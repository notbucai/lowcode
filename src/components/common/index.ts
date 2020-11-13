import Vue from 'vue';

export type ModelType = {
  key: string,
  name: string
};
export type ModelConfigType = {
  [key: string]: ModelType[]
};

export const modelConfig: ModelConfigType = {};

// 处理首字母大写 abc => Abc
function changeStr (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('.', false, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const config = requireComponent(fileName)
  // console.log('config:', config)  // 打印
  const componentName = changeStr(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')   // ./child1.vue => child1
  )
  const component = config.default || config;

  const models: ModelType[] = component.modelOptions;
  const element = componentName.replace(/([A-Z])/, (item) => {
    return item.toLowerCase()
  }).replace(/([A-Z])/g, (item) => {
    return '-' + item.toLowerCase()
  })
  // componentName
  modelConfig[element] = models;
  Vue.component('Bc' + componentName, component) // 动态注册该目录下的所有.vue文件
});

console.log('%c成功加载组件数量:' + requireComponent.keys().length, "color:#409EFF;background-color:#ecf5ff;padding:0 10px;line-height:2;margin-bottom:4px;");

// 在这里需要处理 一些东西