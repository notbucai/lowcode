import { LowElement } from '@/types/Element'
import { getFinderFunctionByChildKeyFromTree } from '@/utils'
// import LowElement from '../types/Element'
import Vue from 'vue'
import Vuex from 'vuex'
import PageStore from './modules/page';
import db from '@/plugins/db'


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
}

const store = new Vuex.Store<StateType>({
  modules: {
    page: PageStore
  },
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
});

store.subscribe((mutation, state:any) => {
  // console.log('state', state);

  db.set('elements', state.page.elements).write();
});

export default store;
