import { LowElement, LowElementAction } from '@/types/Element'
// import LowElement from '../types/Element'
import Vue from 'vue'
import Vuex from 'vuex'
import PageStore from './modules/page';
import db from '@/plugins/db'
import PageEntity, { ModelType } from './entities/Page';
import { generateUUID } from '@/utils';
import { cloneDeep, throttle } from 'lodash';

export type TypeType = {
  type: string;
  value: string;
  label: string;
}

Vue.use(Vuex);

const flattenElementsDeep = (element: LowElement) => {
  const arr = [element];

  element.children?.forEach(item => {
    const list = flattenElementsDeep(item);
    arr.push(...list);
  });

  return arr;
}

type StateType = {
  pages: PageEntity[],
  globalData: any,
  globalActions: any,
  globalModels: ModelType[],
  types: TypeType[],
}

const store = new Vuex.Store<StateType>({
  modules: {
    page: PageStore,
  },
  state: {

    /**
     * 数据类型
     */
    types: [
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
    ],
    pages: [],
    /**
 * 数据
 */
    globalData: {
      // model_1a52926d55f3: {
      //    username: '默认1',
      //    password: '默认2'
      // },
      // model_42124s1ar2: {
      //    token: ''
      // }
    },
    globalActions: {
      fetch: {
        name: '接口请求',
        actions: []
      },
      dialog: {
        name: '对话框',
        actions: []
      }
    },
    /**
     * 模型
     */
    globalModels: [
      // {
      //    name: "表单", // 数据源名称
      //    key: 'model_1a52926d55f3', // 绑定的字段 该字段创建的时候生成
      //    // 实体
      //    entities: [
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
      //    entities: [
      //       {
      //          key: 'token', // 绑定的字段 输入
      //          name: "token", // 实体名称 输入
      //          type: 'string', // 数据类型 选择
      //          value: '""', // 默认值 输入
      //       },
      //       // ...more
      //    ]
      // }
    ],
  },
  getters: {

  },
  mutations: {
    INIT_PAGE (state, payload) {
      state.pages = payload;
    },

    ADD_PAGE (state, payload) {
      state.pages.push(payload);
    },

    UPDATE_PAGE (state, payload) {
      const index = state.pages.findIndex(item => item.id === payload.id);
      const page = state.pages[index];
      if (page) {
        page.title = payload.title;
        page.icon = payload.icon;
        state.pages.splice(index, 1, payload);
      }
    },

    REMOVE_PAGE (state, id) {
      const index = state.pages.findIndex(item => item.id === id);
      state.pages.splice(index, 1);
    },

    INIT_GLOBAL_ACTIONS (state) {

    },
    /**
    * 删除动作
    */
    REMOVE_ACTION (state, { type, key }: { type: string, key: string }) {
      const index = state.globalActions[type].actions.findIndex((item: any) => {
        return item.key == key;
      });
      state.globalActions[type].actions.splice(index, 1);
      db.set('actions', state.globalActions).write();
    },

    /**
    * 更新动作
    */
    UPDATE_ACTION (state, { type, key, data }: {
      type: string, key: string, data: object
    }) {
      const index = state.globalActions[type].actions.findIndex((item: any) => {
        return item.key == key;
      });
      if (index === -1) {
        state.globalActions[type].actions.push(data);
      } else {
        state.globalActions[type].actions.splice(index, 1, data);
      }
      db.set('actions', state.globalActions).write();
    },
    /**
     * 清空数据
     */
    CLEAR_MODELS (state) {
      state.globalModels = [];
      state.globalData = {};
    },

    /**
     * 生成数据结构
     * @param model 模型
     */
    GENERATE_DATA (state, model: ModelType) {
      // 生成数据
      return
    },
    /**
     * 增加模型
     * @param model 模型
     */
    ADD_MODEL (state, model: ModelType) {
      state.globalModels.push(model);
      // 生成数据
      state.globalData[model.key] = model.entities.reduce((pv: any, cv) => {
        // 反序列数据
        pv[cv.key] = JSON.parse(cv.value);
        return pv;
      }, {});
      state.globalData = Object.assign({}, state.globalData);
      db.set('models', state.globalModels).write();
    },
    /**
     * 更新模型
     * @param model 模型
     */
    UPDATE_MODEL (state, model: ModelType) {
      const index = state.globalModels.findIndex(item => {
        return item.key === model.key;
      });

      if (index === -1) {
        return;
      }
      // 修改模型
      state.globalModels.splice(index, 1, model);
      // 生成数据
      state.globalData[model.key] = model.entities.reduce((pv: any, cv) => {
        // 反序列数据
        pv[cv.key] = JSON.parse(cv.value);
        return pv;
      }, {});
      state.globalData = Object.assign({}, state.globalData);
      db.set('models', state.globalModels).write();
    },
    /**
     * 删除模型
     * @param model 模型
     */
    REMOVE_MODEL (state, key: string) {
      const index = state.globalModels.findIndex(item => {
        return item.key === key;
      });
      state.globalModels.splice(index, 1);
      db.set('models', state.globalModels).write();
    }
  },
  actions: {
    init ({ dispatch }) {
      // 初始化models
      dispatch('initPages');
      dispatch('initGlobalModels');
      dispatch('initGlobalActions');

      let page = new PageEntity();
      const pages = db.get('pages').value();
      if (Array.isArray(pages) && pages.length) {
        page = pages[0];
      } else {
        dispatch('addPage', page);
      }
      dispatch('page/init', page);
    },

    initPages (state) {
      const pages = db.get('pages').value();
      // INIT_PAGE
      if (pages && Object.keys(pages).length) {
        state.commit('INIT_PAGE', pages);
      }
    },
    addPage (state, payload) {
      let page = new PageEntity();
      page.title = payload.title;
      page.icon = payload.icon;

      state.commit('ADD_PAGE', page);
    },
    updatePage (state, payload) {
      state.commit('UPDATE_PAGE', payload);
    },
    removePage (state, id) {
      state.commit('REMOVE_PAGE', id);
    },
    async selectPage (state, id) {
      const index = state.state.pages.findIndex(item => item.id === id);
      const page = state.state.pages[index];
      if (!page) throw new Error('page is no find');
      // 保存当前页面
      await state.dispatch('page/save');
      // 切换到新页面
      await state.dispatch('page/init', page);
    },


    initGlobalModels (state) {
      state.commit('CLEAR_MODELS');

      const models = db.get('globalModels').value();
      if (models && Object.keys(models).length) {
        models.forEach((item: ModelType) => {
          state.commit('ADD_MODEL', item);
        });
      }
    },

    /**
     * 编辑或添加模型
     * @param payload 
     */
    handleEditOrAddModel (store, payload: ModelType) {
      const findModel = store.state.globalModels.find(model => {
        return model.key === payload.key;
      });

      if (findModel) {
        store.commit('UPDATE_MODEL', payload);
      } else {
        store.commit('ADD_MODEL', payload);
      }
    },

    initGlobalActions (state) {
      // 初始化示例动作
      const actions = db.get('globalActions').value();
      if (actions && Object.keys(actions).length) {
        Object.keys(actions).forEach((key: any) => {
          actions[key].actions.forEach((aItem: any) => {
            state.commit('UPDATE_ACTION', {
              type: key,
              key: aItem.key,
              data: aItem
            });
          });

        });
      } else {
        const globalActions: any = {
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
        Object.keys(globalActions).forEach((key: string) => {

          globalActions[key].actions.forEach((aItem: any) => {
            state.commit('UPDATE_ACTION', {
              type: key,
              key: aItem.key,
              data: aItem
            });
          });
        });

      }
    }
  },

});

store.subscribe(throttle((mutation, state: any) => {

  const currentPage: PageEntity = state.page;
  const pages: PageEntity[] = cloneDeep(state.pages);

  const findPage = pages.find(item => item.id === currentPage.id);

  if (findPage) {
    findPage.title = currentPage.title;
    findPage.icon = currentPage.icon;
    findPage.elements = currentPage.elements;
  }

  db.set('pages', state.pages).write();
  db.set('globalModels', state.globalModels).write();
  db.set('globalActions', state.globalActions).write();

}, 300));

export default store;
