<template>
  <el-form-item v-bind="$props" :prop="prop">
    <slot></slot>
  </el-form-item>
</template>
<script>
import { getDataByModel } from '@/utils/page';
import { mapState } from 'vuex';
export default {
  props: ['size', 'label', 'label-width', 'models'],
  modelOptions: [{
    key: 'prop',
    name: '表单域字段'
  }],
  computed: {
    ...mapState({
      data (state) {
        return state.page.data
      }
    }),
    prop () {
      if (this.models && this.models.prop) {
        // return getDataByModel(this.data, this.models.prop);
        return this.models.prop.split('.')[this.models.prop.split('.').length-1];
      }
      return undefined;
    }
  }
}
</script>