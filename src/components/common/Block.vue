<template>
  <div class="block" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['padding', 'margin'],
  computed: {
    styles () {
      return {
        padding: this.padding,
        margin: this.margin,
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.block {
  display: block;
  margin-bottom: 10px;
  overflow: hidden;
}
</style>