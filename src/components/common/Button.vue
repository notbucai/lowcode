<template>
  <el-button v-bind="$props">{{ text }}</el-button>
</template>
<script>
export default {
  props: ['text', 'size', 'type', 'plain', 'round', 'circle', 'disabled', 'icon', 'autofocus', 'native-type', 'loading'],
}
</script>
<style lang="scss" scoped>
</style>