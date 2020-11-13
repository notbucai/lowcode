<template>
  <div class="models-wrap">
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
</template>
<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';
import { LowElement } from '@/types/Element';
import { ModelType } from '@/store/modules/Page';
import { modelConfig } from '@/components/common/index';

@Component({
  name: 'low-model',
})
export default class LowModel extends Vue {

  @State('models', { namespace: 'page' })
  models?: ModelType[];

  @State('currentId')
  currentId?: string;

  @Getter('current')
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
    this.$store.commit("BIND_MODELS", models);
    this.onClose();
  }
  onClose () {
    this.$store.commit("SET_CURRENT", undefined);
  }

}
</script>
<style lang="scss" scoped>
.models-wrap {
  padding: 10px;
}
</style>