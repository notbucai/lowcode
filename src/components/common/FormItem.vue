<template>
  <el-form-item v-bind="$props">
    <slot></slot>
  </el-form-item>
</template>
<script>
export default {
  props: ['size', 'label', 'label-width']
}
</script>