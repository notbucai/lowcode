<template>
  <el-form v-bind="$props">
    <slot></slot>
  </el-form>
</template>
<script>
export default {
  props: ['size', 'label-position', 'inline', 'label-width']
}
</script>