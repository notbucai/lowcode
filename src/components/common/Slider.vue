<template>
  <el-slider v-model="value"> </el-slider>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      value: 30
    };
  },
}
</script>