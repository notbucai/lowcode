<template>
  <div id="app">
    <el-container class="layout">
      <el-header height="50px">
        <div class="layout-header">
          <img src="@/assets/images/logo.png" alt />
          <p>LowCode</p>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <low-aside />
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
import Aside from '@/components/aside/Index.vue';
import { Component, Vue } from 'vue-property-decorator';
import mixins from '@/mixins';
import { State } from 'vuex-class';

@Component({
  components: {
    'drag-layout': DragLayout,
    'low-aside': Aside
  },
  mixins: [mixins],
})
export default class App extends Vue {
  isMove: boolean = false;
  currentId: string | number | null = null;
  @State('elements')
  elements: any;
}
</script>

<style lang="scss">
$layout-bgc: #ffffff;
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
      border-bottom: 1px solid #f0f0f0;
      box-shadow: 0 0 6px #f0f0f0;
      position: relative;
      z-index: 10;
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
      color: #333;
      height: 100%;

      img {
        /* filter: invert(1); */
        width: 38px;
      }
      p {
        margin-left: 12px;
        font-weight: bold;
        font-size: 16px;
        color: #212121;
      }
    }
  }
}
* {
  padding: 0;
  margin: 0;
}
</style>
