import Vue from 'vue';

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

  Vue.component('Bc' + componentName, config.default || config) // 动态注册该目录下的所有.vue文件
});

console.log('%c成功加载组件数量:'+requireComponent.keys().length,"color:#409EFF;background-color:#ecf5ff;padding:0 10px;line-height:2;margin-bottom:4px;");
