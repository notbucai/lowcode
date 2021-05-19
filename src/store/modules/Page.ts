/**
 * @description 模型、类型 的值（默认值） 均为序列数据 需要反序列成对应类型数据
 */
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import router from '@/router';
import db from '@/plugins/db';

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
      console.log('actions',actions);
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
         const _actions:any = {
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

   /**
    * 清空数据
    */
   @Mutation
   CLEAR_MODELS () {
      this.models = [];
      this.data = {};
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
