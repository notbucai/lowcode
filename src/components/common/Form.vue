<template>
  <el-form v-bind="$props" :model="model" :rules="rules">
    <slot></slot>
  </el-form>
</template>
<script>
import { getDataByModel } from '@/utils/page';
import { mapState } from 'vuex';

export default {
  props: ['size', 'label-position', 'inline', 'label-width', 'models'],
  modelOptions: [{
    key: 'model',
    name: '模型',
  }, {
    key: 'rules',
    name: '规则',
  }],

  computed: {
    ...mapState({
      data (state) {
        return state.page.data
      }
    }),
    model () {
      if (this.models && this.models.model) {
        return getDataByModel(this.data, this.models.model);
      }
      return undefined;
    },
    rules () {
      if (this.models && this.models.rules) {
        return getDataByModel(this.data, this.models.rules);
      }
      return undefined;
    }
  }

}
</script>