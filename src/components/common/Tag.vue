<template>
  <el-tag v-bind="$props">{{ text }}</el-tag>
</template>
<script>
export default {
  props: ['text', 'type', 'closable', 'effect', 'size'],
  data () {
    return {
    };
  },
}
</script>