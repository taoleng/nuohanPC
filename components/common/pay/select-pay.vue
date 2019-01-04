<template>
  <div class="select-pay">
    <div class="select-pay-title">
      {{ $t('lang.compon.patt.title') }}
    </div>
    <ul class="select-pay-list">
      <li
        v-show="!weixin"
        :class="{ checked:patternPayment === 'weixin' }"
        class="weixin"
        @click="clickPayBtn('weixin')"
      ><span/><b>{{ $t('lang.compon.patt.wx') }}</b></li>
      <li
        v-show="!zhifubao"
        :class="{ checked:patternPayment === 'zhifubao' }"
        class="zhifubao"
        @click="clickPayBtn('zhifubao')"><span/><b>{{ $t('lang.compon.patt.zfb') }}</b></li>
      <li
        v-show="!paypal"
        :class="{ checked:patternPayment === 'paypal' }"
        class="paypal"
        @click="clickPayBtn('paypal')"/>
      <li
        v-show="!vipcar"
        :class="{ checked:patternPayment === 'vipCar' }"
        class="vipcar"
        @click="clickPayBtn('vipCar')"><span/><b>{{ $t('lang.compon.patt.car') }}</b></li>
      <li
        v-show="!youhuima"
        :class="{ checked:patternPayment === 'youhuima' }"
        class="youhuima"
        @click="clickPayBtn('youhuima')">{{ $t('lang.compon.patt.yhm') }}</li>
    </ul>
  </div>
</template>

<script>
    export default {
      model:{
        prop:'patternPay',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
        event:'input'//这个字段，是指父组件监听 parent-event 事件
      },
      props: {
        patternPay: {
          type: String,
          default: ''
        },
        zhifubao: {
          type: Boolean,
          default: false
        },
        weixin: {
          type: Boolean,
          default: false
        },
        youhuima: {
          type: Boolean,
          default: false
        },
        paypal: {
          type: Boolean,
          default: false
        },
        vipcar: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
          patternPayment: ''
        }
      },
      watch: {
        patternPayment(val) {
          this.$emit('input', val)
        }
      },
      methods: {
        clickPayBtn(str) {
          this.patternPayment = str;
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .select-pay {
    &-title {
      line-height: 1;
      color: #333333;
      font-size: 20px;
      margin-bottom: 25px;
    }
    &-list {
      overflow: hidden;
      li {
        float: left;
        height: 38px;
        width: 165px;
        font-size: 14px;
        color: #333333;
        text-align: center;
        background: #f6f6f6;
        margin-right: 14px;
        cursor: pointer;
        b {
          font-weight: normal;
          line-height: 38px;
        }
        span {
          background-image: url("../../../assets/img/book/icon.png");
          margin-right: 15px;
          display: inline-block;
          vertical-align: middle;
        }
        &.zhifubao {
          span {
            width: 26px;
            height: 26px;
          }
        }
        &.weixin {
          span {
            width: 32px;
            height: 26px;
            background-position-y: -51px;
          }
        }
        &.youhuima {
          line-height: 38px;
        }
        &.paypal {
          background-image: url("../../../assets/img/book/icon.png");
          background-repeat: no-repeat;
          background-position-x: center;
          background-position-y: -85px;
        }
        &.vipcar {
          span {
            width: 24px;
            height: 21px;
            background-position-y: -160px;
          }
        }
        &.checked {
          border:1px solid #dd7116;
        }
      }
    }
  }
</style>
