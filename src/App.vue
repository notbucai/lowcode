<template>
  <div id="app" v-if="!refresh">
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
              @click="handleChangeShow"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-refresh"
              plain
              circle
              @click="handleClearCanvas"
            ></el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="280px">
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
      <el-tabs>
        <el-tab-pane label="CODE">
          <textarea
            style="width: 100%; box-sizing: border-box; padding: 10px"
            rows="20"
            :value="code"
            disabled
          ></textarea>
        </el-tab-pane>
        <el-tab-pane label="JSON">
          <textarea
            style="width: 100%; box-sizing: border-box; padding: 10px"
            rows="20"
            :value="JSON.stringify(elements, null, 2)"
            disabled
          ></textarea>
        </el-tab-pane>
      </el-tabs>

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
    this.$store.commit('page/UPDATE');
    this.$store.dispatch('page/init');
    // localStorage.removeItem('preview');
    //
    tinykeys(window, {
      "$mod+z": () => {
        this.$store.commit('page/UNDO');
      },
      "$mod+Shift+z": () => {
        // 反撤回
        this.$store.commit('page/REDO');
      },
      "$mod+d": event => {
        event.preventDefault()
        if (typeof this.$store.state.page.currentId === 'undefined') return;
        this.$store.commit("page/REMOVE_CURRENT");
        this.$store.commit("page/SET_CURRENT", undefined);
      }
    })
  }

  refresh: boolean = false;

  isMove: boolean = false;
  currentId: string | number | null = null;
  // @State('elements')
  // elements: any;

  // @Watch('$store')
  // elementsWatch(){
  //   console.log(1);
  // }

  get elements () {
    console.log('elements',this.$store.state.page);
    
    return this.$store.state.page.elements;
  }
  set elements (val) {
  }


  show: boolean = !!localStorage.getItem('preview');;

  code: string = '';

  showCode: boolean = false;

  handleChangeShow () {
    this.show = !this.show;
    if (this.show) {
      localStorage.setItem('preview', 'true');
      // 直接整体更新一下sotre 同时强制更新一下更新视图
      this.$store.dispatch("page/refresh")
      this.refresh = true;
      this.$nextTick(() => {
        this.refresh = false;
      })
    } else {
      localStorage.removeItem('preview');
    }
  }
  async handleClearCanvas () {
    await this.$confirm(`是否确认清除画布？`);
    await this.$store.dispatch('page/clear_canvas');
    this.$notify.success('清除成功');
  }
  handleShowCodeData () {
    function generate (item: LowElement) {
      const props = item.props || {};
      const tagName = `el-${item.element}`;

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
    const code = prettier.format(generate(this.$store.state.page.elements), {
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
