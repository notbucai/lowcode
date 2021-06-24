<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="文案">
        <el-input v-model="form.text" placeholder="请输入文案"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="form.icon" placeholder="请输入图标名称"></el-input>
      </el-form-item>

      <el-form-item label="尺寸">
        <el-select v-model="form.size">
          <el-option label="默认" value=""> </el-option>
          <el-option label="中等" value="medium"> </el-option>
          <el-option label="小" value="small"> </el-option>
          <el-option label="迷你" value="mini"> </el-option>
        </el-select>
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

      <el-form-item label="原生 type 属性">
        <el-select v-model="form.nativeType">
          <el-option label="默认" value=""> </el-option>
          <el-option label="按钮" value="button"> </el-option>
          <el-option label="提交" value="submit"> </el-option>
          <el-option label="重置" value="reset"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="朴素">
        <el-switch v-model="form.plain"> </el-switch>
      </el-form-item>

      <el-form-item label="圆角">
        <el-switch v-model="form.round"> </el-switch>
      </el-form-item>

      <el-form-item label="圆形">
        <el-switch v-model="form.circle"> </el-switch>
      </el-form-item>

      <el-form-item label="禁用">
        <el-switch v-model="form.disabled"> </el-switch>
      </el-form-item>

      <el-form-item label="默认聚焦">
        <el-switch v-model="form.autofocus"> </el-switch>
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
  size: "medium" | "small" | "mini" | '';
  type: "primary" | "success" | "warning" | "danger" | "info" | "text" | '';
  plain: boolean;
  round: boolean;
  circle: boolean;
  disabled: boolean;
  icon: string;
  autofocus: boolean;
  nativeType: boolean;
  text: string;
}

@Component({

})
export default class Button extends BaseOptions {

  get props () {
    return this.element ? this.element.props : null
  }

  rules = {

  };

  form: LowProps = {
    size: this.props ? this.props.size || '' : '',
    type: this.props ? this.props.type || '' : '',
    plain: this.props ? this.props.plain || false : false,
    round: this.props ? this.props.round || false : false,
    circle: this.props ? this.props.circle || false : false,
    disabled: this.props ? this.props.disabled || false : false,
    icon: this.props ? this.props.icon || '' : '',
    autofocus: this.props ? this.props.autofocus || false : false,
    nativeType: this.props ? this.props.nativeType || '' : '',
    text: this.props ? this.props.text || '' : ''
  }

  timer: number = 0;

  @Watch('props')
  elementWatch (newVal: Element, oldVal: Element) {
    if (newVal === oldVal) return;

    this.form.size = this.props ? this.props.size || '' : '';
    this.form.type = this.props ? this.props.type || '' : '';
    this.form.plain = this.props ? this.props.plain || false : false;
    this.form.round = this.props ? this.props.round || false : false;
    this.form.circle = this.props ? this.props.circle || false : false;
    this.form.disabled = this.props ? this.props.disabled || false : false;
    this.form.icon = this.props ? this.props.icon || '' : '';
    this.form.autofocus = this.props ? this.props.autofocus || false : false;
    this.form.nativeType = this.props ? this.props.nativeType || '' : '';
    this.form.text = this.props ? this.props.text || '' : '';

  }

  @Watch('form', { deep: true })
  formWatch (newVal: LowProps, oldVal: LowProps) {
    // 将参数添加进去
    this.handleUpdate();
  }
  handleUpdate () {
    this.$store.commit('page/UPDATE_CURRENT_PROPS', { ...this.form })
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