<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="输入框占位文本">
        <el-input v-model="form.placeholder" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="最大输入长度">
        <el-input-number
          v-model="form.maxlength"
          placeholder="请输入"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="最小输入长度">
        <el-input-number
          v-model="form.minlength"
          placeholder="请输入"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="输入框头部图标">
        <el-input v-model="form.prefixIcon"></el-input>
      </el-form-item>

      <el-form-item label="输入框尾部图标">
        <el-input v-model="form.suffixIcon"></el-input>
      </el-form-item>

      <el-form-item label="输入框行数" v-if="form.type === 'textarea'">
        <el-input-number :min="1" v-model="form.rows"></el-input-number>
      </el-form-item>

      <el-form-item label="输入框的tabindex">
        <el-input-number :min="0" v-model="form.tabindex"></el-input-number>
      </el-form-item>

      <el-form-item label="类型">
        <el-select v-model="form.type">
          <el-option label="默认" value=""> </el-option>
          <el-option label="主要" value="text"> </el-option>
          <el-option label="成功" value="textarea"> </el-option>
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

      <el-form-item label="显示输入字数统计">
        <el-switch v-model="form.showWordLimit"> </el-switch>
      </el-form-item>

      <el-form-item label="可清空">
        <el-switch v-model="form.clearable"> </el-switch>
      </el-form-item>

      <el-form-item label="显示切换密码图标">
        <el-switch v-model="form.showPassword"> </el-switch>
      </el-form-item>

      <el-form-item label="禁用">
        <el-switch v-model="form.disabled"> </el-switch>
      </el-form-item>

      <el-form-item label="默认聚焦">
        <el-switch v-model="form.autofocus"> </el-switch>
      </el-form-item>

      <el-form-item label="只读">
        <el-switch v-model="form.readonly"> </el-switch>
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
  type: "text" | "textarea" | '';

  disabled: boolean;
  autofocus: boolean;

  maxlength: number | undefined;
  minlength: number | undefined;
  showWordLimit: boolean;
  placeholder: string;
  clearable: boolean;
  showPassword: boolean;
  prefixIcon: string;
  suffixIcon: string;
  rows: number | undefined;
  readonly: boolean;
  tabindex: number | undefined;

}

@Component({

})
export default class Input extends BaseOptions {

  get props () {
    return this.element ? this.element.props : null
  }

  rules = {

  };

  form: LowProps = {
    size: '',
    type: '',
    disabled: false,
    autofocus: false,
    maxlength: undefined,
    minlength: undefined,
    showWordLimit: false,
    placeholder: '',
    clearable: false,
    showPassword: false,
    prefixIcon: '',
    suffixIcon: '',
    rows: undefined,
    readonly: false,
    tabindex: undefined,
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