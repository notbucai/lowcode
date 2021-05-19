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
import { getDataByModel } from '@/utils/page';
import TableColumnAction from './TableColumnAction';
import { mapState } from 'vuex';
export default {
  actioOptions: [
    {
      key: 'init',
      name: '初始化',
    }
  ],
  modelOptions: [{
    key: 'data',
    name: '数据列表',
  }],
  components: {
    TableColumnAction
  },
  props: {
    actions: Array,
    columns: {
      type: Array,
      default () {
        return [];
      }
    },
    models: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      pageData (state) {
        return state.page.data
      }
    }),
    data () {
      if (this.models && this.models.data) {
        return getDataByModel(this.pageData, this.models.data);
      }
      return [this.columns.reduce((pv, cv) => {
        pv[cv.id] = cv.label;
        return pv;
      }, {})];
    }
  },
  data () {
    return {};
  },
  mounted () {
    this.init();
  },
  methods: {
    async init () {
      // 检测一下是否在编辑状态
      const preview = localStorage.getItem('preview')
      if (!preview) return;

      if (!this.actions) return;
      const initAction = this.actions.find(item => item.event === 'init');

      if (initAction) {
        await this.$actions(initAction, {});
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>