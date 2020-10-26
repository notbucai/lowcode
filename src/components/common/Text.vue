<template>
  <span :style="style">{{ text }}</span>
</template>
<script>
export default {
  props: {
    text: String,
    fontSize: String,
    color: String,
    block: Boolean,
    center: Boolean
  },
  computed: {
    style () {
      const { fontSize, color, center, block } = this;
      return {
        'font-size': fontSize,
        'color': color,
        'text-align': center ? 'center' : '',
        'display': block ? 'block' : '',
      }
    }
  }
}
</script>
