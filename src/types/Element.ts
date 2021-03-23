/**
 * 单个动作处理配置
 */
export type LowElementActionHandle = {
  key: string,
  name: string,
  link: string,
  data?: {
    bind?: string,
    recv?: string,
  }
};
/**
 * 单个动作
 */
export type LowElementAction = {
  key: string;
  name: string;
  event: string;
  handle: LowElementActionHandle[];
};

/**
 * 元素类型
 */
export type LowElement = {
  id: string;
  element: string;
  type: 'element' | 'container';
  models?: {
    [key: string]: string;
  },
  props?: {
    [key: string]: any;
    [key: number]: any;
  };
  children?: LowElement[];
  actions?: LowElementAction[]
}

export type LowDrapElement = LowElement & {
  clone?: boolean;
  disabled?: boolean;
}