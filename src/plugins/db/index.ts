/*
 * @Author: bucai
 * @Date: 2021-04-13 11:17:31
 * @LastEditors: bucai
 * @LastEditTime: 2021-06-25 16:07:08
 * @Description: 
 */

import lowdb from 'lowdb';

import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = lowdb(adapter)

db.defaults({
  pages: [],
  globalModels: [],
  globalActions: {}
})
  .write()


export default db;