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
    <div v-if="current">
      <component
        :is="'bc-' + current.element + '-option'"
        :element="current"
      ></component>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { LowElement } from '@/types/Element';
@Component({
  name: 'low-aside',
})
export default class LowAside extends Vue {

  @State('currentId')
  currentId?: string;

  @Getter('current')
  current?: LowElement;

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
          "props": {}
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
        {
          "element": "form", // 元素名称 or 类型
          "type": "container", // container or element
          "clone": true,
          props: {
            size: 'mini'
          },
          children: [
            {
              "element": "form-item", // 元素名称 or 类型
              "type": "container", // container or element
              props: {
                label: "测试"
              },
              children: [
                {
                  "element": "input", // 元素名称 or 类型
                  "type": "element", // container or element
                  props: {
                  },
                },
              ]
            },
          ]
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