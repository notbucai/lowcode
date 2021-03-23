<template>
  <el-button v-bind="$props" @click="handleClick">{{ text }}</el-button>
</template>
<script>
export default {
  props: ['text', 'size', 'type', 'plain', 'round', 'circle', 'disabled', 'icon', 'autofocus', 'native-type', 'loading', 'actions'],
  actioOptions: [
    {
      key: 'click',
      name: '点击',
    },
    {
      key: 'submit',
      name: '提交',
      beIncluded: 'form' // 被form包裹的前提下可以存在的操作
    },
    {
      key: 'row',
      name: '表格行操作',
      beIncluded: 'table' // 被table包裹的前提下可以存在的操作
    }
  ],

  inject: [],

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