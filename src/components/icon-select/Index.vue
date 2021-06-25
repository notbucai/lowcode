<template>
  <el-select v-model="select" placeholder="请选择">
    <el-option v-for="item in icons" :key="item" :label="item" :value="item">
      <i :class="item"></i>
      <span style="padding-left: 10px;">{{item}}</span>
    </el-option>
  </el-select>
</template>

<script>
import icons from './icon.json';

export default {
  props: {
    value: String
  },
  data () {
    return {
      icons: icons.map(item => 'el-icon-' + item)
    };
  },
  computed: {
    select: {
      get () {
        return this.value;

      },
      set (value) {
        this.$emit('input', value);
      }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.icon-select {
}
</style>
