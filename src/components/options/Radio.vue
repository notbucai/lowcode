<template>
  <div class="row-option">
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      size="mini"
      label-position="top"
    >
      <el-row :gutter="2" v-for="(item, index) in form.options" :key="index">
        <el-col :span="9" :offset="0">
          <el-form-item label="标签">
            <el-input v-model="item.label"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="值">
            <el-input v-model="item.value"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="0">
          <el-form-item label=" 操作 ">
            <el-button
              type="text"
              size="medium"
              @click="form.options.splice(index, 1)"
              icon="el-icon-remove-outline"
            ></el-button>
            <el-button
              type="text"
              size="medium"
              icon="el-icon-circle-plus-outline"
              v-if="index + 1 == form.options.length"
              @click="
                form.options.push({
                  label: '备选项' + String(form.options.length * index),
                  value: String(form.options.length * index),
                })
              "
            ></el-button>
          </el-form-item>
        </el-col>
      </el-row>

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
  options: any[]
}

@Component({

})
export default class Radio extends BaseOptions {

  get props () {
    return this.element ? this.element.props : null
  }

  rules = {

  };

  form: LowProps = {
    options: [],
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