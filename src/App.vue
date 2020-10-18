<template>
  <div id="app">
    <el-container class="layout">
      <el-header>
        <div class="layout-header">
          <img src="@/assets/images/logo.png" alt />
          <p>LowCode Pc Admin</p>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <draggable
            :list="elementList"
            :group="{ name: 'container', pull: 'clone', put: false }"
            :clone="handleClone"
          >
            <component
              :is="'bc-' + item.element"
              size="mini"
              v-for="item in elementList"
              :key="item.element"
              v-bind="item.props"
              >{{ item.name }}</component
            >
          </draggable>
        </el-aside>
        <el-main>
          <div class="layout-main">
            <drag-layout :elements.sync="elements" />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import DragLayout from './components/DragLayout.vue'
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    'drag-layout': DragLayout
  },
})
export default class App extends Vue {
  isMove: boolean = false;
  currentId: string | number | null = null;
  elementList = [
    {
      "element": "input",
      "type": "element",
      "name": "输入框组件"
    },
    {
      "element": "button",
      "type": "element",
      "name": "按钮组件",
      "props": {
        "text": '按钮名称'
      }, // 参数
    },
  ];
  elements = {
    "id": "c6174605-fb74-4fcb-884e-1a52926d55f3",
    "element": "layout", // 元素名称 or 类型
    "type": "container", // container or element
    "children": [
      {
        "id": "373d53af-f167-4a35-82b0-ae37bcaae5de",
        "element": "row", // 元素名称 or 类型
        "type": "container", // container or element
        "props": {}, // 参数
        "children": [
          {
            "id": "69c270c5-1141-4eec-b40e-c82c5991df15",
            "element": "col", // 元素名称 or 类型
            "type": "container", // container or element
            "props": {
              "span": 8
            }, // 参数
            "children": [
              {
                "id": "6b49f4c3-8537-4bd4-b666-69d962c1b08c",
                "element": "input", // 元素名称 or 类型
                "type": "element", // container or element
                "props": {}, // 参数
              },
              {
                "id": "6b49f4c3-8537-4bd4-b666-69d962c12081",
                "element": "button", // 元素名称 or 类型
                "type": "element", // container or element
                "props": {
                  "text": '按钮1'
                }, // 参数
              },
            ]
          },
          {
            "id": "6061a216-4033-404b-95a8-51620e4cf9a3",
            "element": "col", // 元素名称 or 类型
            "type": "container", // container or element
            "props": {
              "offset": 4,
              "span": 12
            }, // 参数
            "children": [
              {
                "id": "82943eee-fd76-45e5-bc19-6869847221bb",
                "element": "button", // 元素名称 or 类型
                "type": "element", // container or element
                "props": {
                  "text": '按钮'
                }, // 参数
              }
            ]
          }
        ]
      }
    ]
  }
  handleClone (item = {}) {
    return {
      "id": (Math.random() * 10000000 | 0).toString(),
      ...item
    }
  }
}
</script>

<style lang="scss">
$layout-bgc: #212121;
#app {
  .move-test {
    cursor: pointer;
    user-select: none;
    padding: 10px;
    &:hover {
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
  .layout {
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    .el-header {
      background-color: $layout-bgc;
    }
    .el-aside {
      /* color: #fff; */
      background-color: #fafafa;
      border-right: 1px solid #f0f0f0;
      box-shadow: 0 6px 5px rgba($color: #888, $alpha: 0.1);
    }
    .layout-main {
      position: relative;
    }
    .layout-header {
      display: flex;
      align-items: center;
      color: #fff;
      height: 100%;

      img {
        filter: invert(1);
        width: 42px;
      }
      p {
        margin-left: 12px;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
}
* {
  padding: 0;
  margin: 0;
}
</style>
