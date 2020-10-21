<template>
  <div class="low-aside">
    <el-collapse v-show="!current">
      <el-collapse-item
        :title="item.name"
        :name="item.name"
        v-for="item in elements"
        :key="item.name"
      >
        <div class="low-component-item">
          <drag-container v-bind="item" />
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- 配置页 -->
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Provide } from 'vue-property-decorator';
import { State } from 'vuex-class';
@Component({
  name: 'low-aside',
})
export default class LowAside extends Vue {

  @State('current')
  current: any;

  @Provide('draggableOptions')
  draggableOptions = {
    clone: true,
    group: {
      name: 'container',
      pull: 'clone',
      put: false,
      disabled: true,
    }
  }

  elements = [
    {
      type: 'layout',
      element: 'layout',
      name: "功能",
      children: [
        {
          "element": "input",
          "type": "element",
          "name": "输入框组件",
          "clone": true,
        },
        {
          "element": "button",
          "type": "element",
          "name": "按钮组件",
          "clone": true,
          "props": {
            "text": '按钮名称'
          }, // 参数
        },
      ]
    },
    {
      type: 'layout',
      element: 'layout',
      name: "容器",
      children: [
        {
          "element": "row", // 元素名称 or 类型
          "type": "container", // container or element
          "clone": true,
        },
        {
          "element": "col", // 元素名称 or 类型
          "type": "container", // container or element
          "clone": true,

          props: {
            span: 6
          }
        },
      ]
    },
  ]
}
</script>
<style lang="scss" scoped>
.low-aside {
  .low-component-item {
    position: relative;
    padding: 18px 10px;
  }
  ::v-deep {
    .el-collapse-item__header {
      height: auto;
      line-height: 2.4;
      padding: 0 10px;
    }
  }
}
</style>