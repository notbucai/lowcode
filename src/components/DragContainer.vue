<template>
  <draggable
    :list="children"
    :group="group"
    :class="dragClassName"
    @click.native.stop.prevent="handleClickItem"
    :move="checkMove"
    :clone="handleClone"
    :data-tag="element"
  >
    <component
      :is="'bc-' + item.element"
      v-for="item in children"
      :key="item.id"
      v-bind="item.props"
    >
      <drag-container v-bind="item" />
    </component>
  </draggable>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import { State } from 'vuex-class'

import mixins from '@/mixins';
@Component({
  components: {
  },
  mixins: [mixins],
})
export default class DragLayout extends Vue {

  @State('current')
  current: any;

  @Prop({
    type: String
  })
  id?: string; // 元素名称 or 类型

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


  active: boolean = false;

  get dragClassName () {
    const list = ['drag-wrapper', 'drag-' + this.type];
    if (!this.draggableOptions.clone && this.current && this.current.id === this.id) {
      list.push('low-active');
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

  handleClone (item: any = {}) {
    if (!this.draggableOptions.group) {
      return item;
    }
    const cItem = {
      "id": (Math.random() * 10000000 | 0).toString(),
      ...item,
      children: item.type == 'container' ? JSON.parse(JSON.stringify(item.children || [])) : undefined
    };
    cItem.clone = undefined;
    return cItem;
  }

  handleClickItem () {
    // this.active = !this.active;
    // 推送id
    this.$store.commit('SET_CURRENT', {
      ...this.$props
    });
  }

}

</script>
<style lang="scss" scoped>
.low-active {
  border-style: solid !important;
}
.drag-wrapper {
  &::before {
    position: absolute;
    content: attr(data-tag);
    font-size: 12px;
    left: 0;
    top: 0;
    transform: translate(20%, 0%);
    color: #98d2ff;
  }
}
.drag-container {
  min-height: 30px;
  position: relative;
  padding: 5px;
  border: 1px dashed;
  border-color: #cde9ff;
  margin: 5px;
  overflow: hidden;
}
</style>