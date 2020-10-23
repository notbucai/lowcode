<template>
  <el-row v-bind="$props">
    <slot></slot>
  </el-row>
</template>
<script>
export default {
  props: {
    gutter: Number,
    type: String,
    justify: String,
    align: String,
  },
  components: {},
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