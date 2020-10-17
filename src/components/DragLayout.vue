<template>
  <div class="drag-layout">
    <transition-group name="list">
      <drag-container v-for="(item) in elements.children" v-bind="item" :key="item.id" />
    </transition-group>
  </div>
</template>
<script lang='ts'>
import DragContainer from './DragContainer.vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { bus } from './model/dragBus';
import { findByCallback } from '../utils'
@Component({
  components: {
    'drag-container': DragContainer
  }
})
export default class DragLayout extends Vue {

  @Prop({
    type: Object
  })
  elements: object;

  currentId: string;

  created () {
    console.log('this.elements', this.elements);
    bus.$on('start', e => {
      console.log('e start', e);
      if (this.currentId) return;
      this.currentId = e;
    });
    bus.$on('change', e => {
      // console.log('e change', e);
      // TODO: 这里需要优化
      const elements = JSON.parse(JSON.stringify(this.elements));

      if (e === this.currentId) return;
      const startElementLocation = findByCallback({ elements }, 'elements', (current: any, key: string, value: any) => {
        return key == 'id' && value == this.currentId;
      });
      if (!startElementLocation || startElementLocation.length != 2) return;

      const currentElementLocation = findByCallback({ elements }, 'elements', (current: any, key: string, value: any) => {
        return key == 'id' && value == e;
      });
      if (!currentElementLocation || currentElementLocation.length != 2) return;

      console.log('startElementLocation', startElementLocation);
      console.log('currentElementLocation', currentElementLocation);

      const [startRoot, startKey] = startElementLocation;
      const [currentRoot, currentKey] = currentElementLocation;

      const startElement = startRoot[startKey];
      const currentElement = currentRoot[currentKey];

      if (!startRoot || !currentRoot) return;
      if (startElement.id == currentElement.id) return;

      // const is1 = findByCallback({ elements: startElement }, 'elements', (current: any, key: string, value: any) => {
      //   return key == 'id' && value == currentElement.id;
      // });

      // const is2 = findByCallback({ elements: currentElement }, 'elements', (current: any, key: string, value: any) => {
      //   return key == 'id' && value == startElement.id;
      // });
      // NOTE: ---- 验证是否祖先元素 
      // if (is1 || is2) return;
      // const temp = startRoot[startKey];
      // startRoot[startKey] = currentRoot[currentKey];
      // currentRoot[currentKey] = temp;

      // this.$emit('update:elements', elements);
      // NOTE: 改为只能同父替换
      if (startRoot === currentRoot) {
        startRoot[startKey] = currentElement
        currentRoot[currentKey] = startElement;
        this.$emit('update:elements', elements);
      }


    });
    bus.$on('end', e => {
      console.log('e end', e);
      this.currentId = null;
    });
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