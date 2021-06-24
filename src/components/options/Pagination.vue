<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="是否开启背景">
        <el-switch v-model="form.background"></el-switch>
      </el-form-item>

      <el-form-item label="只有一页时是否隐藏">
        <el-switch v-model="form.hideOnSinglePage"></el-switch>
      </el-form-item>

      <el-form-item label="页面数量">
        <el-input-number v-model="form.pageSize" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="总数量">
        <el-input-number v-model="form.total" :min="0"></el-input-number>
      </el-form-item>

      <el-form-item label="第N页">
        <el-input-number v-model="form.currentPage" :min="0"></el-input-number>
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
  background: boolean;
  pageSize: number;
  currentPage: number;
  total: number;
  hideOnSinglePage: boolean;
}

@Component({

})
export default class Tag extends BaseOptions {

  get props () {
    return this.element ? this.element.props : null
  }

  rules = {

  };

  form: LowProps = {
    background: false,
    pageSize: 0,
    currentPage: 0,
    total: 0,
    hideOnSinglePage: false,
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