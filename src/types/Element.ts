/**
 * 元素类型
 */
export type LowElement = {
  id: string;
  element: string;
  type: 'element' | 'container';
  props?: {
    [key: string]: any;
    [key: number]: any;
  };
  children?: LowElement[];
}

export type LowDrapElement = LowElement & {
  clone?: boolean;
  disabled?: boolean;
}