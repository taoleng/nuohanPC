<template>
  <div class="activitylist-details">
    <div class="nuohan-container">
      <div class="activitylist-details-content">
        <h2>{{ $t('lang.book.activity.title') }}</h2>
        <img :src="detailsData.cover" alt="图片加载失败">
        <h3 class="activitylist-details-content-header">{{ detailsData.title || '--' }}</h3>
        <div class="activitylist-details-content-synopsis activitylist-common1">
          <span>{{ $t('lang.book.activity.synopsis') }}</span>
          <p v-html="detailsData.intro || '-'"></p>
        </div>
        <div class="activitylist-details-content-site activitylist-common1">
          <span>{{ $t('lang.book.activity.side') }}</span>
          <p>{{ detailsData.address }}</p>
        </div>
        <div class="activitylist-details-content-timeamount">
          <div class="activitylist-details-content-timeamount-time">
            <span class="span-common">{{ $t('lang.book.activity.time') }}</span>
            <p>{{ detailsData.satrtStr || '--' }}</p>
          </div>
          <div class="activitylist-details-content-timeamount-amount">
            <span class="span-common">{{ $t('lang.book.activity.num') }}</span>
            <amount-btn v-model="num" ></amount-btn>
            <i class="pepoel-font">{{ $t('lang.common.person') }}</i>
          </div>
        </div>
        <div class="activitylist-details-content-price">
          <span class="span-common">{{ $t('lang.book.activity.price') }}</span>
          <p>{{ detailsData.price || '--' }} / {{ $t('lang.common.person') }}</p>
        </div>
        <div class="activitylist-details-content-total">
          <span class="span-common">{{ $t('lang.book.activity.total') }}</span>
          <p><i>￥</i>{{ numPrice }}</p>
        </div>
        <div class="activitylist-details-content-apply">
          <div @click="submit">
            <btn-right :style="{ background: !detailsData.state ? '#999999' : '' }" :text="$t('lang.book.activity.apply')"/>
          </div>
          <div>
            <p>{{ $t('lang.book.activity.yijin') }}{{ detailsData.signup || '0' }}{{ $t('lang.book.activity.baoming') }}</p>
          </div>
        </div>
        <div class="activitylist-details-content-agenda">
          <h3>{{ $t('lang.book.activity.activity') }}</h3>
          <p
            class="activitylist-details-content-agenda-content"
            v-html="detailsData.content"
          ></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import btnRight from '~/components/common/button/btn-right';
  import amountBtn from '~/components/common/button/amount-btn';
  import {mapActions,mapState} from 'vuex'
  import { _filterDateString } from '~/assets/js/filter';
  export default {
    layout: 'layouts2',
    components: {
      btnRight,
      amountBtn
    },
    data() {
      return {
        detailsData: {
          notice:{},
          address:"",
          content:"",
          cover:"",
          end_time:"",
          id:"",
          intro:"",
          price:"",
          signup:"",
          HowLong: '',
          start_time:"",
          state:"",
          title:"",
          type:""
        },
        num: 0,
        numPrice: 0,
      }
    },
    computed:{
      ...mapState(['token','userInfo'])
    },
    head(){
      return {
        title:this.$t('lang.title.bookActivity')
      }
    },
    watch: {
      num(val) {
        if (this.detailsData.price) {
          this.numPrice = this.num * this.detailsData.price;
        }
      }
    },
    created() {
      this.activityDetail({id: this.$route.query.id}).then((res) => {
        if (res.code === 200) {
          let data = res.data;
          data.endStr = _filterDateString(data.end_time * 1000);
          data.satrtStr = _filterDateString(data.start_time * 1000);
          this.detailsData = data;
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
        title: '参与活动'
      }
    },
    mounted() {
      window.scrollTo(0,0)
    },
    methods: {
      ...mapActions(['activityDetail', 'orderActivity']),
      submit() {
        if (!this.detailsData.state) {
          this.$Message.warning('活动已结束');
          return;
        };
        if(!(this.token && this.userInfo.email)){
          this.$router.push('/user/login');
          return;
        }
        var obj = {
          id: this.$route.query.id,
          people: this.num
        }
        this.orderActivity(obj).then((res) => {
           if (res.code === 200) {
             let data = res.data;
             this.$router.push({
               path: '/book/order/activity',
               query: {
                 id: data.order_id
               }
             })
           } else if (res.code === 400) {
             this.$Message.warning(res.msg);
           } else if (res.code === -1) {
             this.$Message.warning(res.msg);
           } else if (res.code === -2) {
             this.$Message.warning(res.msg);
           }
        })

      }
    },
    layout: 'layouts4'
  }
</script>

<style lang='less' type="text/less">
  .activitylist-details {
    padding-bottom: 80px;
    .activitylist-common1 {
      span {
        font-size: 14px;
        color: #999999;
        margin-bottom: 8px;
      }
      p {
        font-size: 14px;
        color: #333333;
      }
    }
    .span-common {
      display: block;
      line-height: 1;
      margin-bottom: 14px;
      font-size: 14px;
      color: #999999;
    }
    padding-top: 180px;
    &-content {
      h2 {
        font-size: 60px;
        color: #333333;
        line-height: 1;
        font-weight: normal;
        margin-bottom: 80px;
      }
      img {
        display: block;
        width: 100%;
        margin-bottom: 65px;
      }
      &-header {
        color: #333333;
        font-size: 30px;
        margin-bottom: 72px;
      }
      &-synopsis {
        margin-bottom: 20px;
      }
      &-site {
        margin-bottom: 40px;
      }
      &-timeamount {
        overflow: hidden;
        margin-bottom: 10px;
        &-time {
          float: left;
          margin-right: 48px;
          p {
            height: 36px;
            width: 234px;
            line-height: 32px;
            text-align: center;
            color: #dd7116;
            font-size: 14px;
            border: 2px solid #dd7116;
          }
        }
        &-amount {
          float: left;
          .amount-btn {
            display: inline-block;
            .amount-btn-content {
              .amount-btn-content-num {
                input {
                  background: #ffffff;
                  color: #dd7116;
                }
              }
            }
          }
          i.pepoel-font {
            position: relative;
            top: -17px;
            left: 15px;
            font-size: 14px;
            color: #999999;
            display: inline-block;
            font-style: normal;
          }
        }
      }
      &-price {
        margin-bottom: 20px;
        p {
          height: 36px;
          width: 125px;
          line-height: 32px;
          text-align: center;
          color: #dd7116;
          font-size: 14px;
          border: 2px solid #dd7116;
        }
      }
      &-total {
        p {
          font-size: 48px;
          color: #dd7116;
          line-height: 1;
          i {
          font-style: normal;
          font-size: 30px;
          }
        }
        margin-bottom: 40px;
      }
      &-apply {
        overflow: hidden;
        div {
          float: left;
        }
        div:nth-child(2) {
          margin-left: 35px;
          p {
            line-height: 62px;
            font-size: 14px;
            color: #999999;
          }
        }
      }
      &-agenda {
        border-top: 1px solid #f0f0f0;
        padding-top: 52px;
        margin-bottom: 70px;
        margin-top: 55px;
        h3 {
          color: #333333;
          font-size: 24px;
          margin-bottom: 34px;
        }
        &-content {
          color: #999999;
          font-size: 14px;
          p {
            line-height: 30px;
          }
        }
      }
      &-apply {
        h3 {
          color: #333333;
          font-size: 24px;
          margin-bottom: 34px;
        }
        ul {
          li {
            height: 35px;
            font-size: 0px;
            line-height: 35px;
            overflow: hidden;
            .margin2px {
              margin: 0px 2px;
            }
            i {
              float: left;
              font-size: 20px;
              color: #dd7117;
              position: relative;
              top: 1px;
            }
            span {
              float: left;
              font-size: 16px;
              color: #dd7117;
              display: inline-block;
            }
            b {
              float: left;
              font-size: 16px;
              color: #666666;
              font-weight: normal;
              display: inline-block;
            }
            &:nth-child(1) {
              i {
                font-size: 24px;
                position: relative;
                left: -2px;
                margin-right: 19px;
              }
            }
            &:nth-child(2) {
              i {
                margin-right: 22px;
              }
            }
            &:nth-child(3) {
              i {
                font-size: 24px;
                position: relative;
                left: -2px;
                margin-right: 19px;
              }
            }
            &:nth-child(4) {
              i {
                font-size: 24px;
                position: relative;
                left: -2px;
                margin-right: 19px;
              }
            }
            &:nth-child(5) {
              i {
                position: relative;
                left: 0px;
                margin-right: 22px;
              }
            }
          }
        }
      }
      /*&-header3 {*/
        /*color: #999999;*/
        /*font-size: 14px;*/
        /*line-height: 1;*/
        /*margin-top: 20px;*/
        /*margin-bottom: 40px;*/
      /*}*/
      /*&-content {*/
        /*&-top {*/
          /*overflow: hidden;*/
          /*&-left {*/
            /*float: left;*/
            /*margin-right: 100px;*/
            /*img {*/
              /*display: block;*/
            /*}*/
          /*}*/
          /*&-right {*/
            /*float: left;*/
            /*span {*/
              /*display: inline-block;*/
              /*line-height: 1;*/
              /*font-size: 14px;*/
              /*color: #999999;*/
            /*}*/
            /*&-title {*/
              /*span {*/
                /*margin-bottom: 10px;*/
              /*}*/
              /*p {*/
                /*width: 600px;*/
                /*color: #333333;*/
                /*font-size: 14px;*/
                /*line-height: 24px;*/
              /*}*/
            /*}*/
            /*&-site {*/
              /*margin-top: 22px;*/
              /*p {*/
                /*display: inline-block;*/
                /*color: #333333;*/
                /*font-size: 14px;*/
                /*line-height: 1;*/
              /*}*/
            /*}*/
            /*&-session {*/
              /*margin-top: 22px;*/
              /*margin-bottom: 18px;*/
              /*span {*/
                /*display: block;*/
                /*margin-bottom: 22px;*/
              /*}*/
              /*p {*/
                /*height: 36px;*/
                /*width: 234px;*/
                /*line-height: 32px;*/
                /*text-align: center;*/
                /*color: #dd7116;*/
                /*font-size: 14px;*/
                /*border: 2px solid #dd7116;*/
              /*}*/
            /*}*/
            /*&-price {*/
              /*margin-bottom: 20px;*/
              /*span {*/
                /*display: block;*/
                /*margin-bottom: 12px;*/
              /*}*/
              /*p {*/
                /*height: 36px;*/
                /*width: 123px;*/
                /*line-height: 32px;*/
                /*text-align: center;*/
                /*color: #dd7116;*/
                /*font-size: 14px;*/
                /*border: 2px solid #dd7116;*/
              /*}*/
            /*}*/
            /*&-total {*/
              /*span {*/
                /*margin-bottom: 10px;*/
              /*}*/
              /*p {*/
                /*font-size: 48px;*/
                /*color: #dd7116;*/
                /*line-height: 1;*/
                /*i {*/
                  /*font-style: normal;*/
                  /*font-size: 30px;*/
                /*}*/
              /*}*/
            /*}*/
            /*&-apply {*/
              /*margin-top: 15px;*/
              /*div {*/
                /*float: left;*/
                /*p {*/
                  /*padding-left: 35px;*/
                  /*font-size: 14px;*/
                  /*color: #999999;*/
                  /*line-height: 62px;*/
                  /*height: 62px;*/
                /*}*/
              /*}*/
            /*}*/
          /*}*/
        /*}*/
        /*&-bottom {*/
          /*margin-top: 73px;*/
          /*h3 {*/
            /*font-size: 24px;*/
            /*font-weight: normal;*/
            /*color: #333333;*/
            /*margin-bottom: 30px;*/
          /*}*/
          /*&-details {*/
            /*p {*/
              /*font-size: 14px;*/
              /*color: #999999;*/
              /*width: 995px;*/
              /*line-height: 20px;*/
            /*}*/
          /*}*/
          /*&-apply {*/
            /*margin-top: 70px;*/
            /*padding-bottom: 70px;*/
            /*table {*/
              /*width: 658px;*/
              /*border: 2px solid #dcdcdc;*/
              /*border-collapse: collapse;*/
              /*td {*/
                /*width: 143px;*/
                /*height: 51px;*/
                /*text-align: center;*/
                /*font-size: 16px;*/
                /*color: #333333;*/
                /*background: #eeeeee;*/
                /*border-right: 2px solid #dcdcdc;*/
                /*border-bottom: 1px solid #dcdcdc;*/
                /*&.td2 {*/
                  /*width: 512px;*/
                  /*color: #999999;*/
                  /*text-align: left;*/
                  /*text-indent: 45px;*/
                  /*background: transparent;*/
                /*}*/
              /*}*/
            /*}*/
          /*}*/
        /*}*/
      /*}*/
    }
  }
</style>
