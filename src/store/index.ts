import { LowElement } from '@/types/Element'
import { getFinderFunctionByChildKeyFromTree } from '@/utils'
// import LowElement from '../types/Element'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type StateType = {
  currentId: string | undefined | null;
  elements: LowElement;
}

export default new Vuex.Store<StateType>({
  state: {
    currentId: undefined,
    elements: {
      "id": "c6174605-fb74-4fcb-884e-1a52926d55f3",
      "element": "layout", // 元素名称 or 类型
      "type": "container", // container or element
      "children": [
      ]
    }
  },
  getters: {
    current (state) {
      if (typeof state.currentId === 'string') {
        const find = getFinderFunctionByChildKeyFromTree(state.elements);
        const resData = find(state.currentId)
        return Array.isArray(resData) ? resData[1] : resData;
      }
      return null;
    }
  },
  mutations: {
    SET_CURRENT (state, payload: string) {
      state.currentId = payload;
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
    }
  },
  actions: {

  },
  modules: {
  }
})
