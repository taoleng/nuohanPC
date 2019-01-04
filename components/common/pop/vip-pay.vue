<template>
  <Modal
    :mask-closable="false"
    v-model="isShow"
    :closable="false"
    class="vip-pay"
  >
    <p slot="header" class="vip-pay-header">
      <template v-if="content.value && content.value.split(',')[1] === 'circle'">{{ $t('lang.compon.vippay.zx') }}</template>
      <template v-if="content.value && content.value.split(',')[1] === 'vip'">{{ $t('lang.compon.vippay.zx') }}</template>
    </p>
    <div class="vip-pay-content">
      <div class="vip-pay-content-header">
        <template v-if="content.value && content.value.split(',')[1] === 'circle'">
          <p>{{ $t('lang.clients.online') }}{{ content.meeting_num }}{{ $t('lang.common.hour') }}</p>
          <p>{{ $t('lang.clients.question') }}{{ content.question_num }}{{ $t('lang.common.time') }}</p>
          <p>{{ $t('lang.clients.active') }}{{ content.activity_num }}{{ $t('lang.common.time') }}</p>
        </template>
        <template v-if="content.value && content.value.split(',')[1] === 'vip'">
          <p>{{ content.intro }}</p>
        </template>
      </div>
    </div>
    <div slot="footer">
      <div class="vip-pay-footer">
        <div class="vip-pay-footer-price">
          <i>{{ $t('lang.common.price') }}</i>
          <template v-if="content.value && content.value.split(',')[1] === 'vip'">
            <b>￥{{ content.price }}{{ $t('lang.common.unit') }}/{{ $t('lang.common.year') }}</b>
          </template>
          <template v-else>
            <b>￥{{ content.price }}{{ $t('lang.common.unit') }}</b>
          </template>
        </div>
        <div class="vip-pay-footer-pay">
          <h5>{{ $t('lang.compon.patt.title') }}</h5>
          <ul>
            <li :class="{ checked: payType === 2 }" class="weixin" @click="changePayType(2)"></li>
            <li :class="{ checked: payType === 1 }" class="zhifubao" @click="changePayType(1)"></li>
            <li :class="{ checked: payType === 3 }" class="paypel" @click="changePayType(3)"></li>
          </ul>
        </div>
        <div class="vip-pay-footer-bottom">
          <div class="vip-pay-footer-bottom-header">
            {{ $t('lang.compon.vippay.buy') }}
          </div>
          <div class="vip-pay-footer-bottom-content">
            <p class="vip-pay-footer-bottom-content-left">
              <template v-if="content.value && content.value.split(',')[1] === 'circle'">{{ $t('lang.compon.vippay.zx') }}</template>
              <template v-if="content.value && content.value.split(',')[1] === 'vip'">{{ $t('lang.compon.vippay.zk') }}</template>
            </p>
            <p class="vip-pay-footer-bottom-content-right">
              <template v-if="content.value && content.value.split(',')[1] === 'vip'">
                ￥{{ content.price }}{{ $t('lang.common.unit') }}/{{ $t('lang.common.year') }}
              </template>
              <template v-else>
                ￥{{ content.price }}{{ $t('lang.common.unit') }}
              </template>
            </p>
          </div>
          <div class="vip-pay-footer-bottom-btn">
            <p class="hoverblack03" @click="pay">{{ $t('lang.btn.pay') }}</p>
            <p class="hoverblack03" @click="changevalue(false)">{{ $t('lang.btn.no') }}</p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
  import { mapActions } from 'vuex'
    export default {
      model:{
        prop:'isShow',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
        event:'input'//这个字段，是指父组件监听 parent-event 事件
      },
      props: {
        isShow: {
          type: Boolean,
          default: false
        },
        content: {
          type: Object,
          default() {
            return {
              title: '',
              meeting_num: 0,
              question_num: 0,
              activity_num: 0,
              price: 0,
              intro: '',
              value: ''
            }
          }
        },
      },
      data() {
        return {
          value: false,
          payType: '',
          payData: {}
        }
      },
      watch: {
        payType(val) {
          this.payData = {}
        }
      },
      methods: {
        ...mapActions(['orderMember']),
        changevalue(val) {
          this.$emit('input', val)
        },
        changePayType(type) {
          this.payType = type;
        },
        // 立即支付
        pay() {
          if (!this.payType) {
            this.$Message.warning(this.$t('lang.compon.vippay.select'));
            return;
          }
          var arr = this.content.value.split(',');
          var obj = {
            vip: arr[1],// 会员类别，可选circle,vip
            level: arr[0],// 会员等级，可选1，2，3
            type: this.payType// 支付方式，可选1，2，3 //1支付宝，2-微信，3-paypal
          }
          this.orderMemberApi(obj);
        },
        orderMemberApi(obj) {
          // 会员购买
          this.orderMember(obj).then((res) => {
             if (res.code === 200) {
               let data = res.data;
               this.payData = data;
               this.payData.price = this.content.price;
               this.$emit('order-data',this.payData);
               // VIP弹窗消失
               this.$emit('input', false);
             } else if (res.code === 400) {
               this.$Message.warning(res.msg);
             } else if (res.code === -1) {
               this.$Message.warning(res.msg);
             } else if (res.code === -2) {
               this.$Message.warning(res.msg);
             }
          })
        }
      }
    }
</script>

<style lang='less' type="text/less">
  .vip-pay {
    .ivu-modal {
      width: 500px !important;
    }
    .ivu-modal-header {
      padding-top: 27px;
      padding-left: 40px;
      padding-right: 0px;
      padding-bottom: 0px;
      border-color: #ececec;
      .vip-pay-header {
        height: 64px;
        line-height: 64px;
        font-size: 24px;
        color: #333333;
        font-weight: normal;
      }
    }
    .ivu-modal-body {
      padding: 16px 40px 20px;
      border: none;
      .vip-pay-content {
        &-header {
          h3 {
            font-weight: normal;
            font-size: 18px;
            color: #333333;
            line-height: 31px;
          }
          p {
            line-height: 26px;
            font-size: 16px;
            color: #dd7116;
          }
        }
        &-content {
          h4 {
            font-weight: normal;
            font-size: 14px;
            color: #333333;
          }
          ul {
            li {
              line-height: 24px;
              font-size: 12px;
              color: #999999;
            }
          }
        }
      }
    }
    .ivu-modal-footer {
      border-color: #e3e3e3;
      padding: 0px;
      .vip-pay-footer {
        text-align: left;
        &-price {
          padding-left: 40px;
          margin-top: 15px;
          i {
            font-style: normal;
            font-size: 14px;
            color: #333333;
          }
          b {
            font-weight: normal;
            font-size: 20px;
            color: #dd7116;
          }
        }
        &-pay {
          padding-left: 40px;
          padding-right: 40px;
          padding-bottom: 36px;
          h5 {
            font-weight: normal;
            line-height: 62px;
            color: #333333;
            font-size: 18px;
          }
          ul {
            overflow: hidden;
            li {
              float: left;
              width: 120px;
              height: 42px;
              border: 1px solid #999999;
              margin-right: 15px;
              background: url("../../../assets/img/vip/pay.png") no-repeat;
              &.checked {
                border-color: #dd7116;
              }
              &.weixin {
                background-position-x: 9px;
                background-position-Y: -100px;
              }
              &.zhifubao {
                background-position-x: 19px;
                background-position-Y: -20px;
              }
              &.paypel {
                background-position-x: 19px;
                background-position-Y: -178px;
              }
              &:last-child {
                margin-right: 0px;
              }
            }
          }
        }
        &-bottom {
          height: 226px;
          background: #dd7116;
          padding: 0px 40px;
          padding-top: 26px;
          color: #ffffff;
          &-header {
            height: 50px;
            line-height: 49px;
            font-size: 18px;
            border-bottom: 1px solid #e69550;
          }
          &-content {
            padding-top: 20px;
            overflow: hidden;
            line-height: 1;
            &-left {
              float: left;
              font-size: 14px;
              margin-right: 32px;
            }
            &-right {
              float: left;
              font-size: 16px;
            }
          }
          &-btn {
            margin-top: 40px;
            p {
              width: 196px;
              height: 36px;
              line-height: 34px;
              text-align: center;
              border: 1px solid #ffffff;
              border-radius: 10px;
              cursor: pointer;
              &:hover {
                background: #ffffff;
                color: #dd7116;
              }
              &:first-child {
                float: left;
              }
              &:last-child {
                float: right;
              }
            }
          }
        }
      }
    }
  }
</style>
