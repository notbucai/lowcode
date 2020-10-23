import { LowElement } from '@/types/Element';
import { Prop, Vue } from 'vue-property-decorator';

export default class BaseOptions extends Vue{
  @Prop({
    required: true,
  })
  element?: LowElement;

}