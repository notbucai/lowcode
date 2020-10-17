<template>
  <el-col :span="span" :offset="offset">
    <slot></slot>
  </el-col>
</template>
<script>
export default {
  components: {},
  props: {
    span: [Number, String],
    offset: [Number, String],
  },
  computed: {},
  data () {
    return {};
  },
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>