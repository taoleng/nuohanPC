<template>
  <!--线下会谈 确认订单页面-->
  <!--qurery state为 details 时此页面为线下预定的订单详情-->
  <div class="affirm-offlineTalks talks">
    <ul class="affirm-offlineTalks-tabel">
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
      <li :class="{'float-right': $route.query.state !== 'details'}" class="affirm-tabel-li affirm-offlineTalks-zixun width605px no-bottom"><i class="iconfont icon-leixing"/><span>{{ $t('lang.book.order.talks.type') }}</span>
        <b>
          <span v-for="(item, index) in orderData.type_title" :key="index">{{ item }}</span>
        </b>
      </li>
      <li class="affirm-tabel-li width100"><i class="iconfont icon-shijian"/><span>{{ $t('lang.book.order.talks.sideTime') }}</span><b>{{ $t('lang.common.selected') }}{{ orderData.start }} ~ {{ orderData.end }}</b></li>
      <li class="affirm-tabel-li affirm-offlineTalks-side width100">
        <i class="iconfont icon-dingwei"/><span>{{ $t('lang.book.order.talks.side') }}</span><b>{{ orderData.place_title }}</b>
        <a :href="orderData.place_map_link" target="_blank">
          <p class="side"><i class="iconfont icon-daohang"></i><span>{{ $t('lang.book.order.talks.daohang') }}</span></p>
        </a>
      </li>
      <li class="affirm-tabel-li affirm-offlineTalks-text"><i class="iconfont icon-xiugai1"/><span>{{ $t('lang.book.order.meeting.item') }}</span><b class="line-height30">{{ orderData.question }}</b></li>
    </ul>
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
      <div v-if="!(!orderData.payType || orderData.payType === 'noPay')" class="margintop50">
        <patternn :value="orderData.payType"/>
      </div>
    </template>
    <template v-else>
      <select-pay v-model="patternPay" :vipcar="true" class="margintop50"/>
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
  import amountBtn from '~/components/common/button/amount-btn';
  import selectPay from '~/components/common/pay/select-pay';
  import btnRight from '~/components/common/button/btn-right';
  import btnPay from '~/components/common/button/btn-pay';
  import businessMsg from '~/components/common/pushbox/business-msg';
  import business from '~/components/common/flow/business';
  import patternn from '~/components/common/pay/pattern';
  import clause from '~/components/common/select/clause';
  import { mapState, mapActions,mapMutations } from 'vuex';
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
      watch: {
        patternPay(val) {
        }
      },
      created() {
        this.single = true;
      },
      methods: {
        ...mapActions(['orderCancel']),
        ...mapMutations(['payPc', 'orderCancelCommon', 'wechat', 'seTpayedType']),
        // 提交订单
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
              this.seTpayedType({ payedType: 'talks' });
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
            }
            this.payPc({
              _this: this,
              type: type,
              order_id: this.$route.query.id,
              payedType: 'talks'
            })
          }
        },
        // 取消订单
        offOrder() {
          if (this.$route.query.state === 'details') {
            // 弹出取消页面
            this.$emit('show-model', true);
          } else {
            this.orderCancelCommon({
              order_id: this.orderData.order_id,
              str: 'talks',
              _this: this
            });
          }
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .affirm-offlineTalks {
    &-tabel {
      overflow: hidden;
      li {
        float: left;
      }
    }
    .affirm-offlineTalks-side {
      position: relative;
      a {
        color: #dd7116;
      }
      b {
        display: inline-block;
        margin-right: 370px;
      }
      .side {
        display: inline-block;
        i {
          font-size: 24px;
          display: inline !important;
          margin-right: 12px;
        }
        span {
          font-size: 20px;
          color: #dd7116;
          display: inline !important;
        }
      }
    }
    .affirm-offlineTalks-text {
      width: 100%;
    }
  }
</style>
