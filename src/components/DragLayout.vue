<template>
  <div class="drag-layout">
    <drag-container v-bind="elements" style="min-height:600px"/>
  </div>
</template>
<script lang='ts'>
import DragContainer from './DragContainer.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({
  components: {
    'drag-container': DragContainer
  }
})
export default class DragLayout extends Vue {

  @Prop({
    type: Object
  })
  elements?: object;

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