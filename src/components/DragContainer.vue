<template>
  <component
    :is="'bc-'+element"
    v-bind="props"
    class="drag-container"
    draggable="true"
    @dragstart.native.stop="handleDragStart"
    @dragenter.native.stop.prevent="handleDragEnter"
    @dragend.native="handleDragEnd"
  >
    <drag-container v-for="(item) in children" :key="item.id" v-bind="item" />
  </component>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { bus } from './model/dragBus';

@Component({
  components: {
  }
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

  handleDragStart (e) {
    console.log(e);
    bus.$emit('start', this.id);
  }
  handleDragEnter (e) {
    console.log(e);
    bus.$emit('change', this.id);
  }
  handleDragEnd (e) {
    console.log(e);
    bus.$emit('end', this.id);
  }
}

</script>
<style lang="scss" scoped>
.drag-container {
  /* border: 1px solid #ccc; */
  /* padding: 10px; */
  /* margin: 10px; */
}
</style>