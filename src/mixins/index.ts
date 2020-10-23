type MoveEventType = {
  dragged: HTMLElement;
  to: HTMLElement;
  draggedContext: any;
  relatedContext: any;
}
// TODO: 这里应该放在一个单独的配置中
// 可容纳 or 不可容纳
const putRules: any = {
  'row': {
    allow: ['col'],  // 二选一 ？
    notallow: []  // 二选一 ？
  },
  // 'col': {
  //   allow: [],  // 二选一 ？
  //   notallow: ['row']  // 二选一 ？
  // }
};
// 可归属 or 不可归属
const pullRules: any = {
  'col': {
    allow: ['row'],
    notallow: []
  },
};
/**
 * 验证元素的拖动状态
 * @param to 要拖动到的容器标签
 * @param from 来源的元素标签
 */
function hasElementDragState (to: string, from: string) {
  const putHas = [true, false];
  const pullHas = [true, false];

  const putNode = putRules[to];
  const pullNode = pullRules[from];

  if (putNode) {
    putHas[0] = putNode.allow.length ? putNode.allow.includes(from) : true;
    putHas[1] = putNode.notallow.length ? putNode.notallow.includes(from) : false;
  }

  if (pullNode) {
    pullHas[0] = pullNode.allow.length ? pullNode.allow.includes(to) : true;
    pullHas[1] = pullNode.notallow.length ? pullNode.notallow.includes(to) : false;
  }

  return putHas[0] && pullHas[0] && !putHas[1] && !pullHas[1];
}


export default {
  methods: {
    checkMove (e: MoveEventType) {
      const { dragged, to } = e;

      const fromContextElement = e.draggedContext.element; // 当前拖拽的元素
      const toContextElement = e.relatedContext.element; // 被替换 or 换位置的元素

      if (toContextElement) {
        const { type: toType, clone: toClone } = toContextElement;
        const { type: fromType } = fromContextElement;
        // 类型不同

        if (toType !== fromType) return false;
        if (toClone) return false;
      }
      // 验证元素是否可以拖动到当前元素
      const toTag = to.dataset.tag || '';
      const fromTag = dragged.dataset.tag || '';

      const has = hasElementDragState(toTag, fromTag);
      return has;
      // TODO: 下方忽略 有问题
      // 检测
      // const rules: any = {
      //   'row': {
      //     allow: ['col'],
      //     notallow: false
      //   },
      // };
      // const rule: any = rules[toElement];
      // if (!rule) return true;

      // const { allow, notallow }: { allow: string[], notallow: string[] } = rule;

      // const hasAllow = allow.includes(fromElement);
      // let hasNotallow = true;
      // if (notallow) {
      //   hasNotallow = notallow.includes(fromElement);
      // }

      // console.log('hasAllow', hasAllow);
      // console.log('hasNotallow', hasNotallow);

      // return hasAllow || !hasNotallow;
    }
  },
}