<template>
  <el-time-picker
    v-model="value"
    placeholder="任意时间点"
  >
  </el-time-picker>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      value: new Date()
    };
  },
}
</script>