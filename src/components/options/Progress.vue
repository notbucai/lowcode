<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="百分比">
        <el-input-number
          v-model="form.percentage"
          :min="0"
          :max="100"
          :step="1"
          :controls="true"
          controls-position="both"
        >
        </el-input-number>
      </el-form-item>

      <el-form-item label="类型">
        <el-select v-model="form.type">
          <el-option label="线" value="line"> </el-option>
          <el-option label="圆" value="circle"> </el-option>
          <el-option label="指示板" value="dashboard"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="主题">
        <el-select v-model="form.status">
          <el-option label="默认" :value="undefined"> </el-option>
          <el-option label="成功" value="success"> </el-option>
          <el-option label="异常" value="exception"> </el-option>
          <el-option label="警告" value="warning"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="显示进度条文字">
        <el-switch v-model="form.showText"></el-switch>
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

type LowProps = {
  percentage: number;
  status: "success" | "exception" | "warning" | '';
  showText: boolean;
  type: "line" | "circle" | "dashboard" | '',
}

@Component({

})
export default class Progress extends BaseOptions {

  get props () {
    return this.element ? this.element.props : null
  }

  rules = {

  };

  form: LowProps = {
    percentage: 0,
    status: '',
    showText: false,
    type: 'line',
  }
  defaultForm: any;

  timer: number = 0;

  created () {
    this.defaultForm = Object.assign({}, this.form);
    this.handleUpdateData();
  }

  handleUpdateData () {
    const props = this.props;
    Object.keys(this.form).forEach(key => {
      const val = props ? props[key] : this.defaultForm[key];
      this.$set(this.form, key, val);
    });
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