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
    center: Boolean,
    bold: Boolean,
    lineHeight: String
  },
  computed: {
    style () {
      const { fontSize, color, center, block, bold, lineHeight } = this;
      return {
        'font-size': fontSize,
        'color': color,
        'text-align': center ? 'center' : '',
        'display': block ? 'block' : '',
        'font-weight': bold ? 'bold' : '',
        'line-height': lineHeight
      }
    }
  }
}
</script>
