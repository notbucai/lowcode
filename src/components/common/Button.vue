<template>
  <el-button v-bind="$props">{{ text }}</el-button>
</template>
<script>
export default {
  props: ['text', 'size', 'type', 'plain', 'round', 'circle', 'disabled', 'icon', 'autofocus', 'native-type', 'loading'],
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