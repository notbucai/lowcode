<template>
  <el-date-picker
    v-model="value"
    placeholder="任意时间点"
  >
  </el-date-picker>
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