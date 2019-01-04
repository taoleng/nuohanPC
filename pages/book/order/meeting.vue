<template>
  <!--线上会议 确认订单页面-->
  <!--qurery state为 details 时此页面为线上会议的订单详情-->
  <div class="affirm-onlineTalks">
    <ul class="affirm-onlineTalks-tabel">
      <template v-if="$route.query.state !== 'details'">
        <li class="affirm-tabel-li width547px"><i class="iconfont icon-dingdan"/><span>{{ $t('lang.book.order.activity.number') }}</span><b>{{ orderData.order_id }}</b></li>
      </template>
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
      <li class="affirm-tabel-li affirm-offlineTalks-zixun no-bottom"><i class="iconfont icon-leixing"/><span>{{ $t('lang.book.appt.meeting.item1') }}</span>
        <b>
          <span v-for="(item, index) in orderData.type_title" :key="index">{{ item }}</span>
        </b>
      </li>
      <li class="affirm-tabel-li width100"><i class="iconfont icon-shijian"/><span>{{ $t('lang.book.meeting.time') }}</span><b>{{ $t('lang.common.selected') }}{{ orderData.start }} ~ {{ orderData.end }}</b></li>
      <li class="affirm-tabel-li onlineTalks-tabel-lianxi"><i class="iconfont icon-goutong"/>
        <span>{{ $t('lang.book.order.meeting.obligate') }}</span>
        <template v-if="orderData.connect">
          <template v-if="orderData.connect.type === 'weixin'">
            <b>
              <i class="iconfont icon-weixin inline-block"> </i>
              <em>{{ $t('lang.book.appt.meeting.weixin') }}</em>
              <i>{{ $t('lang.book.order.meeting.account') }}</i>
              <em>{{ orderData.connect.account }}</em>
            </b>
          </template>
          <template v-else-if="orderData.connect.type === 'skype'">
            <b>
              <i class="iconfont icon-skype inline-block"></i>
              <em>skype</em>
              <i>{{ $t('lang.book.order.meeting.account') }}</i>
              <em>{{ orderData.connect.account }}</em>
            </b>
          </template>
        </template>
        <template v-else>
          <b></b>
        </template>
      </li>
      <li class="affirm-tabel-li affirm-onlineTalks-text"><i class="iconfont icon-xiugai1"/><span>{{ $t('lang.book.order.meeting.item') }}</span><b>{{ orderData.question }}</b></li>
    </ul>
    <template v-if="$route.query.state === 'details'">
      <div class="margintop50">
        <business :value="orderData.payState"/>
      </div>
    </template>
    <template v-if="$route.query.state === 'details'">
      <business-msg :message="orderData.message"/>
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
      <select-pay v-model="patternPay" class="margintop50"/>
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
  import { mapActions, mapMutations, mapState } from 'vuex'
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
        ...mapState(['orderData', 'userInfo'])
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
          }
          // 使用优惠码
          if ( this.patternPay === 'youhuima' ) {
            // 存入当前type 值
            this.seTpayedType({ payedType: 'meeting' });
            // 弹出优惠码
            this.$emit('show-youhui', true)
            return;
          }
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
            payedType: 'meeting'
          })
        },
        offOrder() {
          if (this.$route.query.state === 'details') {
           // 弹出取消页面
            this.$emit('show-model', true);
          } else {
            this.orderCancelCommon({
              order_id: this.orderData.order_id,
              str: 'meeting',
              _this: this
            });
          }
        }
      }
    }
</script>

<style lang='less' type="text/less">
  .affirm-onlineTalks {
    &-tabel {
      overflow: hidden;
      .onlineTalks-tabel-lianxi {
        b {
          font-size: 0px;
          i {
            &.iconfont {
              font-size: 28px;
              margin-right: 10px;
            }
            display: inline-block;
            vertical-align: middle;
            font-style: normal;
            font-size: 24px;
          }
          em {
            display: inline-block;
            vertical-align: middle;
            margin-right: 35px;
            font-size: 24px;
            font-style: normal;
          }
        }
      }
      li {
        float: left;
        width: 542px;
        margin-right: 55px;
        &.width100 {
          width: 100% !important;
        }
      }
      li:nth-child(2n) {
        width: 570px;
        margin-right: 0px;
      }
    }
    .select-pay-list {
      width: 100% !important;
    }
    .affirm-onlineTalks-text {
      width: 100% !important;
    }
  }
</style>
