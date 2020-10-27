<template>
  <el-table :data="data" border size="mini">
    <el-table-column
      v-for="col in columns"
      :prop="col.id"
      :key="col.id"
      :label="col.label"
      :width="col.width"
    >
    </el-table-column>
    <el-table-column v-if="this.$slots.default">
      <slot></slot>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  computed: {
    data () {
      return [this.columns.reduce((pv, cv) => {
        pv[cv.id] = cv.label;
        return pv;
      }, {})];
    }
  },
  data () {
    return {};
  },
}
</script>
<style lang="scss" scoped>
</style>