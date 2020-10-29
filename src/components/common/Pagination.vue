<template>
  <el-pagination layout="prev, pager, next" v-bind="$props"></el-pagination>
</template>
<script>
export default {
  props: ['total', 'pageSize', 'background', 'hideOnSinglePage', 'currentPage'],
  data () {
    return {
    };
  },
}
</script>