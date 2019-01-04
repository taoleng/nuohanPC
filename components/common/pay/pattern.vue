<template>
  <div>
    <div class="patternn-title">
      {{ $t('lang.compon.patt.title') }}
    </div>
    <ul class="patternn">
      <li v-show="value === 'zhifubao'"><span/><b>{{ $t('lang.compon.patt.zfb') }}</b></li>
      <li v-show="value === 'weixin'"><span/><b>{{ $t('lang.compon.patt.wx') }}</b></li>
      <li v-show="value === 'paypal'"/>
      <li v-show="value === 'vip'"><span/><b>{{ $t('lang.compon.patt.car') }}</b></li>
      <li v-show="value === 'youhuima'"><span/><b>{{ $t('lang.compon.patt.yhm') }}</b></li>
    </ul>
  </div>
</template>

<script>
    export default {
      props: {
        value: {
          type: String,
          default: ''
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .patternn-title {
    line-height: 1;
    color: #333333;
    font-size: 20px;
    margin-bottom: 18px;
  }
  .patternn {
    width: 540px;
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
      &:nth-child(1) {
        span {
          width: 26px;
          height: 26px;
        }
      }
      &:nth-child(2) {
        span {
          width: 32px;
          height: 26px;
          background-position-y: -51px;
        }
      }
      &:nth-child(3) {
        background-image: url("../../../assets/img/book/icon.png");
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: -85px;
      }
      &:nth-child(4) {
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
</style>
