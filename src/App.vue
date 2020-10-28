<template>
  <div id="app">
    <el-container class="layout">
      <el-header height="50px">
        <div class="layout-header">
          <img src="@/assets/images/logo.png" alt />
          <p>LowCode</p>
          <div class="tools-bar">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-document"
              plain
              circle
              @click="handleShowCodeData"
            ></el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-view"
              plain
              circle
              @click="show = !show"
            ></el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="260px">
          <low-aside />
        </el-aside>
        <el-main>
          <div class="layout-main">
            <drag-layout v-model="elements" :show="show" />
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="代码"
      :visible.sync="showCode"
      width="680px"
      @close="showCode = false"
    >
      <textarea style="width: 100%" rows="20" :value="code" disabled></textarea>
      <span slot="footer">
        <el-button size="mini" @click="showCode = false">Cancel</el-button>
        <el-button type="primary" size="mini" v-clipboard="code"
          >Copy</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import DragLayout from './components/DragLayout.vue'
import Aside from '@/components/aside/Index.vue';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import { Component, Vue, Watch } from 'vue-property-decorator';
import mixins from '@/mixins';
import { State } from 'vuex-class';
import { LowElement } from './types/Element';
import Clipboard from 'v-clipboard'
import tinykeys from 'tinykeys';

Vue.use(Clipboard);

@Component({
  components: {
    'drag-layout': DragLayout,
    'low-aside': Aside
  },
  mixins: [mixins],

})
export default class App extends Vue {

  private created () {
    this.$store.commit('UPDATE');
    tinykeys(window, {
      "$mod+z": () => {
        this.$store.commit('UNDO');
      },
      "$mod+Shift+z": () => {
        // 反撤回
        this.$store.commit('REDO');
      },
    })
  }

  isMove: boolean = false;
  currentId: string | number | null = null;
  // @State('elements')
  // elements: any;

  // @Watch('$store')
  // elementsWatch(){
  //   console.log(1);
  // }

  get elements () {
    return this.$store.state.elements;
  }
  set elements (val) {
    console.log(1);
  }


  show: boolean = false;

  code: string = '';

  showCode: boolean = false;

  handleShowCodeData () {
    function generate (item: LowElement) {
      const props = item.props || {};
      const tagName = `bc-${item.element}`;

      let children: string = (item.children || []).map(item => {
        return generate(item);
      }).join('\n');

      if (children) {
        children = '\n' + children + '\n';
      }
      const atter = Object.keys(props).filter(key => props[key]).reduce((pv: string, key: string) => {

        const value = JSON.stringify(props[key]);

        pv += ` :${key}='${value}'`

        return pv;
      }, '');
      const element = `<${tagName} ${atter}>${children}</${tagName}>`;

      return element;
    }
    const code = prettier.format(generate(this.$store.state.elements), {
      parser: "html",
      plugins: [parserHtml],
    });

    this.code = code;
    this.showCode = true;

  }

  // handle

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
      .tools-bar {
        display: flex;
        align-items: center;
        padding-left: 20px;
      }
    }
  }
}
* {
  padding: 0;
  margin: 0;
}
</style>
