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
        <el-aside width="200px">Aside</el-aside>
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
                "props": {}, // 参数
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
  handleDragStart (e, item) {
    if (this.isMove) return;
    this.isMove = true;
    this.currentId = item.id;
    console.log(e);
  }
  handleDragEnter (e, item) {
    console.log(e, item);
    // if (this.currentId == item.id) return;

    // const currentDragIndex = this.list.findIndex(_item => _item.id == this.currentId);
    // if (currentDragIndex < 0) return;

    // const currentEnterDragIndex = this.list.findIndex(_item => _item.id == item.id);
    // if (currentEnterDragIndex < 0) return;

    // const temp = this.list[currentDragIndex];

    // this.list[currentDragIndex] = this.list[currentEnterDragIndex];
    // this.list[currentEnterDragIndex] = temp;

    // this.list = [...this.list];
  }
  handleDragEnd (e) {
    console.log(e);
    this.currentId = null;
    this.isMove = false;

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
