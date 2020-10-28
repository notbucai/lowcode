<template>
  <draggable
    :list="children"
    :group="group"
    :class="dragClassName"
    :move="checkMove"
    :clone="handleClone"
    :disabled="disabled"
    :sort="sort"
    :data-tag="element"
    :data-name="name"
    :data-path="currentPath"
    @change="emitter"
  >
    <component
      v-for="item in children"
      :key="item.id"
      v-bind="item.props"
      :is="'bc-' + item.element"
      :data-tag="item.element"
      @click.native.stop.prevent="handleClickItem(item)"
    >
      <drag-container
        v-bind="item"
        :path="currentPath"
        :show="show"
        @input="emitter"
      />
    </component>
  </draggable>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import { State } from 'vuex-class'

import mixins from '@/mixins';
import { LowDrapElement, LowElement } from '@/types/Element';
import { generateUUID } from '@/utils';
@Component({
  components: {
  },
  mixins: [mixins],
})
export default class DragLayout extends Vue {

  @State('currentId')
  current?: string;

  @Prop({
    type: Boolean,
    default: false
  })
  show?: boolean;

  @Prop({
    type: String,
    default: ''
  })
  path?: string;

  @Prop({
    type: Boolean
  })
  disabled?: boolean;

  @Prop({
    type: String
  })
  id?: string; // 元素名称 or 类型

  @Prop({
    type: String,
  })
  name?: string; // 名称

  @Prop({
    type: String,
  })
  element?: string; // 元素名称 or 类型
  @Prop({
    type: String,
  })
  type!: 'container' | 'element'; // container or element
  @Prop({
    type: Object,
  })
  props: any; // 参数
  @Prop({
    type: Array
  })
  children!: any[];


  @Inject({
    from: 'draggableOptions',
    default: {}
  })
  // @Provide('draggableOptions')
  draggableOptions: any;

  get currentDisabled () {
    const draggableOptions = this.draggableOptions;
    let res = draggableOptions && draggableOptions.clone;

    return res;
  }
  get sort () {
    const draggableOptions = this.draggableOptions;
    let res = !draggableOptions || !draggableOptions.clone;
    // 用于固定
    if (res && this.current) {
      res = this.current === this.id;
    }

    return res;
  }

  get currentPath () {
    return [this.path, this.element].filter(item => item).join('_');
  }

  get dragClassName () {
    const list = ['drag-wrapper', 'drag-' + this.type];
    if (!this.draggableOptions.clone && this.current === this.id) {
      list.push('low-active');
    }
    if (this.show) {
      list.push('show')
    }
    return list.join(' ');
  }

  get group () {
    let group = this.type;
    if (this.draggableOptions.group) {
      group = Object.assign({}, this.draggableOptions.group);
    }
    return group;
  }

  emitter (value: LowDrapElement) {
    this.$emit("input", value);
  }

  handleCloneTree (oldElement: LowDrapElement) {
    const element = Object.assign({}, oldElement);
    delete element.clone;
    delete element.disabled;

    element.id = generateUUID();
    if (element.type === 'container') {
      element.children = (element.children || []).map<LowDrapElement>((item: LowDrapElement) => {
        return this.handleCloneTree(item);
      });
    }
    return element;
  }
  handleClone (item: any = {}) {
    if (!this.draggableOptions.group) {
      return item;
    }

    return this.handleCloneTree(item);
  }

  handleClickItem (element: LowElement) {
    // this.active = !this.active;
    // 推送id
    if (!this.draggableOptions.clone) {
      this.$store.commit('SET_CURRENT', element.id);
    }
  }

}

</script>
<style lang="scss" scoped>
.low-active {
  border-style: solid !important;
  border-width: 2px !important;
  border-color: #009688 !important;
}
.drag-wrapper {
  position: relative;
  &::before {
    position: absolute;
    content: attr(data-name);
    font-size: 12px;
    left: 0;
    top: 0;
    transform: translate(20%, 0%);
    color: #98d2ff;
  }
}
.drag-container {
  min-height: 30px;
  padding: 5px;
  border: 1px dashed;
  border-color: #cde9ff;
  margin: 5px;
  overflow: hidden;
  transition: border 50ms;

  &.show {
    padding: 0;
    margin: 0;
    border: 0;
    overflow: visible;
    min-height: 0;
    &::before {
      display: none;
    }
  }
}
</style>