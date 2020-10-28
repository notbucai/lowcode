<template>
  <el-pagination layout="prev, pager, next" :total="total" background></el-pagination>
</template>
<script>
export default {
  props: {
    total: Number
  },
  data () {
    return {
    };
  },
}
</script>