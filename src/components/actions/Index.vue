<!--
 * @Author: bucai
 * @Date: 2021-02-19 15:58:38
 * @LastEditors: bucai
 * @LastEditTime: 2021-03-23 13:52:36
 * @Description:
-->
<template>
  <div class="Index">
    <div v-if="current">
      <el-select value="" placeholder="请选择" v-if="options && options.length">
        <el-option
          v-for="item in options"
          :key="item.key"
          :label="item.name"
          :value="item.key"
        >
        </el-option>
      </el-select>
    </div>
    <div v-else>
      <!-- 全局 事件 列表 -->
      <el-scrollbar class="aside-scrollbar">
        <el-collapse v-if="!current">
          <el-collapse-item
            :title="actions[key].name"
            :name="actions[key].name"
            v-for="key in actionsKeys"
            :key="key"
          >
            <div
              class="low-model-item"
              v-for="action in actions[key].actions"
              :key="action.key"
            >
              <pre
                style="font-size: 12px; line-height: 1.4; padding: 4px 10px"
                >{{ JSON.stringify(action, null, 2) }}</pre
              >
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
    <el-dialog
      title="添加/编辑 动作"
      :visible.sync="visible"
      width="500px"
      @close="visible = false"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="mini"
      >
        <el-form-item label="事件" prop="event">
          <!-- <el-input v-model="form.event"></el-input> -->
          <el-select
            v-model="form.event"
            placeholder="请选择组件内部事件"
            clearable
            filterable
          >
            <el-option
              v-for="item in options"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件名称" prop="name">
          <el-input v-model="form.name" placeholder="事件名称"></el-input>
        </el-form-item>
        <div
          style="
            padding: 10px;
            margin-left: 24px;
            margin-bottom: 10px;
            border: 1px solid #f4f5f6;
          "
          v-for="(handle, index) in form.handle"
          :key="index"
        >
          <el-form-item
            label="动作名称"
            :prop="'handle.' + index + '.name'"
            :rules="{ required: true, message: '不能为空', trigger: 'blur' }"
          >
            <el-input v-model="handle.name" placeholder="动作名称"></el-input>
          </el-form-item>
          <el-form-item
            label="链接动作"
            :prop="'handle.' + index + '.link'"
            :rules="{
              required: true,
              message: '请选择链接动作',
              trigger: 'change',
            }"
          >
            <!-- <el-input v-model="handle.link" placeholder="链接动作"></el-input> -->
            <el-cascader
              v-model="handle.link"
              :options="linkOptions"
            ></el-cascader>
          </el-form-item>
          <div style="text-align: center">
            <el-button
              type="warning"
              size="mini"
              @click="form.handle.shift(index, 1)"
              >移除</el-button
            >
          </div>
        </div>
        <div style="text-align: center">
          <el-button type="primary" size="mini" @click="form.handle.push({})"
            >添加</el-button
          >
        </div>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="visible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="handleSaveOrEdit"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { cloneDeep } from 'lodash';

import { LowElement, LowElementAction } from '@/types/Element';
import { Component, Vue, Provide, Watch } from 'vue-property-decorator';
import { Getter, State } from 'vuex-class';

import components from '../common'

let flatElementsWatchTimer = -1;

@Component({
  name: 'low-actions',
})
export default class LowActions extends Vue {

  @Getter('current')
  current?: LowElement;

  @Getter('flatElements')
  flatElements?: LowElement[];

  @State('_actions', { namespace: 'page' })
  actions?: any;

  get actionsKeys () {
    return Object.keys(this.actions || {});
  }

  get actionsValues () {
    return Object.values(this.actions || {});
  }

  visible = true;

  options: any[] = [];

  form = {
    name: '',
    event: '',
    handle: [
      {
        name: '',
        link: '',
      }
    ]
  };

  rules: any = {
    event: [
      { required: true, message: '请选择', trigger: 'change' },
    ],
    name: [
      { required: true, message: '请输入', trigger: 'blur' },
    ],
    handle: [
      { type: 'array', required: true, message: '至少有一个具体动作', trigger: 'change' }
    ],
  };

  linkOptions: any[] = [];

  @Watch('flatElements')
  flatElementsWatch () {
    clearTimeout(flatElementsWatchTimer);
    flatElementsWatchTimer = setTimeout(() => {
      this.initLinkOptions();
    }, 300);
  }

  created () {
    this.initLinkOptions();
    const element = this.current?.element;
    if (!element) return;
    const component = components.find(item => item.name === element)
    if (!component) return;
    this.options = component.component.actioOptions || [];
  }

  initLinkOptions () {
    console.log('this.flatElements', this.flatElements);

    if (this.flatElements) {

      const elementActions: any = cloneDeep(this.flatElements).filter(item => item.actions && item.actions.length).map((item: any) => {
        item.value = item.id;
        item.label = item.element;
        item.children = (item.actions || []).map((item: any) => {
          item.label = item.name;
          item.value = item.key;
          return item;
        });
        return item;
      });
      const globalActions: any = cloneDeep(this.actionsKeys).map((key: string) => {
        const item = this.actions[key];
        item.value = key;
        item.label = item.name;
        item.children = (item.actions || []).map((item: any) => {
          item.label = item.name;
          item.value = item.key;
          return item;
        });
        return item;
      });

      this.linkOptions = [{
        label: "全局",
        value: 'global',
        children: globalActions || []
      }, {
        label: "元素",
        value: 'element',
        children: elementActions
      }];
    }
  }
  handleSaveOrEdit () {
    (this.$refs['form'] as any).validate((valid: boolean) => {
      if (!valid) return false;
      console.log(this.form);
    });
  }
}
</script>
<style lang="scss" scoped>
</style>