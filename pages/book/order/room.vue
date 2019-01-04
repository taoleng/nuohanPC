<template>
  <!--会议室确认订单页面-->
  <!--qurery state为 details 时此页面为办公室的订单详情-->
  <div class="affirm-conference">
    <ul class="affirm-conference-tabel">
      <template v-if="$route.query.state === 'details'">
        <li class="affirm-tabel-li width100">
          <div class="width530 inline-block">
            <i class="iconfont icon-dingdan"/><span>{{ $t('lang.book.order.activity.number') }}</span><b>{{ orderData.order_id }}</b>
          </div>
          <div class="width425 inline-block">
            <i class="iconfont icon-dingdan1"/><span>{{ $t('lang.book.order.activity.state') }}</span><b>{{ orderData.payState }}</b>
          </div>
          <div class="inline-block">
            <i class="iconfont icon-shouliren"/>
            <span>{{ $t('lang.book.order.activity.receiver') }}</span>
            <template v-if="!orderData.manage">
              <b>{{ $t('lang.book.order.activity.unsbd') }}</b>
            </template>
            <template v-else>
              <b>{{ orderData.manage.truename }} {{ orderData.manage.mobile }}</b>
            </template>
          </div>
        </li>
      </template>
      <template v-else>
        <li class="affirm-tabel-li"><i class="iconfont icon-dingdan"/><span>{{ $t('lang.book.order.activity.number') }}</span><b>{{ orderData.order_id }}</b></li>
      </template>
      <li :class="{ width530: $route.query.state === 'details' }" class="affirm-tabel-li"><i class="iconfont icon-dingwei"/><span>{{ $t('lang.book.activity.side') }}</span><b>{{ orderData.address }}</b></li>
      <li class="affirm-tabel-li"><i class="iconfont icon-shijian"/><span>{{ $t('lang.user.order.rentaltime') }}</span><b>{{ orderData.start }} - {{ orderData.end }}</b></li>
      <li class="affirm-tabel-li"><i class="iconfont icon-qiapianxingshi"/><span>{{ $t('lang.user.order.rentalgm') }}</span><b>{{ orderData.roomType }}</b></li>
    </ul>
    <template v-if="$route.query.state === 'details'">
      <div class="affirm-conference-business">
        <business :value="orderData.payState"/>
      </div>
    </template>
    <template v-if="$route.query.state === 'details'">
      <div class="affirm-conference-msg">
        <business-msg :message="orderData.message"/>
      </div>
    </template>
    <div class="order-price margintop40">
      <span>{{ $t('lang.book.order.activity.price') }}</span><h3><i>￥</i><b>{{ orderData.total_price }}</b></h3>
    </div>
    <template v-if="$route.query.state === 'details'">
      <div class="margintop50">
        <patternn :value="orderData.payType"/>
      </div>
    </template>
    <template v-else>
      <select-pay
        v-model="patternPay"
        class="margintop50"
      />
      <div v-if="patternPay === 'vipCar'" class="vip-tishi-explain">
        <header>
          <span>{{ $t('lang.book.order.activity.viptitle') }}</span>
          <a href="/clients">
            <i>{{ $t('lang.book.order.activity.upgrade') }}</i>
          </a>
        </header>
        <ul>
          <li :style="{ opacity: userInfo.vip_data.meeting ? 1 : 0.3 }">{{ $t('lang.user.vip.online') }}{{ userInfo.vip_data.meeting || '0' }}{{ $t('lang.common.hour') }}</li>
          <li :style="{ opacity: userInfo.vip_data.question ? 1 : 0.3 }">{{ $t('lang.user.vip.question') }}{{ userInfo.vip_data.question || '0' }}{{ $t('lang.common.time') }}</li>
          <li :style="{ opacity: userInfo.vip_data.activity ? 1 : 0.3 }">{{ $t('lang.user.vip.activity') }}{{ userInfo.vip_data.activity || '0' }}{{ $t('lang.common.time') }}</li>
          <li :style="{ opacity: userInfo.vip_data.meeting_room ? 1 : 0.3 }">{{ $t('lang.user.vip.metting') }}{{ userInfo.vip_data.meeting_room || '0' }}</li>
        </ul>
      </div>
    </template>
    <clause
      v-if="!(orderData.numstate >= 5)"
      v-model="single"
      :text="$t('lang.common.clausetext')"
      :url-obj="{ text: $t('lang.common.nuohanxy') }"
      class="margintop50"
    ></clause>
    <div class="affirm-listbtn">
      <template v-if="!($route.query.state === 'details')">
        <div class="btn1" @click="payOrder">
          <btn-right :text="$t('lang.btn.subOrder')"/>
        </div>
      </template>
      <template v-if="orderData.numstate == 4">
        <nuxt-link :to="'/user/order?id=' + orderData.order_id + '&type=evaluate'">
          <btn-right :text="$t('lang.user.order.evaluate')"/>
        </nuxt-link>
      </template>
      <template v-else-if="orderData.numstate <= 3">
        <div class="btn2" @click="offOrder">
          <btn-pay :text="$t('lang.btn.cancelOrder')"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import selectPay from '~/components/common/pay/select-pay';
  import btnRight from '~/components/common/button/btn-right';
  import btnPay from '~/components/common/button/btn-pay';
  import businessMsg from '~/components/common/pushbox/business-msg';
  import business from '~/components/common/flow/business';
  import patternn from '~/components/common/pay/pattern';
  import clause from '~/components/common/select/clause';
  import { mapState, mapActions, mapMutations } from 'vuex';
    export default {
      components: {
        selectPay,
        btnRight,
        btnPay,
        patternn,
        businessMsg,
        business,
        clause
      },
      data() {
        return {
          patternPay: '',
          single: true,
          hide: [
            'weixin',
            'paypal',
            'vipCar'
          ]
        }
      },
      computed: {
        ...mapState(['orderData', 'userInfo'])
      },
      head(){
        return {
          title:this.$t('lang.title.order')
        }
      },
      methods: {
        ...mapMutations(['orderCancelCommon', 'payPc', 'seTpayedType']),
        payOrder() {
          // 没登陆 下单去登陆
          if (!this.userInfo.email) {
            this.$router.push({
              path: '/user/login'
            })
            return;
          }
          var type;
          // 判断支付方式
          if (!this.patternPay) {
            this.$Message.warning(this.$t('lang.common.selectpay'));
            return;
          }
          // 使用优惠码
          if ( this.patternPay === 'youhuima' ) {
            // 存入当前type 值
            this.seTpayedType({ payedType: 'room' });
            // 弹出优惠码
            this.$emit('show-youhui', true)
            return;
          }
          if (this.patternPay === 'zhifubao') {
            type = 1;
            //  选择了微信 弹出 pay-erweima
          } else if (this.patternPay === 'weixin') {
            type = 2;
          } else if (this.patternPay === 'paypal') {
            type = 3;
          } else if (this.patternPay === 'vipCar') {
            type = 4;
          }
          this.payPc({
            _this: this,
            type: type,
            order_id: this.$route.query.id,
            payedType: 'room',
            orderPrice:this.orderData.total_price
          })
        },
        offOrder() {
          if (this.$route.query.state === 'details') {
            // 弹出取消页面
            this.$emit('show-model', true);
          } else {
            this.orderCancelCommon({
              order_id: this.orderData.order_id,
              str: 'room',
              _this: this
            })
          }
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .affirm-conference {
    &-tabel {
      overflow: hidden;
      li {
        float: left;
        width: 542px;
        margin-right: 55px;
      }
      li:nth-child(2n) {
        width: 570px;
        margin-right: 0px;
      }
    }
    .affirm-listbtn {
    }
    &-business {
      margin-top: 50px;
    }
    &-msg {
      margin-top: 50px;
      margin-bottom: 50px;
    }
    &-patternn {
    }
  }
</style>
