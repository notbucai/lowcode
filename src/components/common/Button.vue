<template>
  <el-button v-bind="$props" @click="handleClick">{{ text }}</el-button>
</template>
<script>
export default {
  props: ['text', 'size', 'type', 'plain', 'round', 'circle', 'disabled', 'icon', 'autofocus', 'native-type', 'loading', 'actions'],
  actioOptions: [{
    key: 'click',
    name: '点击',
  }],

  methods: {
    handleClick (e) {
      // 检测一下是否在编辑状态
      const preview = localStorage.getItem('preview')
      if (!preview) return;
      // 获取
      if (!this.actions) return;
      const action = this.actions.find(item => item.event === 'click');
      if (!action) return;
      this.$actions(action);
    }
  }

}
</script>
<style lang="scss" scoped>
</style>