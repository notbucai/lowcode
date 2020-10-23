<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      :inline="false"
      size="mini"
    >
      <el-form-item label="栅格间隔">
        <el-input-number
          v-model="form.gutter"
          :min="0"
          placeholder="栅格间隔"
          controls-position="right"
        ></el-input-number>
        px
      </el-form-item>
      <el-form-item label="布局模式">
        <el-select v-model="form.type" placeholder="布局模式">
          <el-option label="DEFAULT" :value="undefined"> </el-option>
          <el-option label="FLEX" value="flex"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="水平排列" v-if="form.type === 'flex'">
        <el-select v-model="form.justify" placeholder="水平排列布局模式">
          <el-option label="start" value="start"> </el-option>
          <el-option label="end" value="end"> </el-option>
          <el-option label="center" value="center"> </el-option>
          <el-option label="space-around" value="space-around"> </el-option>
          <el-option label="space-between" value="space-between"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="垂直排列" v-if="form.type === 'flex'">
        <el-select v-model="form.align" placeholder="垂直排列布局模式">
          <el-option label="top" value="top"> </el-option>
          <el-option label="middle" value="middle"> </el-option>
          <el-option label="bottom" value="bottom"> </el-option>
        </el-select>
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
  gutter: number;
  type: 'flex' | undefined;
  justify: "start" | "end" | "center" | "space-around" | "space-between" | undefined;
  align: "top" | "middle" | "bottom" | undefined;
}

@Component({

})
export default class Row extends BaseOptions {

  get props () {
    return this.element ? this.element.props : null
  }

  rules = {

  };

  form: LowProps = {
    gutter: this.props ? this.props.gutter : 0,
    type: this.props ? this.props.type : undefined,
    justify: this.props ? this.props.justify : undefined,
    align: this.props ? this.props.align : undefined
  }

  timer: number = 0;

  @Watch('props')
  elementWatch (newVal: Element, oldVal: Element) {
    if (newVal === oldVal) return;

    this.form.gutter = this.props ? this.props.gutter : 0;
    this.form.type = this.props ? this.props.type : undefined;
    this.form.justify = this.props ? this.props.justify : undefined;
    this.form.align = this.props ? this.props.align : undefined
  }

  @Watch('form.type')
  formTypeWatch (newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      if (newVal === 'flex') {
        this.form.justify = 'start';
        this.form.align = 'top';
      } else {
        this.form.justify = undefined;
        this.form.align = undefined;
      }
    }
  }

  @Watch('form', { deep: true })
  formWatch (newVal: LowProps, oldVal: LowProps) {
    // 将参数添加进去
    this.handleUpdate();
  }
  handleUpdate () {
    this.$store.commit('UPDATE_CURRENT_PROPS', { ...this.form })
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