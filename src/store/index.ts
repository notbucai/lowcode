import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: null,
    elements: {
      "id": "c6174605-fb74-4fcb-884e-1a52926d55f3",
      "element": "layout", // 元素名称 or 类型
      "type": "container", // container or element
      "children": [
      ]
    }
  },
  mutations: {
    SET_CURRENT (state, payload) {
      state.current = payload;
    }
  },
  actions: {

  },
  modules: {
  }
})
