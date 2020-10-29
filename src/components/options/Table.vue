<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="接口数据">
        <el-input
          type="textarea"
          :rows="10"
          v-model="apiJSONData"
          placeholder="接口对象"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <div class="formAction">
          <el-button type="primary" @click="onSubmit">完成</el-button>
          <el-button @click="handleClose">取消</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="formAction">
          <el-button type="danger" @click="handleRemove">删除</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { LowElement } from '@/types/Element';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import BaseOptions from './BaseOptions';

export type LowTableColumn = {
  id: string | number;
  label: string;
  width?: string;
}

type LowProps = {
  columns: LowTableColumn[]
}

@Component({

})
export default class Table extends BaseOptions {

  get props () {
    return this.element ? this.element.props : null
  }

  apiJSONData: string = '';

  rules = {

  };

  form: LowProps = {
    columns: []
  }
  defaultForm: any;

  timer: number = 0;

  created () {
    this.defaultForm = Object.assign({}, this.form);
    this.handleUpdateData();
  }

  handleUpdateData () {
    const props = this.props;
    const form: any = {};
    Object.keys(this.form).forEach(key => {
      const val = props ? props[key] : this.defaultForm[key];
      this.$set(this.form, key, val);
      form[key] = val;
    });

    this.apiJSONData = JSON.stringify(this.form.columns.reduce<{ [key: string]: string }>((pv, cv) => {
      pv[cv.id] = cv.label;
      return pv;
    }, {}), null, 2);
  }

  @Watch('apiJSONData')
  apiJSONDataWatch (newVal: string, oldVal: string) {
    if (oldVal.length === 0) return;
    console.log('newVal', newVal, oldVal);

    if (oldVal === newVal) return;

    try {
      const newObj = JSON.parse(newVal);

      const columns: LowTableColumn[] = Object.keys(newObj).map(key => {
        return {
          id: key,
          label: newObj[key]
        }
      });
      this.form.columns = columns;
    } catch (error) {
      this.$message.error(error.message);
    }

  }

  @Watch('props')
  elementWatch (newVal: Element, oldVal: Element) {
    if (newVal === oldVal) return;
    this.handleUpdateData();
  }

  @Watch('form', { deep: true })
  formWatch (newVal: LowProps, oldVal: LowProps) {
    // 将参数添加进去
    this.handleUpdate();
  }
  handleUpdate () {
    this.$store.commit('UPDATE_CURRENT_PROPS', { ...this.form });
  }
  onSubmit () {

  }
  /**
   * 取消
   */
  handleClose () {
    this.$store.commit("SET_CURRENT", undefined);
  }

  handleRemove () {
    this.$store.commit("REMOVE_CURRENT");
    this.$store.commit("SET_CURRENT", undefined);
  }
}

</script>
<style lang="scss" scoped>
.row-option {
  padding: 10px;
  .formAction {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>