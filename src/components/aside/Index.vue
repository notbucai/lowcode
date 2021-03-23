<template>
  <div class="low-aside">
    <div class="aside-action">
      <div
        class="action-item"
        :class="{ active: activeAction === 'components' }"
        @click="activeAction = 'components'"
      >
        <span class="el-icon-s-grid"></span>
      </div>
      <div
        class="action-item"
        @click="activeAction = 'models'"
        :class="{ active: activeAction === 'models' }"
      >
        <span class="el-icon-s-data"></span>
      </div>
      <div
        class="action-item"
        @click="activeAction = 'actions'"
        :class="{ active: activeAction === 'actions' }"
      >
        <span class="el-icon-video-play"></span>
      </div>
    </div>
    <!-- 组件相关 -->
    <div class="aside-handle" v-if="activeAction == 'components'">
      <el-scrollbar class="aside-scrollbar">
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
      </el-scrollbar>
    </div>
    <!-- 数据源相关 -->
    <div class="aside-handle" v-if="activeAction == 'models'">
      <el-scrollbar class="aside-scrollbar">
        <el-collapse v-show="!current">
          <el-collapse-item
            :title="item.name"
            :name="item.name"
            v-for="item in models"
            :key="item.key"
          >
            <div
              class="low-model-item"
              v-for="entity in item.entitys"
              :key="entity.key"
            >
              <pre
                style="font-size: 12px; line-height: 1.4; padding: 4px 10px"
                >{{ JSON.stringify(entity, null, 2) }}</pre
              >
            </div>
          </el-collapse-item>
        </el-collapse>
        <!-- 配置页 -->
        <div v-if="current">
          <!-- <component
            :is="'bc-' + current.element + '-model'"
            :element="current"
          ></component> -->
          <low-model />
        </div>
      </el-scrollbar>
    </div>
    <!-- 数据源相关 -->
    <div class="aside-handle" v-if="activeAction == 'actions'">
      <el-scrollbar class="aside-scrollbar">
        <low-actions />
      </el-scrollbar>
    </div>
  </div>
</template>
<script lang='ts'>
import LowModel from '@/components/models/Index.vue'
import LowActions from '@/components/actions/Index.vue'
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { LowElement } from '@/types/Element';
import { ModelType } from '@/store/modules/Page';
@Component({
  name: 'low-aside',
  components: {
    LowModel,
    LowActions
  }
})
export default class LowAside extends Vue {

  activeAction: 'components' | 'models' = 'components';

  @State('models', { namespace: 'page' })
  models?: ModelType[];

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
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "tag",
              "type": "element",
              "name": "标签",
              "clone": true,
              "props": {
                "text": '标签一'
              }, // 参数
            },
          ]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "progress",
              "type": "element",
              "name": "进度条",
              "clone": true,
              "props": {
                percentage: 43
              }, // 参数
            },
          ]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "pagination",
              "type": "element",
              "name": "分页",
              "clone": true,
              "props": {
                total: 100
              }, // 参数
            },
          ]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "alert",
              "type": "element",
              "name": "警告",
              "clone": true,
              "props": {
                title: "提示的文案"
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
        }, {
          element: 'block',
          type: 'contailner',
          children: [
            {
              "element": "block", // 元素名称 or 类型
              "type": "container", // container or element
              "clone": true,
              name: "块元素",

              props: {}
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
                    label: "表单项"
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
                    label: "表单项"
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
    {
      type: 'layout',
      element: 'layout',
      label: "表单",
      disabled: true,
      children: [
        {
          element: 'block',
          type: 'contailner',
          disabled: true,
          children: [
            {
              "element": "form", // 元素名称 or 类型
              "type": "container", // container or element
              "clone": true,
              // disabled: true,
              props: {
                size: 'mini'
              },
              children: [
                {
                  "element": "form-item", // 元素名称 or 类型
                  "type": "container", // container or element
                  disabled: true,
                  props: {
                    label: "表单项"
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
              "element": "radio",
              "type": "element",
              "name": "单选框",
              "clone": true,
              "props": {
                options: [
                  {
                    label: "备选项1",
                    value: "1",
                  },
                  {
                    label: "备选项2",
                    value: "2",
                  }
                ]
              }, // 参数
            },

          ]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [{
            "element": "checkbox",
            "type": "element",
            "name": "多选框",
            "clone": true,
            "props": {
              options: [
                {
                  label: "备选项1",
                  value: "12",
                },
                {
                  label: "备选项2",
                  value: "23",
                }
              ]
            }, // 参数
          }]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [{
            "element": "select",
            "type": "element",
            "name": "多选框",
            "clone": true,
            "props": {
              options: [
                {
                  label: "备选项1",
                  value: "12",
                },
                {
                  label: "备选项2",
                  value: "23",
                }
              ]
            }, // 参数
          },]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [{
            "element": "switch",
            "type": "element",
            "name": "开关",
            "clone": true,
            "props": {}, // 参数
          }]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [{
            "element": "slider",
            "type": "element",
            "name": "滑块",
            "clone": true,
            "props": {}, // 参数
          }]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [{
            "element": "time-picker",
            "type": "element",
            "name": "时间选择器",
            "clone": true,
            "props": {}, // 参数
          }]
        },
        {
          element: 'block',
          type: 'contailner',
          children: [{
            "element": "date-picker",
            "type": "element",
            "name": "日期选择器",
            "clone": true,
            "props": {}, // 参数
          }]
        }
      ]
    }
  ]
}
</script>
<style lang="scss" scoped>
.low-aside {
  height: calc(100vh - 50px);
  display: flex;
  .aside-action {
    width: 46px;
    min-width: 46px;
    position: relative;
    z-index: 1;
    background-color: #fff;
    border-right: 1px solid #eee;
    box-shadow: 0px 0 8px rgba($color: #888, $alpha: 0.2);
    .action-item {
      width: 46px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(97, 92, 92);
      cursor: pointer;
      user-select: none;
      &.active {
        color: #2196f3;
        background-color: #ecf5ff;
      }
      span {
        font-size: 20px;
      }
    }
  }
  .aside-handle {
    flex: 1;
    overflow: hidden;
  }
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
  .aside-scrollbar {
    overflow-y: hidden;
    height: 100%;
  }
}
</style>