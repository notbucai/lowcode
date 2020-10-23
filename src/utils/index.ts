import { LowElement } from '@/types/Element';

interface AnyObjectType {
  [key: string]: any
}

export function findByCallback (object: AnyObjectType, currentKey: string, callback: (current: AnyObjectType, key: string, value: any) => boolean): any {
  const current = object[currentKey];
  for (let key in current) {
    if (callback(current, key, current[key])) return [object, currentKey];
    if (typeof current[key] === 'object') {
      const value = findByCallback(current, key, callback);
      if (value) return value;
    }
  }
}
/**
 * 通过子元素key获取查找器函数
 * @param childKey 子元素KEY
 */
export function getFinderFunctionByChildKeyFromTree (tree: LowElement) {
  let current: LowElement | undefined;
  let index = -1;
  /**
   * 查找数据
   * @param id 元素ID
   * @param item 当前遍历的数据
   */
  function findElementByIdFromTree (id: string, item: LowElement): LowElement | undefined {
    if (item.id === id) {
      return item;
    }
    if (Array.isArray(item.children)) {
      for (let i = 0; i < item.children.length; i++) {
        const resData = findElementByIdFromTree(id, item.children[i]);
        if (!current) {
          current = item;
          index = i;
        }
        if (resData) return resData;
      }
    }
  }

  return function getElementById (id: string): (LowElement | undefined | number)[] {
    const element = findElementByIdFromTree(id, tree);
    const res = [current, element, index];
    current = undefined;
    index = -1;
    return res;
  }
}