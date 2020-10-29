<template>
  <el-progress v-bind="$props"></el-progress>
</template>
<script>
export default {
  props: ['percentage', 'type', 'status', 'showText'],
  data () {
    return {
    };
  },
}
</script>