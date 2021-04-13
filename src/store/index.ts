import { LowElement } from '@/types/Element'
import { History } from 'stateshot'
import { getFinderFunctionByChildKeyFromTree } from '@/utils'
// import LowElement from '../types/Element'
import Vue from 'vue'
import Vuex from 'vuex'
import PageStore from './modules/Page';
import { cloneDeep } from 'lodash'
import db from '@/plugins/db'

const history = new History();

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
  currentId: string | undefined | null;
  elements: LowElement;
}

const store = new Vuex.Store<StateType>({
  modules: {
    page: PageStore
  },
  state: {
    currentId: undefined,
    elements: db.get('elements').value()
  },
  getters: {
    current (state) {
      if (typeof state.currentId === 'string') {
        const find = getFinderFunctionByChildKeyFromTree(state.elements);
        const resData = find(state.currentId)
        return Array.isArray(resData) ? resData[1] : resData;
      }
      return null;
    },
    // 扁平化结构
    flatElements (state) {
      return flattenElementsDeep(state.elements);
    }
  },
  mutations: {
    UPDATE (state) {
      // 添加到历史
      // console.log('history', history.get());
      history.pushSync(state.elements);
      // console.log('history', history.get());

    },
    UNDO (state) {
      state.elements = history.undo().get();
    },
    REDO (state) {
      state.elements = history.redo().get();
    },
    SET_CURRENT (state, payload: string) {
      state.currentId = payload;
    },
    BIND_MODELS (state, payload) {
      if (typeof state.currentId !== 'string') return;
      const find = getFinderFunctionByChildKeyFromTree(state.elements);
      let [parent, current] = find(state.currentId);

      if (current) {
        current = current as LowElement;
        current.models = payload;
      }
    },
    UPDATE_CURRENT_PROPS (state, payload: any) {
      if (typeof state.currentId !== 'string') return;
      const find = getFinderFunctionByChildKeyFromTree(state.elements);
      let [parent, current, index] = find(state.currentId);
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
    },
    REMOVE_CURRENT (state) {
      if (typeof state.currentId !== 'string') return;
      const find = getFinderFunctionByChildKeyFromTree(state.elements);
      let [parent, current, index] = find(state.currentId);
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
    },
    REFRESH_ELEMENTS (state) {
      state.elements = cloneDeep(state.elements);
    }
  },
  actions: {
    refresh ({ commit }) {
      commit('REFRESH_ELEMENTS');
    }
  },
});

store.subscribe((mutation, state) => {
  console.log('state', state);
  db.set('elements', state.elements).write();
});

export default store;
