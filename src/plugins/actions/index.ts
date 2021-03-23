/*
 * @Author: bucai
 * @Date: 2021-03-22 20:59:50
 * @LastEditors: bucai
 * @LastEditTime: 2021-03-22 23:46:35
 * @Description:
 */
import Vue from 'vue';
import { Store } from 'vuex';

import fetch from './fetch';

import { getFinderFunctionByChildKeyFromTree } from '../../utils'
import { LowElement } from '@/types/Element';

export default (store: Store<any>) => {
  const state = store.state;

  const execHandle = async (handle: any) => {
    const { link, data, key } = handle;
    const [type, typeKey, handleKey] = link.split(/_|\./);
    if (type === 'global') {
      return fetch(store, link);
    } else if (type === 'element') {
      // 1. 找到element
      // 2. 获取exec
      const find = getFinderFunctionByChildKeyFromTree(state.elements);
      const findData = find(typeKey);
      const element = Array.isArray(findData) ? findData[1] : findData;
      if (!element) {
        throw new Error('element not found');
      }
      const actions = (element as LowElement).actions;
      return execAction(actions);
    }
  };

  const execAction = async (action: any) => {
    for (let i = 0; i < action.handle.length; i++) {
      const handle = action.handle[i];
      await execHandle(handle);
    }
  };

  Vue.prototype.$actions = execAction;

}