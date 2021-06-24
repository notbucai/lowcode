/**
 * @description 模型、类型 的值（默认值） 均为序列数据 需要反序列成对应类型数据
 */
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { cloneDeep } from 'lodash'
import { History } from 'stateshot'

import router from '@/router';
import db from '@/plugins/db';
import { getFinderFunctionByChildKeyFromTree } from '@/utils'
import { LowElement } from '@/types/Element';

const history = new History();

const flattenElementsDeep = (element: LowElement) => {
   const arr = [element];

   element.children?.forEach(item => {
      const list = flattenElementsDeep(item);
      arr.push(...list);
   });

   return arr;
}

export type TypeType = {
   type: string;
   value: string;
   label: string;
}
export type EntityType = {
   key: string; // 绑定的字段 输入
   name: string; // 实体名称 输入
   type: string, // 数据类型 选择
   value: string, // 默认值 输入
}

export type ModelType = {
   name: string; // 数据源名称
   key: string; // 绑定的字段 该字段创建的时候生成
   // 实体
   entitys: EntityType[];
}

@Module({
   namespaced: true,
})
class PageStore extends VuexModule {

   /**
    * 页面当前选中id
    */
   currentId: string | undefined | null = undefined;
   /**
    * 页面当前元素列表
    */
   elements: LowElement = db.get('elements').value();

   /**
    * 数据类型
    */
   types: TypeType[] = [
      {
         type: 'string',
         value: '""',
         label: "字符串"
      },
      {
         type: 'number',
         value: '0',
         label: "数字"
      },
      {
         type: 'boolean',
         value: 'false',
         label: "布尔"
      },
      {
         type: 'array',
         value: '[]',
         label: "数组"
      },
   ];
   /**
    * 模型
    */
   models: ModelType[] = [
      // {
      //    name: "表单", // 数据源名称
      //    key: 'model_1a52926d55f3', // 绑定的字段 该字段创建的时候生成
      //    // 实体
      //    entitys: [
      //       {
      //          key: 'username', // 绑定的字段 输入
      //          name: "用户名", // 实体名称 输入
      //          type: 'string', // 数据类型 选择
      //          value: '""', // 默认值 输入
      //       },
      //       {
      //          key: 'password', // 绑定的字段 输入
      //          name: "密码", // 实体名称 输入
      //          type: 'string', // 数据类型 选择
      //          value: '""', // 默认值 输入
      //       },
      //       // ...more
      //    ]
      // },
      // {
      //    name: "测试", // 数据源名称
      //    key: 'model_42124s1ar2', // 绑定的字段 该字段创建的时候生成
      //    // 实体
      //    entitys: [
      //       {
      //          key: 'token', // 绑定的字段 输入
      //          name: "token", // 实体名称 输入
      //          type: 'string', // 数据类型 选择
      //          value: '""', // 默认值 输入
      //       },
      //       // ...more
      //    ]
      // }
   ]

   /**
    * 数据
    */
   data: any = {
      // model_1a52926d55f3: {
      //    username: '默认1',
      //    password: '默认2'
      // },
      // model_42124s1ar2: {
      //    token: ''
      // }
   }


   /**
    * 动作
    */
   _actions: any = {
      // fetch: {
      //    name: "接口请求",
      //    actions: [
      //       {
      //          key: 'action_efhj123sadufk235ur',
      //          name: "登录",
      //          handle: 'POST[/api/login]',
      //          data: {
      //             bind: 'model_1a52926d55f3',
      //             recv: 'model_2345423.token'
      //          }
      //       },
      //       {
      //          key: 'action_sjy723nju431sew234d',
      //          name: "删除单个用户",
      //          handle: 'POST[/api/table/delete]',
      //          data: {
      //             bind: 'model_123midn3u1s.list.$[index]',
      //             replace: ['index']
      //          }
      //       }
      //    ]
      // },
      // dialog: {
      //    name: "对话框",
      //    handle: []
      // }
   }


   // ---------------------------------------------
   // -----------------getters--------------------
   // ---------------------------------------------
   /**
    * 当前选择元素
    */
   get current () {
      const state = this;
      if (typeof state.currentId === 'string') {
         const find = getFinderFunctionByChildKeyFromTree(state.elements);
         const resData = find(state.currentId)
         return Array.isArray(resData) ? resData[1] : resData;
      }
      return null;
   }

   /**
    * 扁平后元素列表
    */
   get flatElements () {
      const state = this;
      return flattenElementsDeep(state.elements);
   }

   // ---------------------------------------------
   // -----------------Action--------------------
   // ---------------------------------------------

   /**
    * 初始化模型
    */
   @Action
   init () {
      this.context.commit('CLEAR_MODELS');
      this.context.commit('INIT_ACTIONS');
      // 自定义数据

      // 初始化示例models
      const models = db.get('models').value();
      if (models && models.length) {
         models.forEach((item: ModelType) => {
            this.context.commit('ADD_MODEL', item);
         });
      } else {

         this.context.commit('ADD_MODEL', {
            name: "Token", // 数据源名称
            key: 'model_2345423', // 绑定的字段 该字段创建的时候生成
            // 实体
            entitys: [
               {
                  key: 'token', // 绑定的字段 输入
                  name: "token", // 实体名称 输入
                  type: 'string', // 数据类型 选择
                  value: '""', // 默认值 输入
               },
            ]
         });

         this.context.commit('ADD_MODEL', {
            name: "搜索", // 数据源名称
            key: 'model_1a529333123sdf', // 绑定的字段 该字段创建的时候生成
            // 实体
            entitys: [
               {
                  key: 'name', // 绑定的字段 输入
                  name: "用户名", // 实体名称 输入
                  type: 'string', // 数据类型 选择
                  value: '""', // 默认值 输入
               },
            ]
         });

         this.context.commit('ADD_MODEL', {
            name: "登录表单", // 数据源名称
            key: 'model_1a52926d55f3', // 绑定的字段 该字段创建的时候生成
            // 实体
            entitys: [
               {
                  key: 'username', // 绑定的字段 输入
                  name: "用户名", // 实体名称 输入
                  type: 'string', // 数据类型 选择
                  value: '""', // 默认值 输入
               },
               {
                  key: 'password', // 绑定的字段 输入
                  name: "密码", // 实体名称 输入
                  type: 'string', // 数据类型 选择
                  value: '""', // 默认值 输入
               },
               // ...more
            ]
         })
         this.context.commit('ADD_MODEL', {
            name: '登录规则',
            key: 'rules',
            entitys: [
               {
                  key: 'username',
                  name: '用户名规则',
                  value: JSON.stringify([{ required: true, message: '必填', trigger: 'blur' }]),
                  type: 'object'
               },
               {
                  key: 'password',
                  name: '密码规则',
                  value: JSON.stringify([{ required: true, message: '请选择', trigger: 'blur' }]),
                  type: 'object'
               }
            ]
         });

         this.context.commit('ADD_MODEL', {
            name: '用户列表',
            key: 'model_123midn3u1s',
            entitys: [
               {
                  key: 'list',
                  name: '列表',
                  value: JSON.stringify([{ id: 1, name: '123' }, { id: 2, name: '333' }]),
                  type: 'array'
               },
               {
                  key: 'total',
                  name: '数量',
                  value: JSON.stringify(2),
                  type: 'number'
               }
            ]
         });

         const { params, query } = router.currentRoute;

         this.context.commit('ADD_MODEL', {
            name: '页面PAREMS参数',
            key: 'parems',
            entitys: Object.keys(params).map(key => {
               return {
                  key: key,
                  name: key,
                  value: JSON.stringify(params[key]),
                  type: 'string'
               }
            })
         });

         this.context.commit('ADD_MODEL', {
            name: '页面QUEYR参数',
            key: 'query',
            entitys: Object.keys(query).map(key => {
               return {
                  key: key,
                  name: key,
                  value: JSON.stringify(query[key]),
                  type: 'string'
               }
            })
         });

         this.context.commit('ADD_MODEL', {
            name: 'localStorage',
            key: 'localStorage',
            entitys: Array(localStorage.length).fill('').map((_, i) => localStorage.key(i)).filter(key => typeof key === 'string').map((key: string) => {
               return {
                  key: key,
                  name: key,
                  value: JSON.stringify(localStorage.getItem(key)),
                  type: 'string'
               }
            })
         });
      }

      // 初始化示例动作
      const actions = db.get('actions').value();
      if (actions && Object.keys(actions).length) {
         Object.keys(actions).forEach((key: any) => {
            actions[key].actions.forEach((aItem: any) => {
               this.context.commit('UPDATE_ACTION', {
                  type: key,
                  key: aItem.key,
                  data: aItem
               });
            });

         });
      } else {
         const _actions: any = {
            fetch: {
               name: "接口请求",
               actions: [
                  {
                     key: 'action_efhj123sadufk235ur',
                     name: "登录",
                     handle: 'POST[/api/login]',
                     data: {
                        bind: 'model_1a52926d55f3',
                        recv: 'model_2345423.token'
                     }
                  },
                  {
                     key: 'action_sjy723nju431sew234d',
                     name: "删除单个用户",
                     handle: 'POST[/api/table/delete]',
                     data: {
                        bind: 'model_123midn3u1s.list.$[index]',
                        replace: ['index']
                     }
                  }
               ]
            },
            dialog: {
               name: "对话框",
               handle: []
            }
         };
         Object.keys(_actions).forEach((key: string) => {

            _actions[key].actions.forEach((aItem: any) => {
               this.context.commit('UPDATE_ACTION', {
                  type: key,
                  key: aItem.key,
                  data: aItem
               });
            });
         });

      }

   }

   /**
    * 刷新
    */
   @Action
   refresh () {
      this.context.commit('REFRESH_ELEMENTS');
   }
   /**
    * 清空画布
    */
   @Action
   clear_canvas () {
      this.context.commit('CLEAR_ELEMENTS')
      this.context.commit('CLEAR_MODELS')
   }

   /**
    * 编辑或添加模型
    * @param payload 
    */
   @Action
   handleEditOrAddModel (payload: ModelType) {
      const findModel = this.models.find(model => {
         return model.key === payload.key;
      });

      if (findModel) {
         this.context.commit('UPDATE_MODEL', payload);
      } else {
         this.context.commit('ADD_MODEL', payload);
      }
   }

   // ---------------------------------------------
   // -----------------Mutation--------------------
   // ---------------------------------------------
   /**
    * 清除元素
    */
   @Mutation
   CLEAR_ELEMENTS () {
      const state = this;
      state.elements = {
         "id": "c6174605-fb74-4fcb-884e-1a52926d55f3",
         "element": "layout", // 元素名称 or 类型
         "type": "container", // container or element
         "children": []
      };
   }
   /**
    * 更新历史
    */
   @Mutation
   UPDATE () {
      const state = this;
      // 添加到历史
      // console.log('history', history.get());
      history.pushSync(state.elements);
      // console.log('history', history.get());

   }
   /**
    * 撤回
    */
   @Mutation
   UNDO () {
      this.elements = history.undo().get();
   }
   /**
    * 取消撤回（反相撤回）
    */
   @Mutation
   REDO () {
      this.elements = history.redo().get();
   }
   /**
    * 设置当前元素
    * @param payload 
    */
   @Mutation
   SET_CURRENT (payload: string) {
      this.currentId = payload;
   }
   /**
    * 绑定模型
    * @param payload 
    */
   @Mutation
   BIND_MODELS (payload: any) {
      if (typeof this.currentId !== 'string') return;
      const find = getFinderFunctionByChildKeyFromTree(this.elements);
      let [parent, current] = find(this.currentId);

      if (current) {
         current = current as LowElement;
         current.models = payload;
      }
   }
   /**
    * 更新当前选中元素的参数
    * @param payload 
    */
   @Mutation
   UPDATE_CURRENT_PROPS (payload: any) {
      if (typeof this.currentId !== 'string') return;
      const find = getFinderFunctionByChildKeyFromTree(this.elements);
      let [parent, current, index] = find(this.currentId);
      if (current) {
         current = current as LowElement;
         parent = parent as LowElement;
         // index = index as number;

         current.props = payload;
         // const id = current.id;
         // TODO: 这里有问题
         // if (parent && Array.isArray(parent.children)) {
         //   // index = parent.children.findIndex(item => item.id === id)
         //   // parent.children.splice(index, 1, current);
         // }
      }
   }
   /**
    * 移除当前元素
    */
   @Mutation
   REMOVE_CURRENT () {
      if (typeof this.currentId !== 'string') return;
      const find = getFinderFunctionByChildKeyFromTree(this.elements);
      let [parent, current, index] = find(this.currentId);
      if (current) {
         current = current as LowElement;
         parent = parent as LowElement;
         // index = index as number;
         const id = current.id;

         if (parent && Array.isArray(parent.children)) {
            index = parent.children.findIndex(item => item.id === id)
            parent.children.splice(index, 1);
         }
      }
   }
   /**
    * 刷新缓存
    */
   @Mutation
   REFRESH_ELEMENTS () {
      this.elements = cloneDeep(this.elements);
   }

   /**
    * 清空数据
    */
   @Mutation
   CLEAR_MODELS () {
      this.models = [];
      this.data = {};
      this._actions = [];
   }

   /**
    * 生成数据结构
    * @param model 模型
    */
   GENERATE_DATA (model: ModelType) {
      // 生成数据
      return
   }

   /**
    * 增加模型
    * @param model 模型
    */
   @Mutation
   ADD_MODEL (model: ModelType) {
      this.models.push(model);
      // 生成数据
      this.data[model.key] = model.entitys.reduce((pv: any, cv) => {
         // 反序列数据
         pv[cv.key] = JSON.parse(cv.value);
         return pv;
      }, {});
      this.data = Object.assign({}, this.data);
      db.set('models', this.models).write();
   }
   /**
    * 更新模型
    * @param model 模型
    */
   @Mutation
   UPDATE_MODEL (model: ModelType) {
      const index = this.models.findIndex(item => {
         return item.key === model.key;
      });

      if (index === -1) {
         return;
      }
      // 修改模型
      this.models.splice(index, 1, model);
      // 生成数据
      this.data[model.key] = model.entitys.reduce((pv: any, cv) => {
         // 反序列数据
         pv[cv.key] = JSON.parse(cv.value);
         return pv;
      }, {});
      this.data = Object.assign({}, this.data);
      db.set('models', this.models).write();
   }
   /**
    * 删除模型
    * @param model 模型
    */
   @Mutation
   REMOVE_MODEL (key: string) {
      const index = this.models.findIndex(item => {
         return item.key === key;
      });
      this.models.splice(index, 1);
      db.set('models', this.models).write();
   }


   @Mutation
   INIT_ACTIONS () {

      this._actions = {
         fetch: {
            name: '接口请求',
            actions: []
         },
         dialog: {
            name: '对话框',
            actions: []
         }
      };
   }

   /**
   * 删除动作
   */
   @Mutation
   REMOVE_ACTION ({ type, key }: { type: string, key: string }) {
      const index = this._actions[type].actions.findIndex((item: any) => {
         return item.key == key;
      });
      this._actions[type].actions.splice(index, 1);
      db.set('actions', this._actions).write();
   }


   /**
   * 更新动作
   */
   @Mutation
   UPDATE_ACTION ({ type, key, data }: {
      type: string, key: string, data: object
   }) {
      const index = this._actions[type].actions.findIndex((item: any) => {
         return item.key == key;
      });
      if (index === -1) {
         this._actions[type].actions.push(data);
      } else {
         this._actions[type].actions.splice(index, 1, data);
      }
      db.set('actions', this._actions).write();
   }

}

export default PageStore;
