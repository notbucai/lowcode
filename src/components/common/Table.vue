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
      <template slot-scope="scope">
        <TableColumnAction :scope-data="scope">
          <template slot="render">
            <slot></slot>
          </template>
        </TableColumnAction>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import TableColumnAction from './TableColumnAction';
export default {
  components: {
    TableColumnAction
  },
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