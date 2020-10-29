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
        <el-input v-model="form.title" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="辅助性文字">
        <el-input type="textarea" v-model="form.description" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-select v-model="form.type">
          <el-option label="成功" value="success"> </el-option>
          <el-option label="警告" value="warning"> </el-option>
          <el-option label="错误" value="error"> </el-option>
          <el-option label="提示" value="info"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="主题">
        <el-select v-model="form.effect">
          <el-option label="dark" value="dark"> </el-option>
          <el-option label="light" value="light"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否可关闭">
        <el-switch v-model="form.closable"></el-switch>
      </el-form-item>

      <el-form-item label="居中">
        <el-switch v-model="form.center"></el-switch>
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
  title: string;
  description: string;
  center: boolean;
  type: "success" | "info" | "warning" | "error" | undefined;
  closable: boolean;
  effect: "dark" | "light" | '',
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
    title: '',
    description:'',
    type: undefined,
    closable: false,
    effect: '',
    center: false
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