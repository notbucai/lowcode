/*
 * @Author: bucai
 * @Date: 2021-03-22 20:59:57
 * @LastEditors: bucai
 * @LastEditTime: 2021-06-25 16:26:50
 * @Description:
 */
import { Store } from "vuex";
import axios from 'axios';
import { getDataByModel, setDataByModel } from "@/utils/page";

export default async (store: Store<{ globalActions: any, globalData: any }>, handle: string, options: any = {}) => {

  const { globalActions: actions, globalData: modelData } = store.state;
  const [location, key] = handle.split('.');
  const [, namespace] = location.split('_')
  console.log('key', key);

  const action: any = actions[namespace].actions.find((item: { key: string }) => {
    return item.key === key;
  });

  if (!action) return;
  const { handle: order, data: orderData } = action;
  const { bind, recv, replace } = orderData || {};
  const [, method, url] = order.match(/([A-z]+)\[(.*?)\]/) as [string, string, string];
  const requestOptions: any = {
    method,
    url,
  }
  if (bind) {
    // 对bind 处理
    let newBind = bind;
    if (Array.isArray(replace)) {
      replace.forEach(key => {
        newBind = bind.replace('$[' + key + ']', options[key]);
      });
    }
    const bindData = getDataByModel(modelData, newBind)
    // 简单处理一下
    if (method.toLowerCase() === 'get') {
      requestOptions.params = bindData;
    } else {
      requestOptions.data = bindData;
    }
  }
  const response = await axios.request(requestOptions);
  if (recv) {
    const recvData = response.data;
    // const recvLocalData = getDataByModel(modelData, recv);
    setDataByModel(modelData, recv, recvData);
  }
}