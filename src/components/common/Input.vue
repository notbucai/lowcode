<template>
  <el-input v-bind="props" v-model="value"></el-input>
</template>
<script>
import { mapState } from 'vuex';
import { getDataByModel, setDataByModel } from '@/utils/page';

export default {
  props: ['props', 'models'],
  modelOptions: [{
    key: 'value',
    name: '值'
  }],
  computed: {
    value: {
      get () {
        if (this.models && this.models.value) {
          return getDataByModel(this.data, this.models.value);
        }
        return '';
      },
      set (value) {
        setDataByModel(this.data, this.models.value, value);
      }
    },
    ...mapState({
      data (state) {
        return state.page.data
      }
    })
  },


}
</script>
<style lang="scss" scoped>
</style>