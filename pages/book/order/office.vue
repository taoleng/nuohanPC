<template>
  <!--办公室确认订单页面-->
  <!--qurery state为 details 时此页面为办公室的订单详情-->
  <div class="affirm-office">
    <img :src="pay" alt="">
    <ul class="affirm-office-tabel">
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
      <li :class="{ width530: $route.query.state === 'details' }" class="affirm-tabel-li"><i class="iconfont icon-dingwei"/><span>{{ $t('lang.book.order.office.side') }}</span><b>{{ orderData.address }}</b></li>
      <li :class="{ width470: $route.query.state === 'details' }" class="affirm-tabel-li"><i class="iconfont icon-qiapianxingshi"/><span>{{ $t('lang.book.order.office.type') }}</span><b>{{ orderData.homeType }}</b></li>
      <li :class="{ width530: $route.query.state === 'details' }" class="affirm-tabel-li"><i class="iconfont icon-shijian"/><span>{{ $t('lang.book.order.office.date') }}</span><b>{{ orderData.times }}{{ $t('lang.common.month') }}</b></li>
      <li :class="{ width470: $route.query.state === 'details' }" class="affirm-tabel-li"><i class="iconfont icon-gongwei"/><span>{{ $t('lang.book.order.office.num') }}</span><b>{{ orderData.station }}{{ $t('lang.common.station') }}</b></li>
    </ul>
    <template v-if="$route.query.state === 'details'">
      <div v-if="!(!orderData.payType || orderData.payType === 'noPay')" class="affirm-office-tabel-business">
        <!--orderData.payState-->
        <business :value="orderData.payState"/>
      </div>
    </template>
    <template v-if="$route.query.state === 'details'">
      <div class="affirm-office-tabel-msg">
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
      <select-pay :youhuima="true" :vipcar="true" v-model="patternPay" class="margintop50"/>
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
        businessMsg,
        business,
        patternn,
        clause
      },
      data() {
        return {
          patternPay: '',
          pay: '',
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
      methods: {
        ...mapActions([ 'orderCancel', 'wechat', 'reply' ]),
        ...mapMutations(['payPc', 'orderCancelCommon']),
        offOrder() {
          if (this.$route.query.state === 'details') {
            // 弹出取消页面
            this.$emit('show-model', true);
          } else {
            this.orderCancelCommon({
              order_id: this.orderData.order_id,
              str: 'office',
              _this: this
            });
          }
        },
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
          if (this.patternPay === 'zhifubao') {
            type = 1;
          }
          if (this.patternPay === 'weixin') {
            type = 2;
          }
          if (this.patternPay === 'paypal') {
            type = 3;
          }
          this.payPc({
            _this: this,
            type: type,
            order_id: this.$route.query.id,
            payedType: 'office'
          })
        },
        replyApi(obj) {
          this.reply(obj).then(res => {
            if (res.code === 200) {
              this.$router.push({
                path: '/book/payed',
                query: {
                  id: obj.order_id,
                  type: 'office'
                }
              })
            } else if (res.code === 400) {
              setTimeout(() => {
                this.replyApi(obj);
              }, 500)
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

<style scoped lang='less' type="text/less">
  .affirm-office {
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
      &-msg {
        margin-top: 50px;
      }
      &-business {
        margin-top: 50px;
      }
      &-patternn {
        margin-top: 50px;
      }
    }
  }
</style>
