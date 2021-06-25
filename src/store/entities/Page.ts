/*
 * @Author: bucai
 * @Date: 2021-06-24 14:31:33
 * @LastEditors: bucai
 * @LastEditTime: 2021-06-25 16:39:44
 * @Description: 
 */

import { LowElement } from "@/types/Element";
import { generateUUID } from "@/utils";


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
  entities: EntityType[];
}

export default class PageEntity {

  id: string = '';
  title: string = 'HOME';
  icon: string = 'el-icon-s-home';

  elements: LowElement = {
    "id": "c6174605-fb74-4fcb-884e-1a52926d55f3",
    "element": "layout", // 元素名称 or 类型
    "type": "container", // container or element
    "children": []
  };

  constructor() {
    this.id = 'page_' + generateUUID();
  }
}
