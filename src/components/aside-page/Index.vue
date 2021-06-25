<template>
  <div class="aside-pages">
    <div class="aside-pages-header">
      <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
    </div>

    <el-tree
      :data="pages"
      :props="defaultProps"
      :default-checked-keys="[currentPageId]"
      @node-click="handleNodeClick"
      node-key="id"
      highlight-current
    >
      <template slot-scope="props">
        <div class="tree-node">
          <span class="tree-icon" :class="props.data.icon ? '' : 'none'"
            ><i :class="props.data.icon || 'el-icon-remove-outline'"></i
          ></span>
          <span class="tree-title">{{ props.data.title }}</span>
        </div>
      </template>
    </el-tree>

    <el-dialog
      title="增加/修改页面"
      :visible.sync="dialogVisible"
      :before-close="dialogBeforeClose"
      width="400px"
    >
      <div>
        <el-form
          :model="form"
          ref="form"
          :rules="rules"
          label-width="60px"
          :inline="false"
          size="mini"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <IconSelect v-model="form.icon" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import IconSelect from '@/components/icon-select/Index.vue';
export default {
  components: { IconSelect },
  data () {
    return {
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      form: {
        title: '',
        icon: ''
      },
      rules: {
        title: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapState(['pages']),
    currentPageId () {
      return this.$store.state.page.id;
    }
  },
  created () {
  },
  filters: {
  },
  methods: {
    dialogBeforeClose () {

    },
    handleNodeClick (e) {
      this.$store.dispatch('selectPage', e.id)
    },
    handleAdd (e) {
      this.dialogVisible = true;
      this.form = {
        title: '',
        icon: ''
      };
    },
    handleEdit (data) {
      this.form = {
        ...data
      };
      this.dialogVisible = true;
    },
    async handleSubmit () {
      this.$refs['form'].validate(async (valid) => {
        if (!valid) return;
        if (!this.form.id) {
          await this.$store.dispatch('addPage', this.form);
        } else {
          await this.$store.dispatch('updatePage', this.form);
        }
        this.$notify.success("操作成功");
        this.dialogVisible = false;
      });
    },
  }
}
</script>
<style lang="scss">
.aside-pages {
  .el-tree {
    .el-tree-node__content {
      height: auto !important;
    }
    .is-current {
      .el-tree-node__content {
        background-color: #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.tree-node {
  margin: 10px 0;
  display: flex;
  align-items: center;
  position: relative;
  .tree-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    font-size: 16px;
    border-radius: 2px;
    background-color: #409eff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    &.none {
      color: #888;
      background-color: #eee;
    }
  }
  .tree-title {
    margin-left: 28px;
    color: #333;
  }
}
.aside-pages {
  .aside-pages-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
}
</style>