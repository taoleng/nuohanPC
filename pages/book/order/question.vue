<template>
  <!--问题解惑 订单页面-->
  <!--qurery state为 details 时此页面为问题解惑的订单详情-->
  <div class="affirm-answer">
    <ul class="affirm-answer-tabel">
      <template v-if="$route.query.state !== 'details'">
        <li class="affirm-tabel-li"><i class="iconfont icon-dingdan"/><span>{{ $t('lang.book.order.activity.number') }}</span><b>{{ orderData.order_id }}</b></li>
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
      <li :class="{ width100: $route.query.state === 'details' }" class="affirm-tabel-li"><i class="iconfont icon-diqiu"/><span>{{ $t('lang.book.activity.question.lang') }}</span><b>{{ orderData.lang }}</b></li>
      <li class="affirm-tabel-li width100"><i class="iconfont icon-xiugai1"/><span>{{ $t('lang.book.order.meeting.item') }}</span><b class="line-height30">{{ orderData.question }}</b></li>
    </ul>
    <ul class="affirm-answer-listimg">
      <p>{{ $t('lang.book.order.question.content') }}（jpg{{ $t('lang.book.order.question.file') }}）</p>
      <li v-for="(item, index) in orderData.imgs" :key="index" :style="{'background-image': 'url(' + item + ')'}"></li>
    </ul>
    <template v-if="$route.query.state === 'details'">
      <div class="margintop50">
        <business :value="orderData.payState"/>
      </div>
    </template>
    <template v-if="$route.query.state === 'details'">
      <div class="margintop50">
        <business-msg :message="orderData.message"/>
      </div>
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
      <!--<div class="residue margintop35">-->
      <!--<ul>-->
      <!--<li>在线会议咨询剩余：3小时</li>-->
      <!--<li>问题咨询剩余：3次</li>-->
      <!--<li>活动及课程剩余：3次</li>-->
      <!--</ul>-->
      <!--<p>购买</p>-->
      <!--</div>-->
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
      <!--/book/payed?type=answer-->
      <!--<template v-if="$route.query.state === 'details'">-->
      <!--<div class="margintop50">-->
      <!--<router-link to="/">-->
      <!--<btn-pay :text="'取消订单'"/>-->
      <!--</router-link>-->
      <!--</div>-->
      <!--</template>-->
      <!--<template v-else>-->
      <!--<div class="btn1">-->
      <!--<router-link to="">-->
      <!--<btn-right :text="'支付订单'"/>-->
      <!--</router-link>-->
      <!--</div>-->
      <!--</template>-->
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
      computed: {
        ...mapState(['orderData', 'userInfo']),
      },
      head(){
        return {
          title:this.$t('lang.title.order')
        }
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
              this.seTpayedType({ payedType: 'question' });
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
              payedType: 'question'
            })
          }
        },
        offOrder() {
          if (this.$route.query.state === 'details') {
            // 弹出取消页面
            this.$emit('show-model', true);
            //  跳到支付成功页面

          } else {
            this.orderCancelCommon({
              order_id: this.orderData.order_id,
              str: 'question',
              _this: this
            });
          }
        }
      }
    }
</script>

<style lang='less' type="text/less">
  .affirm-answer {
    .select-pay-list {
      width: 100%;
    }
    &-tabel {
      overflow: hidden;
      li {
        float: left;
        width: 546px;
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
    &-listimg {
      padding-top: 12px;
      padding-bottom: 30px;
      overflow: hidden;
      p {
        line-height: 1;
        font-size: 14px;
        color: #333333;
        margin-bottom: 8px;
      }
      li {
        float: left;
        width: 106px;
        height: 70px;
        line-height: 70px;
        margin-right: 15px;
        background: no-repeat;
        background-position: center center;
        background-size: 100%;
      }
    }

  }
</style>
