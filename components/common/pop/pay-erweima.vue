<template>
  <Modal
    :mask-closable="false"
    :value="isShow"
    class="pay-erweima"
  >
    <p slot="header">
      <span><b>{{ $t('lang.compon.ewm.pay') }}</b><span>￥{{ price }}</span></span>
      <i class="iconfont icon-quxiao" @click="ok"></i>
    </p>
    <div class="pay-erweima-content">
      <template v-if="type === 1">
        <p>{{ $t('lang.compon.ewm.zhifu') }}</p>
      </template>
      <template v-if="type === 2">
        <p>{{ $t('lang.compon.ewm.weixin') }}</p>
      </template>
      <div class="pay-erweima-content-erweima">
        <template v-if="type === 1">
          <!--支付宝-->
          <div class="pay-erweima-content-erweima-iframe">
            <p>{{ $t('lang.compon.ewm.loading') }}</p>
            <iframe :src="erweima" frameborder="0"></iframe>
          </div>
        </template>
        <template v-else-if="type === 2">
          <!--微信-->
          <img :src="erweima" :alt="$t('lang.compon.ewm.error')">
        </template>
      </div>
    </div>
  </Modal>
</template>

<script>
  import { mapMutations } from 'vuex';
    export default {
      model:{
        prop:'isShow',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
        event:'input'//这个字段，是指父组件监听 parent-event 事件
      },
      props: {
        // 是否显示
        isShow: {
          type: Boolean,
          default: false
        },
        erweima: {
          type: String,
          default: ''
        },
        price: {
          type: String,
          default: ''
        },
        type: {
          type: Number,
          default: undefined // 1 支付宝 2 微信
        }
      },
      watch: {
        type() {
          // console.log(this.type)
        }
      },
      methods: {
        ...mapMutations([ 'setPayReplyTimer' ]),
        ok() {
          this.$emit('input', false)
          // 此处关闭掉定时器
          this.setPayReplyTimer({ str: 'off' });
        }
      }
    }
</script>

<style lang='less' type="text/less">
  .pay-erweima {
    border-radius: 5px;
    .ivu-modal {
      .ivu-modal-close {
        display: none;
      }
      top: 50%;
      left: 50%;
      margin-top: -274px;
      margin-left: -397px;
      border-radius: 5px;
      .ivu-modal-content {
        border-radius: 5px;
        width: 794px !important;
        height: 548px !important;
        .ivu-modal-header {
          border: 1px solid #dadada;
          overflow: hidden;
          padding: 35px 44px;
          p {
            float: left;
            height: auto;
            span {
              line-height: 1;
              b {
                position: relative;
                bottom: -1px;
                vertical-align: middle;
                display: inline-block;
                font-weight: normal;
                font-size: 20px;
                color: #333333;
              }
              span {
                vertical-align: middle;
                display: inline-block;
                position: relative;
                top: 2px;
                line-height: 1;
                font-weight: normal;
                font-size: 26px;
                color: #dd7116;
              }
            }
          }
          i {
            float: right;
            font-size: 28px;
            cursor: pointer;
          }
        }
        .ivu-modal-body {
          padding: 0;
          padding-top: 58px;
          .pay-erweima-content {
            width: 260px;
            margin: 0 auto;
            p {
              text-align: center;
              line-height: 1;
              font-size: 26px;
              color: #333333;
              margin-bottom: 40px;
            }
            &-erweima {
              img {
                display: block;
                width: 100%;
              }
              &-iframe {
                width: 100%;
                height: 280px;
                position: relative;
                p {
                  position: absolute;
                  display: block;
                  padding-top: 50px;
                  width: 100%;
                  height: 280px;
                  z-index: 0;
                }
                iframe {
                  position: absolute;
                  display: block;
                  width: 100%;
                  height: 280px;
                  z-index: 1;
                }
              }
            }
          }
        }
        .ivu-modal-footer {
          display: none;
        }
      }
    }
  }
</style>
