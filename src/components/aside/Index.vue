<template>
  <div class="low-aside">
    <el-collapse v-show="!current">
      <el-collapse-item
        :title="item.label"
        :name="item.label"
        v-for="item in elements"
        :key="item.label"
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
      label: "功能",
      disabled: true,
      children: [
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "input",
              "type": "element",
              "name": "输入框组件",
              "clone": true,
              "props": {}
            },
          ]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "button",
              "type": "element",
              "name": "按钮组件",
              "clone": true,
              "props": {
                "text": '按钮名称'
              }, // 参数
            }
          ]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "text",
              "type": "element",
              "name": "文字组件",
              "clone": true,
              "props": {
                "text": '文字组件'
              }, // 参数
            },
          ]
        },
      ]
    },
    {
      type: 'layout',
      element: 'layout',
      label: "容器",
      disabled: true,
      children: [
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              name: "行",
              "element": "row", // 元素名称 or 类型
              "type": "container", // container or element
              "clone": true,
              disabled: true,
              children: [
                {
                  "element": "col", // 元素名称 or 类型
                  "type": "container", // container or element
                  "clone": true,
                  name: "列",

                  props: {
                    span: 12
                  }
                }, {
                  "element": "col", // 元素名称 or 类型
                  "type": "container", // container or element
                  "clone": true,
                  name: "列",

                  props: {
                    span: 12
                  }
                },
              ]
            },
          ]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "col", // 元素名称 or 类型
              "type": "container", // container or element
              "clone": true,
              name: "列",

              props: {
                span: 6
              }
            },
          ]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              name: "表单",
              "element": "form", // 元素名称 or 类型
              "type": "container", // container or element
              "clone": true,
              disabled: true,
              props: {
                size: 'mini'
              },
              children: [
                {
                  "element": "form-item", // 元素名称 or 类型
                  "type": "container", // container or element
                  disabled: true,
                  props: {
                    label: "标签"
                  },
                  children: [
                    {
                      disabled: true,
                      "element": "input", // 元素名称 or 类型
                      "type": "element", // container or element
                      props: {
                      },
                    },
                  ]
                },
                {
                  "element": "form-item", // 元素名称 or 类型
                  "type": "container", // container or element
                  disabled: true,
                  props: {
                    label: "标签"
                  },
                  children: [
                    {
                      disabled: true,
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

        {

          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "table", // 元素名称 or 类型
              "type": "container", // container or element
              "clone": true,
              disabled: true,
              props: {
                columns: [
                  {
                    id: "id",
                    label: "编号"
                  },
                  {
                    id: "name",
                    label: "名称"
                  }
                ]
              },
              children: [
                {
                  "element": "button", // 元素名称 or 类型
                  "type": "element", // container or element
                  disabled: true,
                  props: {
                    type: "text",
                    size: 'mini',
                    text: '查看'
                  },
                },
              ]
            },
          ]
        }

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
    display: block;
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