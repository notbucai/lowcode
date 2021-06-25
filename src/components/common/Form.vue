<template>
  <el-form ref="formEl" v-bind="$props" :model="model" :rules="rules">
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

  provide () {
    return {
      formCompoent: this
    }
  },

  computed: {
    ...mapState({
      data (state) {
        return state.data
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
  },
  methods: {
    submit () {
      return new Promise((resolve, reject) => {
        this.$refs['formEl'].validate(async valid => {
          if (valid) {
            return resolve();
          }
          reject();
        })
      })
    }
  }

}
</script>