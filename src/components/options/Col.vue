<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="栅格占据的列数">
        <el-input-number
          v-model="form.span"
          :min="0"
          placeholder="栅格占据的列数"
          controls-position="right"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="栅格左侧的间隔格数">
        <el-input-number
          v-model="form.offset"
          :min="0"
          placeholder="栅格左侧的间隔格数"
          controls-position="right"
        ></el-input-number>
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
  span: number,
  offset: number
}

@Component({

})
export default class Col extends BaseOptions {

  get props () {
    return this.element ? this.element.props : null
  }

  rules = {

  };

  form: LowProps = {
    span: this.props ? this.props.span || 0 : 0,
    offset: this.props ? this.props.offset || 0 : 0,
  }

  timer: number = 0;

  @Watch('props')
  elementWatch (newVal: Element, oldVal: Element) {
    if (newVal === oldVal) return;

    this.form.span = this.props ? this.props.span || 0 : 0;
    this.form.offset = this.props ? this.props.offset || 0 : 0;
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