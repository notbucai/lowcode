<template>
  <div class="drag-layout">
    <drag-container
      v-bind="value"
      style="min-height: 600px"
      :show="show"
      @input="changeElement"
    />
  </div>
</template>
<script lang='ts'>
import DragContainer from './DragContainer.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { LowDrapElement } from '@/types/Element';
@Component({
  components: {
    'drag-container': DragContainer
  }
})
export default class DragLayout extends Vue {

  @Prop({
    type: Object
  })
  value?: object;

  @Prop({
    type: Boolean
  })
  show?: boolean;

  changeElement (val: LowDrapElement) {
    this.$store.dispatch('page/save');
  }

  created () {
  }
}

</script>
<style lang="scss">
.drag-layout {
}

.list-move {
  transition: transform 0.1s;
}
</style>