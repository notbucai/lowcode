export default {
  methods: {
    checkMove (e: any) {
      const fromContextElement = e.draggedContext.element; // 当前拖拽的元素
      const toContextElement = e.relatedContext.element; // 被替换 or 换位置的元素
      console.log('e', toContextElement,e);

      if (!toContextElement) return;

      const { element: toElement, type: toType, clone: toClone } = toContextElement;
      const { element: fromElement, type: fromType } = fromContextElement;
      // 类型不同
      console.log('toClone', toClone);

      if (toType !== fromType) return false;
      if (toClone) return false;

      return ;
      // TODO: 下方忽略 有问题
      // 检测
      const rules: any = {
        'row': {
          allow: ['col'],
          notallow: false
        },
      };
      const rule: any = rules[toElement];
      if (!rule) return true;

      const { allow, notallow }: { allow: string[], notallow: string[] } = rule;

      const hasAllow = allow.includes(fromElement);
      let hasNotallow = true;
      if (notallow) {
        hasNotallow = notallow.includes(fromElement);
      }

      console.log('hasAllow', hasAllow);
      console.log('hasNotallow', hasNotallow);

      return hasAllow || !hasNotallow;
    }
  },
}