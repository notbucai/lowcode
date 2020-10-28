<template>
  <el-progress :percentage="percentage"></el-progress>
</template>
<script>
export default {
  props: {
    percentage: Number
  },
  data () {
    return {
    };
  },
}
</script>