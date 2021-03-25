<!--
 * @Author: bucai
 * @Date: 2021-03-24 11:31:05
 * @LastEditors: bucai
 * @LastEditTime: 2021-03-24 21:27:11
 * @Description:
-->

<template>
  <div>
    <slot name="render" />
  </div>
</template>
<script>
export default {
  props: {
    scopeData: Object
  },
  provide () {
    return {
      tableRowScopeData: this.scopeData
    }
  },
  data () {
    return {

    };
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.TableColumnAction {
}
</style>
