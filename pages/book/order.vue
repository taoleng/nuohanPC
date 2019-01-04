<template>
  <!--确认订单的父路由-->
  <!--qurery state为 details 时此页面为订单详情-->
  <div class="affirm">
    <div class="affirm-navigation">
      <div class="affirm-title">
        <div class="nuohan-container">
          <img src="~/assets/img/book/dingdan.png" alt="">
          <span>
            <template v-if="$route.query.state === 'details'">{{ $t('lang.book.order.title1') }}</template>
            <template v-else>{{ $t('lang.book.order.title2') }}</template>
          </span>
        </div>
      </div>
      <div class="nuohan-container">
        <div v-if="$route.query.state === 'details'" class="affirm-null">
        </div>
        <div v-else class="affirm-title2">
          {{ $t('lang.book.order.content') }}
        </div>
      </div>
      <div class="nuohan-container">
        <nuxt-child
          @childPay="childPay"
          @show-model="showmodel"
          @show-youhui="showYouhui"
          @show-papel = "showPalpel"
          @initdetal="init"
        />
      </div>
    </div>
    <pay-erweima :type="type" :price="price" :erweima="erweima" v-model="isShowErweima"></pay-erweima>
    <model1
      :title="$t('lang.model.model1.title')"
      :is-show-icon="false"
      :text="$t('lang.model.model1.clause')"
      v-model="isShowModel"
      :type="3"
      :order-id="$route.query.id"
      :is-affrm="true"
    />
    <model1
      v-model="isShowPapel"
      :title="$t('lang.model.model1.title2')"
      :btn-type="'3'"
      :text="$t('lang.model.model1.text2')"
    />
    <model1
      v-model="isShowYouhui"
      :type="4"
      :order-id="$route.query.id"
      :title="$t('lang.model.model1.title3')"
    />
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  import model1 from '~/components/common/pop/model1';
  import payErweima from '~/components/common/pop/pay-erweima';
    export default {
      layout: 'nocontainer',
      components: {
        payErweima,
        model1
      },
      data() {
        return {
          // 订单填写原因的弹出
          isShowModel: false,
          // 优惠码的弹出
          isShowYouhui: false,
          isShowPapel: false,
          // 订单提示原因
          isShowErweima: false,
          erweima: '/',
          price: '',
          type: undefined
        }
      },
      computed: {
        ...mapState(['userInfo', 'webToken','payReplyTimer']),
      },
      mounted() {
        window.scrollTo(0,0);
      },
      created() {
        if (this.$route.query.id) {
          this.orderDetailApi();
          if (!this.userInfo.email) {
            return;
          }
          this.initUserInfo();
        }
      },
      beforeDestroy(){
        if(this.payReplyTimer){
          clearInterval(this.payReplyTimer)
        }
        document.body.style.overflow = 'auto'
      },
      methods: {
        ...mapActions([ 'orderDetail', 'orderReadmsg']),
        ...mapMutations([ 'setOrderData', 'initUserInfo', 'SET_WEB_TOKEN']),
        childPay(obj) {
          this.isShowErweima = obj.isShow;
          this.type = obj.type;
          this.price = obj.price;
          this.erweima = obj.erweima;
        },
        orderReadmsgApi() {
          this.orderReadmsg({ order_id: this.$route.query.id }).then((res) => {
             if (res.code === 200) {
             } else if (res.code === 400) {
               this.$Message.warning(res.msg);
             } else if (res.code === -1) {
               this.$Message.warning(res.msg);
             } else if (res.code === -2) {
               this.$Message.warning(res.msg);
             }
          })
        },
        orderDetailApi() {
          this.orderDetail({ order_id: this.$route.query.id,msg: true }).then((res) => {
            if (res.code === 200) {
              let data = res.data;
              data.this = this;
              this.setOrderData(data);
            }else if (res.code === 400) {
              this.$Message.warning(res.msg);
            } else if (res.code === -1) {
              this.$Message.warning(res.msg);
            } else if (res.code === -2) {
              this.$Message.warning(res.msg);
            }
          }).then(() => {
            //  详情数据请求完毕 确认用户已读
            if (this.$route.query.state === 'details') {
              this.orderReadmsgApi();
            }
          })
        },
        init() {
          this.orderDetailApi()
        },
        showmodel(bool) {
          this.isShowModel = bool;
        },
        showYouhui(bool) {
          this.isShowYouhui = bool;
        },
        showPalpel(bool) {
          this.isShowPapel = bool;
        }
      },
      layout: 'layouts5',
      middleware: 'getBeforUrl'
    }
</script>

<style scoped lang='less' type="text/less">
  .affirm {
    padding-top: 20px;
    padding-bottom: 70px;
    &-title {
      height: 116px;
      background: #f6f6f6;
      margin-bottom: 28px;
      img {
        width: 36px;
        display: inline-block;
        vertical-align: middle;
        line-height: 116px;
        margin-right: 15px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 36px;
        line-height: 116px;
        color: #dd7116;
      }
    }
    &-title2 {
      font-size: 18px;
      line-height: 38px;
      color: #999999;
      /*padding-bottom: 70px;*/
    }
    &-null {
      height: 0px;
    }
  }
</style>
