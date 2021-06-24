<template>
  <div class="layout-option">
    <el-alert title="无可配置项" type="info" :closable="false" center>
    </el-alert>

    <div class="footer-option">
      <el-button plain size="mini" @click="handleClose">取消</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { LowElement } from '@/types/Element';
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseOptions from './BaseOptions';

@Component({})
export default class Layout extends BaseOptions {
  /**
   * 取消
   */
  handleClose () {
    this.$store.commit("page/SET_CURRENT", undefined);
  }
}

</script>
<style lang="scss" scoped>
.layout-option {
  padding: 10px;
  .footer-option {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }
}
</style>