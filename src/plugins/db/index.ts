/*
 * @Author: bucai
 * @Date: 2021-04-13 11:17:31
 * @LastEditors: bucai
 * @LastEditTime: 2021-05-18 19:10:55
 * @Description: 
 */

import lowdb from 'lowdb';

import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = lowdb(adapter)

db.defaults({
  elements: {
    "id": "c6174605-fb74-4fcb-884e-1a52926d55f3",
    "element": "layout", // 元素名称 or 类型
    "type": "container", // container or element
    "children": []
  },
  models: [],
  actions: {}
})
  .write()


export default db;