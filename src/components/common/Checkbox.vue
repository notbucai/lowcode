<template>
  <el-checkbox-group v-model="select">
    <el-checkbox :label="item.value" v-for="item in options" :key="item.value">{{
      item.label
    }}</el-checkbox>
  </el-checkbox-group>
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
    return {
      select: ''
    };
  },
}
</script>