<template>
  <!--活动订单页面-->
  <!--qurery state为 details 时此页面为活动的订单详情-->
  <div class="affirm-activity">
    <ul class="affirm-activity-tabel">
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
        <li class="affirm-tabel-li"><i class="iconfont icon-dingdan"/>
          <span>{{ $t('lang.book.order.activity.number') }}</span><b>{{ orderData.order_id }}</b>
        </li>
      </template>
      <li :class="{ width100: $route.query.state === 'details' }" class="affirm-tabel-li">
        <i class="iconfont icon-renshu"/><span>{{ $t('lang.book.order.activity.num') }}</span><b>{{ orderData.people }}{{ $t('lang.common.person') }}</b>
      </li>
    </ul>
    <div class="activitylist-content-list">
      <ul class="activitylist-content-list">
        <li class="activitylist-content-list-li">
          <div class="activitylist-content-list-left">
            <img :src="orderData.cover">
          </div>
          <div class="activitylist-content-list-text">
            <div class="activitylist-content-list-text-title">
              {{ orderData.title }}
            </div>
            <div class="activitylist-content-list-text-content" v-html="orderData.content">
            </div>
            <ul class="activitylist-content-list-text-list">
              <li><span>{{ $t('lang.book.activity.price2') }}</span>{{ orderData.activity.price }}/{{ $t('lang.book.activity.wei') }}</li>
              <li><span>{{ $t('lang.book.activity.side') }}</span>{{ orderData.address }}</li>
              <li><span>{{ $t('lang.book.activity.shijian') }}</span>{{ orderData.start + ' ~ ' + orderData.end }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <template v-if="$route.query.state === 'details'">
      <div class="margintop50">
        <business :value="orderData.payState"/>
      </div>
    </template>
    <template v-if="$route.query.state === 'details'">
      <business-msg :message="orderData.message"/>
    </template>
    <div class="order-price">
      <span>{{ $t('lang.book.order.activity.price') }}</span><h3><i>￥</i><b>{{ orderData.total_price }}</b></h3>
    </div>
    <template v-if="$route.query.state === 'details'">
      <div class="margintop50">
        <patternn :value="orderData.payType"/>
      </div>
    </template>
    <template v-else>
      <select-pay v-model="patternPay" class="margintop50"/>
      <div v-if="patternPay === 'vipCar'" class="vip-tishi-explain">
        <header>
          <span>{{ $t('lang.book.order.activity.viptitle') }}</span>
          <nuxt-link to="/clients">
            <i>{{ $t('lang.book.order.activity.upgrade') }}</i>
          </nuxt-link>
        </header>
        <ul>
          <li :style="{ opacity: userInfo.vip_data.meeting ? 1 : 0.3 }">{{ $t('lang.user.vip.online') }}{{ userInfo.vip_data.meeting || '0' }} {{ $t('lang.common.hour') }}</li>
          <li :style="{ opacity: userInfo.vip_data.question ? 1 : 0.3 }">{{ $t('lang.user.vip.question') }}{{ userInfo.vip_data.question || '0' }} {{ $t('lang.common.time') }}</li>
          <li :style="{ opacity: userInfo.vip_data.activity ? 1 : 0.3 }">{{ $t('lang.user.vip.activity') }}{{ userInfo.vip_data.activity || '0' }} {{ $t('lang.common.time') }}</li>
          <li :style="{ opacity: userInfo.vip_data.meeting_room ? 1 : 0.3 }">{{ $t('lang.user.vip.metting') }}{{ userInfo.vip_data.meeting_room || '0' }} {{ $t('lang.common.day') }}</li>
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
      <!--/book/payed?type=activity-->
    </div>
  </div>
</template>

<script>
  import amountBtn from '~/components/common/button/amount-btn';
  import selectPay from '~/components/common/pay/select-pay';
  import btnRight from '~/components/common/button/btn-right';
  import btnPay from '~/components/common/button/btn-pay';
  import businessMsg from '~/components/common/pushbox/business-msg';
  import business from '~/components/common/flow/business';
  import patternn from '~/components/common/pay/pattern';
  import clause from '~/components/common/select/clause';
  import { mapState, mapMutations } from 'vuex'
  export default {
      components: {
        selectPay,
        btnRight,
        btnPay,
        businessMsg,
        business,
        amountBtn,
        patternn,
        clause
      },
      data() {
        return {
          patternPay: '',
          single: true
        }
      },
      head(){
        return {
          title:this.$t('lang.title.order')
        }
      },
      computed: {
        ...mapState(['orderData', 'userInfo']),
      },
      created() {
      },
      methods: {
        ...mapMutations(['payPc', 'orderCancelCommon', 'seTpayedType']),
        payOrder() {
          // 没登陆 下单去登陆
          if (!this.userInfo.email) {
            this.$router.push({
              path: '/user/login'
            })
            return;
          }
          var type;
          if (!this.patternPay) {
            this.$Message.warning(this.$t('lang.common.selectpay'));
            return;
          } else {
            // 使用优惠码
            if ( this.patternPay === 'youhuima' ) {
              // 存入当前type 值
              this.seTpayedType({ payedType: 'activity' });
              // 弹出优惠码
              this.$emit('show-youhui', true)
              return;
            }
            // 选择了支付方式
            if (this.patternPay === 'zhifubao') {
              type = 1;
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
              payedType: 'activity'
            })
          }
        },
        offOrder() {
          if (this.$route.query.state === 'details') {
            // 弹出取消页面
            this.$emit('show-model', true);
          } else {
            this.orderCancelCommon({
              order_id: this.orderData.order_id,
              str: 'activity',
              _this: this
            });
          }
        }
      }
    }
</script>

<style lang='less' type="text/less">
  .affirm-activity {
    &-tabel {
      overflow: hidden;
      li {
        width: 50%;
        float: left;
        padding-bottom: 0px;
        height: 178px;
      }
    }
    &-explain {
      .select-pay-list {
        width: 100%;
      }
      .vip-tishi-explain {
        padding-bottom: 55px;
      }
    }
    &-consult {
      ul {
        overflow: hidden;
        li {
          float: left;
          line-height: 1;
          font-size: 14px;
          color: #999999;
          margin-right: 40px;
        }
      }
      p {
        width: 88px;
        height: 24px;
        color: #ffffff;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        margin-top: 15px;
        background: #dd7116;
      }
    }
    &-price {
      margin-top: 35px;
      margin-bottom: 20px;
    }
  }
</style>
