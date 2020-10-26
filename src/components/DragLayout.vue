<template>
  <div class="drag-layout">
    <drag-container v-bind="elements" style="min-height:600px" :show="show"/>
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

  @Prop({
    type: Boolean
  })
  show?:boolean;

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