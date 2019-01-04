<template>
  <div class="clause">
    <div :class="{foncs: single}" class="clause-radio">
      <Radio v-model="value">
        <b v-if="single" class="clause-radio-foncs" @click="fide">
          <i class="iconfont icon-chenggong"></i>
        </b>
        <span>{{ $t('lang.common.clausetext') }}
          <nuxt-link to="/protocol?pay=true" target="_blank">
            《{{ protocoldata.title }}》
          </nuxt-link>
      </span>
      </Radio>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
    export default {
      model:{
        prop:'single',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
        event:'input'//这个字段，是指父组件监听 parent-event 事件
      },
      props: {
        single: {
          type: Boolean,
          default: false
        },
        text: {
          type: String,
          default: ''
        },
        urlObj: {
          type: Object,
          default() {
            return {
              url: '/',
              text: ''
            }
          }
        }
      },
      data() {
        return {
          value: false
        }
      },
      computed: {
        ...mapState(['protocoldata'])
      },
      watch: {
        value(bool) {
          this.$emit('input', bool);
        }
      },
      created() {
        this.pay_protocol();
        this.value = this.single;
      },
      methods: {
        ...mapActions(['pay_protocol']),
        fide() {
          if (this.$route.query.id) {
            return;
          }
          this.value = false;
        }
      },
    }
</script>

<style lang='less' type="text/less">
  .clause {
    &-radio {
      font-size: 0px;
      margin-bottom: 28px;
      position: relative;
      &-foncs {
        position: absolute;
        top: 1px;
        left: -2px;
        display: block;
        width: 16px;
        height: 16px;
        background: #dd7116;
        border-radius: 50%;
        text-align: center;
        line-height: 16px;
        z-index: 99;
        i {
          position: relative;
          top: 1px;
          font-size: 10px;
          color: white;
        }
      }
      .ivu-radio {
        margin-right: 10px;
        .ivu-radio-inner {
          width: 16px;
          height: 16px;
          border: 2px solid #dcdcdc !important;
          background: transparent;
        }
        .ivu-radio-focus {
          box-shadow: none;
        }
      }
      &.foncs {
        .ivu-radio {
          .ivu-radio-inner {
            border: 2px solid #dd7116 !important;
          }
        }
      }
      .ivu-radio-checked {
        .ivu-radio-inner {
          &::after {
            width: 0px;
            height: 0px;
            background-color: #dd7116;
            left: 0px;
            top: 0px;
          }
        }
      }
      span {
        display: inline-block;
        vertical-align: middle;
        position: relative;
        bottom: 1px;
        color: #999999;
        font-size: 14px;
        line-height: 1;
        margin-left: 0px;
        a {
          color: #dd7116;
        }
      }
    }
  }
</style>
