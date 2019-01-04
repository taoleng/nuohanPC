<template>
  <!--支付成功-->
  <!--此页面 判断type的值来提示文案-->
  <div class="payed">
    <div class="payed-navigation">
      <div class="payed-title">
        <div class="nuohan-container">
          <img src="~/assets/img/book/payed.png" alt="">
          <span>
            <template v-if="$route.query.type ==='sponsor'">
              {{ $t('lang.book.payed.title1') }}
            </template>
            <template v-else>
              {{ $t('lang.book.payed.title2') }}
            </template>
          </span>
        </div>
      </div>
      <div class="nuohan-container">
        <template v-if="$route.query.type ==='sponsor'">
          <i class="payed-icon iconfont icon-faqihuodongchenggong" style="font-size: 70px"></i>
        </template>
        <template v-else>
          <i class="payed-icon iconfont icon-dingdanchenggong"></i>
        </template>
      </div>
      <div class="nuohan-container">
        <div class="payed-title2">
          <template v-if="dataMsg">
            {{ Msg }}
          </template>
        </div>
      </div>
      <div class="nuohan-container">
        <div class="payed-btn">
          <template v-if="$route.query.type ==='sponsor'">
            <div class="payed-btn-btn2 activity-btn">
              <router-link to="/">
                <btn-pay :text="$t('lang.btn.home')"/>
              </router-link>
            </div>
          </template>
          <template v-else>
            <div class="payed-btn-btn1">
              <div @click="lookOrder">
                <btn-right :text="$t('lang.btn.orderdetail')"/>
              </div>
            </div>
            <div class="payed-btn-btn2">
              <router-link to="/">
                <btn-pay :text="$t('lang.btn.home')"/>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import btnRight from '~/components/common/button/btn-right';
  import btnPay from '~/components/common/button/btn-pay';
  import { mapActions } from 'vuex';
  export default {
    layout: 'nocontainer',
    components: {
      btnRight,
      btnPay
    },
    data() {
      return {
        dataMsg: {},
        Msg: ''
      }
    },
    created() {
      this.payMessage().then((res) => {
         if (res.code === 200) {
           let data = res.data;
           this.dataMsg = data;
           var route = this.$route.query.type;
           if (route === 'sponsor') {
             this.Msg = this.$t('lang.book.payed.title1')
           } else if (route === 'meeting') {
             this.Msg = data.onlineTalks
           } else if (route === 'talks') {
             this.Msg = data.offlineTalks
           } else if (route === 'service') {
             this.Msg = data.serve
           } else if (route === 'office') {
             this.Msg = data.office
           } else if (route === 'room') {
             this.Msg = data.conference
           } else if (route === 'question') {
             this.Msg = data.answer
           } else if (route === 'activity') {
             this.Msg = data.activity
           }
         } else if (res.code === 400) {
           this.$Message.warning(res.msg);
         } else if (res.code === -1) {
           this.$Message.warning(res.msg);
         } else if (res.code === -2) {
           this.$Message.warning(res.msg);
         }
      })
    },
    head () {
      return {
        title: this.$t('lang.title.payed')
      }
    },
    methods: {
      ...mapActions(['payMessage']),
      lookOrder() {
        this.$router.push({
          path: '/book/order/' + this.$route.query.type,
          query: {
            state: 'details',
            id: this.$route.query.id,
            type: this.$route.query.type
          }
        })
      }
    },
    layout: 'layouts5'
  }
</script>

<style scoped lang='less' type="text/less">
  .payed {
    padding-top: 22px;
    padding-bottom: 107px;
    &-navigation {
      ul {
        color: #999999;
        font-size: 0px;
        line-height: 43px;
        li {
          font-size: 14px;
          display: inline-block;
          margin-right: 15px;
          span {
            padding-right: 13px;
          }
          &.checked {
            color: #dd7116;
          }
        }
        li:last-child {
          span {
            padding-right: 0px;
          }
        }
      }
    }
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
    &-icon {
      display: block;
      font-size: 40px;
      color: #edb17f;
      margin-bottom: 10px;
    }
    &-title2 {
      width: 635px;
      font-size: 24px;
      line-height: 38px;
      color: #999999;
      /*margin-top: 40px;*/
      /*margin-bottom: 40px;*/
    }
    &-btn {
      overflow: hidden;
      padding-top: 65px;
      div {
        float: left;
      }
      &-btn1 {
        margin-right: 18px;
      }
      &-btn2.activity-btn {
        .btn-pay {
          background: #dd7116;
          color: #ffffff;
        }
      }
    }
  }
</style>

