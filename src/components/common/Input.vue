<template>
  <el-input v-bind="$props"></el-input>
</template>
<script>
export default {
  props: ["size", "type", "disabled", "autofocus", "maxlength", "minlength", "showWordLimit", "placeholder", "clearable", "showPassword", "prefixIcon", "suffixIcon", "rows", "readonly", "tabindex"],
  updated () {
  }
}
</script>
<style lang="scss" scoped>
</style>