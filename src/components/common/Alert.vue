<template>
  <el-alert v-bind="$props"> </el-alert>
</template>
<script>
export default {
  props: ['title', 'description', 'type', 'closable', 'effect', 'center'],
  data () {
    return {
    };
  },
}
</script>