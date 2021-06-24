<template>
  <!-- 数据源相关 -->
  <div class="models-wrap">
    <el-scrollbar class="aside-scrollbar">
      <div v-show="!current">
        <div class="model-toolbar">
          <el-button
            type="primary"
            size="mini"
            @click="handleShowModelEditAndAddDialog()"
            >添加</el-button
          >
        </div>
        <el-collapse>
          <el-collapse-item
            :title="item.name"
            :name="item.key"
            v-for="item in models"
            :key="item.key"
          >
            <template slot="title">
              <div class="model-item-title">
                <span>{{ item.name }}</span>
                <div class="model-actions">
                  <i
                    class="el-icon-edit"
                    @click="handleShowModelEditAndAddDialog(item)"
                  ></i>
                  <i
                    class="el-icon-delete"
                    @click="handleDeleteItemModel(item)"
                  ></i>
                </div>
              </div>
            </template>
            <div
              class="low-model-item"
              v-for="entity in item.entitys"
              :key="entity.key"
            >
              <pre
                style="font-size: 12px; line-height: 1.4; padding: 4px 10px"
                >{{ JSON.stringify(entity, null, 2) }}</pre
              >
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 配置页 -->
      <div v-if="current">
        <div>
          <el-form
            :model="form"
            ref="form"
            :rules="rules"
            label-width="60px"
            :inline="false"
            size="mini"
          >
            <el-form-item label="">
              <h1>数据源绑定</h1>
            </el-form-item>

            <el-form-item
              :label="item.name"
              v-for="item in modelConfigFormItems"
              :key="item.key"
            >
              <div>
                <el-cascader
                  clearable
                  :props="{
                    checkStrictly: true,
                    children: 'entitys',
                    label: 'name',
                    value: 'key',
                    expandTrigger: 'hover',
                  }"
                  v-model="form.models[item.key]"
                  :options="cascaderOptions"
                ></el-cascader>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button @click="onClose">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-scrollbar>

    <el-dialog
      title="添加/修改数据源"
      :visible.sync="createAndEditModelDialog"
      width="500px"
      @close="handleCreateAndEditModelDialogClose"
    >
      <el-form
        ref="modelForm"
        :model="modelForm"
        size="mini"
        label-width="120px"
      >
        <el-form-item
          label="数据源名称"
          prop="name"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'change',
          }"
        >
          <el-input
            v-model="modelForm.name"
            placeholder="请输入数据源名称"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="数据源键">
          <el-input v-model="modelForm.key" placeholder="请输入数据源键"></el-input>
        </el-form-item> -->

        <div
          v-for="(entity, index) in modelForm.entitys"
          :key="index"
          class="model-form-entity"
        >
          <el-form-item
            label="实体名称"
            :prop="`entitys.${index}.name`"
            :rules="{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }"
          >
            <el-input
              v-model="entity.name"
              placeholder="请输入实体名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="实体字段"
            :prop="`entitys.${index}.key`"
            :rules="{
              required: true,
              message: '不能为空',
              trigger: 'change',
            }"
          >
            <el-input
              v-model="entity.key"
              placeholder="请输入实体字段"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="数据类型"
            :prop="`entitys.${index}.type`"
            :rules="{
              required: true,
              message: '请选择',
              trigger: 'change',
            }"
          >
            <el-select v-model="entity.type" placeholder="请选择数据类型">
              <el-option
                v-for="type in modelTypes"
                :key="type.value"
                :label="type.label"
                :value="type.type"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="默认数据" :prop="`entitys.${index}.value`">
            <el-input
              v-model="entity.value"
              placeholder="请输入实体默认数据，不填则为对应类型数据"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="handleRemoveEntityItem(index)"
              >删除</el-button
            >
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" @click="handleAddFormEntity"
            >添加实体</el-button
          >
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="createAndEditModelDialog = false" size="mini"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="handleCreateAndEditModelDialogSubmit"
          >提交</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { LowElement } from '@/types/Element';
import { ModelType, TypeType } from '@/store/modules/page';
import { modelConfig } from '@/components/common/index';
import { cloneDeep } from 'lodash'
import { generateUUID } from '@/utils';
@Component({
  name: 'low-model',
})
export default class LowModel extends Vue {

  createAndEditModelDialog = false;

  modelForm = {
    name: '',
    key: '',
    entitys: [{
      name: '',
      value: '',
      type: 'string',
      key: ''
    }],
  };

  @State('models', { namespace: 'page' })
  models?: ModelType[];

  @State('types', { namespace: 'page' })
  modelTypes?: TypeType[];

  @State('currentId',{ namespace: 'page' })
  currentId?: string;

  @Getter('current',{ namespace: 'page' })
  current?: LowElement;

  @Watch('currentId')
  currentWatch () {

    if (!this.current) return;
    const models = this.current.models;
    if (!models) {
      this.form.models = {};
      return;
    }

    this.form.models = Object.keys(models).reduce((pv: any, key: string) => {
      pv[key] = models[key].split('.');
      return pv;
    }, {});
    console.log('this.form.models ', this.form.models);

  }

  get cascaderOptions () {
    return this.models;
  }

  get modelConfigFormItems () {
    if (!this.current) return [];
    return modelConfig[this.current.element];
  }

  get rules () {
    return {
      model: [
        { required: true, message: '请选择', trigger: 'change' },
      ],
    }
  }

  form = {
    models: {}
  }


  created () {
    this.currentWatch();
  }

  onSubmit () {
    const formModels: any = this.form.models;

    const models = Object.keys(formModels).reduce((pv: any, key: string) => {
      pv[key] = (formModels[key] || []).join('.');
      return pv;
    }, {});
    this.$store.commit("page/BIND_MODELS", models);
    this.onClose();
  }
  onClose () {
    this.$store.commit("page/SET_CURRENT", undefined);
  }

  handleDeleteItemModel (data: ModelType) {
    this.$store.commit('page/REMOVE_MODEL', data.key);
    this.$message.success("成功");
  }

  handleShowModelEditAndAddDialog (data?: ModelType) {
    this.createAndEditModelDialog = true;
    if (!data) return; // 表示直接打开

    data = cloneDeep(data);
    const entitys = data.entitys;

    data.entitys = entitys.map(item => {
      item.value = JSON.parse(item.value);
      return item;
    });

    this.modelForm = data;
  }

  handleAddFormEntity () {
    this.modelForm.entitys.push({
      key: '',
      name: '',
      value: '',
      type: 'string'
    });
  }
  handleRemoveEntityItem (index: number) {
    this.modelForm.entitys.splice(index, 1);
  }

  handleCreateAndEditModelDialogClose () {
    // TODO: 目前只要是关闭就直接清空
    this.modelForm = {
      name: '',
      key: '',
      entitys: [{
        name: '',
        value: '',
        type: 'string',
        key: ''
      }]
    };
  }

  handleCreateAndEditModelDialogSubmit () {
    (this.$refs['modelForm'] as any).validate(async (valid: boolean) => {
      if (!valid) return;
      // TODO: 保存
      // 转换数据
      const modelTypes = this.modelTypes || [];
      const modelForm = cloneDeep(this.modelForm);
      const entitys = modelForm.entitys;

      if (!modelForm.key) {
        modelForm.key = generateUUID(true);
      }

      try {
        // 得到keys,判断entitykey是否唯一
        const keys = modelForm.entitys.map(item => item.key);
        const size = new Set(keys).size;
        if (size !== modelForm.entitys.length) {
          throw new Error("实体中存在重复的实体字段，请确保字段唯一");
        }
        modelForm.entitys = entitys.map(entity => {
          // 处理value 
          // TODO: 校验数据 还需要复杂一点
          if (!entity.value) {
            const type = modelTypes.find(type => type.type === entity.type);
            entity.value = type?.value || '';
          } else {
            if (entity.type === 'string') {
              entity.value = JSON.stringify(entity.value);
            } else {
              try {
                // 校验
                entity.value = JSON.stringify(JSON.parse(entity.value));
              } catch (error) {
                throw new Error(entity.name + "的数据错误，请检查");
              }
            }
          }
          return entity;
        });
      } catch (error) {
        this.$message.warning(error.message);
        throw error;
      }
      try {
        // 执行添加模型
        await this.$store.dispatch('page/handleEditOrAddModel', modelForm);
        this.$message.success("操作成功");
        this.$nextTick(() => {
          this.createAndEditModelDialog = false;
        });
      } catch (error) {
        this.$message.error(error.message);
      }
    });
  }

}
</script>
<style lang="scss" scoped>
.models-wrap {
  padding: 10px;
  .model-toolbar {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
  }
  .model-item-title {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .model-actions {
      i {
        margin: 0 2px;
        padding: 6px;
        cursor: pointer;
        transition: all 0.1s;
        border-radius: 2px;
        opacity: 0.7;
        font-weight: bold;
        &:hover {
          opacity: 1;
          background-color: #f1f1f1;
        }
        &.el-icon-delete {
          color: #f44336;
        }
        &.el-icon-edit {
          color: #2196f3;
        }
      }
    }
  }
  .model-form-entity {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 2px;
    position: relative;
    margin-bottom: 12px;
  }
}
</style>