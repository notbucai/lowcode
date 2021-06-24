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

      <el-form-item label="类型">
        <el-select v-model="form.type">
          <el-option label="默认" value=""> </el-option>
          <el-option label="主要" value="primary"> </el-option>
          <el-option label="成功" value="success"> </el-option>
          <el-option label="警告" value="warning"> </el-option>
          <el-option label="危险" value="danger"> </el-option>
          <el-option label="提示" value="info"> </el-option>
          <el-option label="文字" value="text"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="尺寸">
        <el-select v-model="form.size">
          <el-option label="默认" value=""> </el-option>
          <el-option label="中等" value="medium"> </el-option>
          <el-option label="小" value="small"> </el-option>
          <el-option label="迷你" value="mini"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="主题">
        <el-select v-model="form.effect">
          <!-- "dark" | "light" | "plain"  -->
          <el-option label="默认" value=""> </el-option>
          <el-option label="dark" value="dark"> </el-option>
          <el-option label="light" value="light"> </el-option>
          <el-option label="plain" value="plain"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否可关闭">
        <el-switch v-model="form.closable"></el-switch>
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
  type: "success" | "info" | "warning" | "danger" | '';
  closable: boolean;
  effect: "dark" | "light" | "plain" | '',
  size: "medium" | "small" | "mini" | '',
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
    text: '',
    type: '',
    closable: false,
    effect: '',
    size: ''
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