/**
 * @description 模型、类型 的值（默认值） 均为序列数据 需要反序列成对应类型数据
 */
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { cloneDeep } from 'lodash'
import { History } from 'stateshot'

import { getFinderFunctionByChildKeyFromTree } from '@/utils'
import { LowElement } from '@/types/Element';
import PageEntity from '../entities/Page';

const history = new History();

const flattenElementsDeep = (element: LowElement) => {
   const arr = [element];

   element.children?.forEach(item => {
      const list = flattenElementsDeep(item);
      arr.push(...list);
   });

   return arr;
}

@Module({
   namespaced: true,
})
class PageStore extends VuexModule {

   id: string = '';
   title: string = '';
   icon: string = '';
   update_time = Date.now();
   /**
    * 页面当前选中id
    */
   currentId: string | undefined | null = undefined;
   /**
    * 页面当前元素列表
    */
   elements: LowElement = {
      "id": "c6174605-fb74-4fcb-884e-1a52926d55f3",
      "element": "layout", // 元素名称 or 类型
      "type": "container", // container or element
      "children": []
   };

   // ---------------------------------------------
   // -----------------getters--------------------
   // ---------------------------------------------
   /**
    * 当前选择元素
    */
   get current () {
      const state = this;
      if (typeof state.currentId === 'string') {
         const find = getFinderFunctionByChildKeyFromTree(state.elements);
         const resData = find(state.currentId)
         return Array.isArray(resData) ? resData[1] : resData;
      }
      return null;
   }

   /**
    * 扁平后元素列表
    */
   get flatElements () {
      const state = this;
      return flattenElementsDeep(state.elements);
   }

   // ---------------------------------------------
   // -----------------Action--------------------
   // ---------------------------------------------

   /**
    * 初始化页面
    */
   @Action
   init (pageEntity: PageEntity) {
      this.context.commit('INIT_PAGE', pageEntity);
   }

   /**
    * 刷新
    */
   @Action
   refresh () {
      this.context.commit('REFRESH_ELEMENTS');
   }

   /**
    * 保存
    */
   @Action
   save () {
      // 发送保存请求
      this.context.commit('SAVE');
   }


   /**
    * 清空画布
    */
   @Action
   clear_canvas () {
      this.context.commit('CLEAR_ELEMENTS')
   }
   // ---------------------------------------------
   // -----------------Mutation--------------------
   // ---------------------------------------------

   @Mutation
   SAVE () {
   }
   @Mutation
   INIT_ELEMENT (payload: LowElement) {
      this.elements = payload;
   }
   @Mutation
   INIT_PAGE (payload: PageEntity) {
      this.id = payload.id;
      this.icon = payload.icon;
      this.title = payload.title;
      this.elements = payload.elements;

      history.reset();
   }
   /**
    * 清除元素
    */
   @Mutation
   CLEAR_ELEMENTS () {
      const state = this;
      history.reset();

      state.elements = {
         "id": "c6174605-fb74-4fcb-884e-1a52926d55f3",
         "element": "layout", // 元素名称 or 类型
         "type": "container", // container or element
         "children": []
      };
   }
   /**
    * 更新历史
    */
   @Mutation
   UPDATE () {
      const state = this;
      // 添加到历史
      // console.log('history', history.get());
      history.pushSync(state.elements);
      // console.log('history', history.get());

   }
   /**
    * 撤回
    */
   @Mutation
   UNDO () {
      this.elements = history.undo().get();
   }
   /**
    * 取消撤回（反相撤回）
    */
   @Mutation
   REDO () {
      this.elements = history.redo().get();
   }
   /**
    * 设置当前元素
    * @param payload 
    */
   @Mutation
   SET_CURRENT (payload: string) {
      this.currentId = payload;
   }
   /**
    * 绑定模型
    * @param payload 
    */
   @Mutation
   BIND_MODELS (payload: any) {
      if (typeof this.currentId !== 'string') return;
      const find = getFinderFunctionByChildKeyFromTree(this.elements);
      let [parent, current] = find(this.currentId);

      if (current) {
         current = current as LowElement;
         current.models = payload;
      }
   }
   /**
    * 更新当前选中元素的参数
    * @param payload 
    */
   @Mutation
   UPDATE_CURRENT_PROPS (payload: any) {
      if (typeof this.currentId !== 'string') return;
      const find = getFinderFunctionByChildKeyFromTree(this.elements);
      let [parent, current, index] = find(this.currentId);
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
   }
   /**
    * 移除当前元素
    */
   @Mutation
   REMOVE_CURRENT () {
      if (typeof this.currentId !== 'string') return;
      const find = getFinderFunctionByChildKeyFromTree(this.elements);
      let [parent, current, index] = find(this.currentId);
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
   /**
    * 刷新缓存
    */
   @Mutation
   REFRESH_ELEMENTS () {
      this.elements = cloneDeep(this.elements);
   }
}

export default PageStore;
