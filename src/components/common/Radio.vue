<template>
  <el-radio-group>
    <el-radio :label="item.value" v-for="item in options" :key="item.value">{{
      item.label
    }}</el-radio>
  </el-radio-group>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {};
  },
}
</script>