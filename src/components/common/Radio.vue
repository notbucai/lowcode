<template>
  <el-radio-group>
    <el-radio
      :label="item.value"
      v-for="(item, index) in options"
      :key="index"
      >{{ item.label }}</el-radio
    >
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