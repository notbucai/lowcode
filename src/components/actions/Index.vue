<!--
 * @Author: bucai
 * @Date: 2021-02-19 15:58:38
 * @LastEditors: bucai
 * @LastEditTime: 2021-03-23 23:08:10
 * @Description:
-->
<template>
  <div class="Index" style="margin-top: 10px">
    <div v-if="current">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid #eee;
          padding-bottom: 8px;
        "
      >
        <el-button type="success" @click="handleCreateAction()" size="mini"
          >添加</el-button
        >
      </div>
      <div
        v-for="action in current.actions"
        :key="action.key"
        style="padding: 10px; margin-bottom: 12px"
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
          "
        >
          <span>{{ action.name }}</span>
          <div>
            <el-button
              type="primary"
              @click="handleEditAction(action)"
              size="mini"
              >编辑</el-button
            >
            <el-button
              type="danger"
              @click="handleRemoveAction(action)"
              size="mini"
              >删除</el-button
            >
          </div>
        </div>
        <div
          v-for="(handle, index) in action.handle"
          :key="handle.key"
          style="
            padding: 6px 10px;
            border: 1px solid #eee;
            margin-top: 8px;
            color: #878769;
            font-size: 14px;
          "
        >
          <div>{{ index + 1 }}. {{ handle.name }}</div>
        </div>
      </div>
      <div
        class="formAction"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 8px;
        "
      >
        <el-button size="mini" @click="handleClose">取消</el-button>
      </div>
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
              v-for="item in optionalOptions"
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
              @click="handleRemoveActionHandle(index)"
              >移除</el-button
            >
          </div>
        </div>
        <div style="text-align: center">
          <el-button
            type="primary"
            size="mini"
            @click="
              form.handle.push({
                name: '',
                link: [],
              })
            "
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
import { generateUUID } from '@/utils';

let flatElementsWatchTimer = -1;
let currentWatchTimer = -1;

@Component({
  name: 'low-actions',
})
export default class LowActions extends Vue {

  @Getter('current')
  current?: LowElement;

  @Getter('flatElements')
  flatElements?: LowElement[];

  @State('elements')
  elements?: LowElement;

  @State('_actions', { namespace: 'page' })
  actions?: any;

  get actionsKeys () {
    return Object.keys(this.actions || {});
  }

  get actionsValues () {
    return Object.values(this.actions || {});
  }

  visible = false;

  options: any[] = [];

  get optionalOptions () {
    const actions = this.current?.actions;
    if (!actions) {
      return this.options;
    }
    if ((this.form as any).key) {
      return this.options;
    }
    return this.options.filter(item => {
      return !actions.find(action => action.event === item.key)
    });
  }

  form = {
    name: '',
    event: '',
    handle: [
      {
        name: '',
        link: [],
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
  @Watch('current')
  currentWatch () {
    clearTimeout(currentWatchTimer);
    currentWatchTimer = setTimeout(() => {
      this.initActionOptions();
    }, 300);
  }

  created () {
    this.initLinkOptions();
    this.initActionOptions();
  }

  initActionOptions () {
    const element = this.current?.element;
    if (!element) return;
    const component = components.find(item => item.name === element)
    if (!component) return;
    this.options = (component.component.actioOptions || []).filter((item: any) => {
      return !item.beIncluded || this.hasElementExistParentsByElement(item.beIncluded)
    });
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
  handleCreateAction () {

    this.form = {
      name: '',
      event: '',
      handle: [
        {
          name: '',
          link: []
        }
      ]
    };
    this.$nextTick(() => {
      if (!this.optionalOptions.length) {
        this.$message.warning('组件上没有可用的动作了');
        return;
      }
      this.visible = true;
    });
  }
  handleSaveOrEdit () {
    (this.$refs['form'] as any).validate((valid: boolean) => {
      if (!valid) return false;
      const form = cloneDeep(this.form as any);
      if (!form.handle || !form.handle.length) {
        return this.$message.warning("至少要添加一个具体动作");
      }
      const isEdit = form.key;
      if (!form.key) {
        form.key = generateUUID();
      }
      form.handle = form.handle.map((item: any) => {
        const [type, namespace, key] = item.link;
        item.link = `${type}_${namespace}.${key}`;
        if (!item.key) {
          item.key = generateUUID();
        }
        return item;
      });
      const actions: LowElementAction = form;
      if (this.current) {
        if (!this.current.actions) {
          this.current.actions = [];
        }
        if (isEdit) {
          const index = this.current.actions.findIndex((item) => item.key === form.key);
          this.current.actions.splice(index, 1, actions);
        } else {
          this.current.actions.push(actions);
        }
      }
      this.visible = false;
    });
  }

  handleEditAction (action: any) {
    const cloneAction = cloneDeep(action);

    cloneAction.handle = cloneAction.handle.map((item: any) => {
      const [location, key] = item.link.split('.');
      const [type, namespace] = location.split('_');
      item.link = [type, namespace, key];
      return item;
    });

    this.form = cloneAction;
    this.visible = true;
  }

  handleRemoveAction (action: any) {
    if (!this.current) return;
    const index = this.current?.actions?.findIndex(item => {
      return item.key === action.key;
    });
    if (typeof index === 'undefined') return;

    this.current?.actions?.splice(index, 1);
  }

  handleRemoveActionHandle (index: number) {
    console.log('index', index);
    // this.current?.actions?.splice(index, 1);
    this.form.handle.splice(index, 1);
  }

  handleClose () {
    this.$store.commit("SET_CURRENT", undefined);
  }

  hasElementExistParentsByElement (element: string) {
    const current = this.current;
    if (!current) return false;

    const find = (list: any[], id: string) => {
      let resList: any[] = [];
      list.forEach(item => {
        if (item.children && item.children.length) {
          const res = find(item.children, id);
          if (res && res.length) {
            resList.push(item, ...res);
          }
        }
        if (item.id === id) {
          resList.push(item);
        }
      });

      return resList;
    };
    const id = current.id;

    const chainList = find(this.elements?.children || [], id);
    // 去掉当前的元素
    chainList.pop();
    const is = chainList.find(item => item.element === element);
    return is;
  }
}
</script>
<style lang="scss" scoped>
</style>