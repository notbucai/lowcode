<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="文本">
        <el-input v-model="form.text" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="颜色">
        <el-color-picker v-model="form.color"></el-color-picker>
      </el-form-item>

      <el-form-item label="大小">
        <el-input
          v-model="form.fontSize"
          placeholder="请输入,如 16px"
        ></el-input>
      </el-form-item>

      <el-form-item label="行高">
        <el-input
          v-model="form.lineHeight"
          placeholder="请输入,如 16px"
        ></el-input>
      </el-form-item>

      <el-form-item label="居中">
        <el-switch v-model="form.center"></el-switch>
      </el-form-item>

      <el-form-item label="块">
        <el-switch v-model="form.block"></el-switch>
      </el-form-item>

      <el-form-item label="粗体">
        <el-switch v-model="form.bold"></el-switch>
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
  text: string;
  fontSize: string;
  color: string;
  center: boolean;
  block: boolean;
  bold: boolean;
  lineHeight: string;
}

@Component({
  name: 'bc-text-option'
})
export default class Text extends BaseOptions {

  get props () {
    return this.element ? this.element.props : null
  }

  rules = {

  };

  form: LowProps = {
    text: '',
    fontSize: '',
    color: '',
    center: false,
    block: false,
    bold: false,
    lineHeight: '1'
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
    // this.form = form;
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
    this.$store.commit('page/UPDATE_CURRENT_PROPS', { ...this.form });
  }
  onSubmit () {

  }
  /**
   * 取消
   */
  handleClose () {
    this.$store.commit("page/SET_CURRENT", undefined);
  }

  handleRemove () {
    this.$store.commit("page/REMOVE_CURRENT");
    this.$store.commit("page/SET_CURRENT", undefined);
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