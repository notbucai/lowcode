<template>
  <draggable
    :list="children"
    :group="type"
    :class="dragClassName"
    @click.native.stop.prevent="handleClickItem"
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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class DragLayout extends Vue {
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

  active: boolean = false;

  get dragClassName () {
    const list = ['drag-' + this.type];
    if (this.active) {
      list.push('active');
    }
    return list.join(' ');
  }

  handleClickItem () {
    this.active = !this.active;
  }

}

</script>
<style lang="scss" scoped>
.drag-container {
  min-height: 30px;
  overflow: hidden;
  position: relative;

  border: 1px solid transparent;
  border-color: rgb(87, 166, 255);
  &:hover {
  }
}
</style>