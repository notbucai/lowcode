<template>
  <div class="action-fetch" v-if="actions.actions">
    <!-- addAction -->
    <div class="action-header-tools">
      <el-button type="primary" size="mini" @click="handleAddAction"
        >添加动作</el-button
      >
    </div>
    <div v-for="action in actions.actions" :key="action.key" class="fetch-item">
      <p class="item-name">{{ action.name }}</p>
      <div class="item-operate">
        <i class="el-icon-edit fetch-edit" @click="handleEditItem(action)"></i>
        <i
          class="el-icon-close fetch-remove"
          @click="handleDeleteItem(action)"
        ></i>
      </div>
    </div>
    <el-dialog
      title="操作"
      :visible.sync="dialogVisible"
      width="480px"
      :before-close="dialogBeforeClose"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="mini"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item label="接口" prop="api">
          <el-input placeholder="请输入接口地址" v-model="form.api">
            <el-select
              v-model="form.method"
              slot="prepend"
              placeholder="请接口类型"
            >
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST">POST</el-option>
              <el-option label="DELETE" value="DELETE"></el-option>
              <el-option label="PUT" value="PUT"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="数据" prop="data">
          <div class="dialog-data-box" v-if="form.data">
            <el-form-item
              label="请求数据"
              prop="data.bind"
              :rules="{
                required: true,
                message: '不能为空',
                trigger: 'change',
              }"
            >
              <el-cascader
                clearable
                :props="{
                  checkStrictly: true,
                  children: 'entitys',
                  label: 'name',
                  value: 'key',
                  expandTrigger: 'hover',
                }"
                placeholder="请选择绑定的请求数据"
                @change="handleBindChange"
                v-model="form.data.bind"
                :options="cascaderOptions"
              ></el-cascader>
            </el-form-item>

            <el-form-item
              label="单个数据"
              v-if="form.data.bindType === 'array'"
            >
              <el-switch label="" v-model="form.data.one"></el-switch>
            </el-form-item>

            <el-form-item label="响应数据">
              <el-cascader
                clearable
                :props="{
                  checkStrictly: true,
                  children: 'entitys',
                  label: 'name',
                  value: 'key',
                  expandTrigger: 'hover',
                }"
                placeholder="请选择接收响应的结果的数据"
                v-model="form.data.recv"
                :options="cascaderOptions"
              ></el-cascader>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { generateUUID } from '@/utils';
import { cloneDeep } from 'lodash'
import actions from '@/plugins/actions';
export default {
  props: {
    actions: Object
  },
  data () {
    return {
      dialogVisible: false,
      form: {
        api: '',
        name: '',
        method: 'POST',
        data: {
          bind: '',
          recv: '',
          one: false,
          bindType: null,
          replace: []
        }
      },
      rules: {
        name: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }],
        api: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }],
        data: [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }]
      },
    };
  },
  computed: {
    cascaderOptions () {
      return this.$store.state.page.models;
    }
  },
  created () {
  },
  methods: {
    dialogBeforeClose () {
      this.dialogVisible = false;
    },
    handleAddAction () {
      this.form = {
        name: '',
        api: '',
        method: "POST",
        data: {
          one: false,
          bind: [],
          recv: []
        }
      };
      this.dialogVisible = true;
    },
    handleEditItem (action) {
      console.log('action', action);
      const _item = cloneDeep(action);
      const [, method, api] = _item.handle.match(/^([A-z]+)\[(.*?)\]$/);
      const bind = _item.data.bind.replace(/\.\$\[(.*?)\]$/g, '').split('.');
      const recv = (_item.data.recv || '').split('.')

      this.form.key = _item.key;
      this.form.name = _item.name;
      this.form.api = api;
      this.form.method = method.toUpperCase();
      this.form.data = {
        one: !!(Array.isArray(_item.data.replace) && _item.data.replace.length),
        bind: bind,
        recv: recv
      };
      this.form.data.bindType = this.form.data.one ? 'array' : '';
      this.dialogVisible = true;
    },
    async handleDeleteItem (action) {
      await this.$confirm(`是否删除“${action.name}”？`);
      this.$store.commit('page/REMOVE_ACTION', {
        type: 'fetch',
        key: action.key
      });
      this.$message.success("删除成功");
    },
    handleBindChange (e) {
      const currentBindData = e.reduce((pv, cv) => {
        let list = pv;
        if (!Array.isArray(pv)) {
          list = pv.entitys;
        }
        return list.find(item => item.key === cv);
      }, this.cascaderOptions);
      this.form.data.bindType = currentBindData.type;
      this.form.data.one = false;
    },
    handleConfirm () {
      this.$refs['form'].validate(async (valid) => {
        if (!valid) return;

        const form = this.form;

        const action = {
          key: form.key,
          name: form.name,
          handle: `${form.method}[${form.api}]`,
          data: {
            bind: form.data.bind.join('.') + (form.data.one ? '.$[index]' : ''),
            recv: form.data.recv.join('.'),
            replace: form.data.one ? ['index'] : ''
          }
        };

        if (!action.key) {
          action.key = 'action_' + generateUUID(true);
        }

        this.$store.commit('page/UPDATE_ACTION', {
          type: 'fetch',
          key: action.key,
          data: action
        });

        this.$message.success('成功');
        this.form = {
          name: '',
          api: '',
          method: "POST",
          data: {
            one: false,
            bind: [],
            recv: []
          }
        };
        this.dialogVisible = false;
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.action-fetch {
  .action-header-tools {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
  }
  .fetch-item {
    padding: 8px 14px;
    border-radius: 4px;
    background-color: #f4f5f6;
    margin: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #03a9f4;

    &:hover {
      background-color: #f1f1f1;
    }
    .item-operate {
      min-width: 50px;
      max-width: 50px;
      display: flex;
      align-items: center;
      height: 100%;
      color: #999;
      i {
        flex: 1;
        text-align: center;
        transition: all 0.2s;
        font-weight: bold;
        &:hover {
          color: #2196f3;
        }
      }
    }
  }
  .dialog-data-box {
    background-color: #f4f5f6;
    padding: 10px;
    border-radius: 4px;
  }
}
</style>