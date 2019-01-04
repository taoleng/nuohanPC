<template>
  <div class="buyMember">
    <div class="nuohan-container">
      <div class="memberTop">
        <h1>{{ $t('lang.clients.title') }}</h1>
        <p>{{ $t('lang.clients.title2') }}</p>
      </div>
      <div class="buyMemberb-banner">
        <ul>
          <div class="buyMemberb-banner-left">
            <li class="list-li">
              <div class="buyMember-common">
                <h3 class="buyMember-blue">{{ $t('lang.clients.personage') }}</h3>
                <div class="buyMember-inner">
                  <div class="buyMember-common-content">
                    <router-link to="/user/register">
                      <div class="buyMember-common-content-zhuce">
                        {{ $t('lang.clients.register') }}
                      </div>
                    </router-link>
                    <div class="buyMember-common-content-shuoming">
                      <h4>{{ $t('lang.clients.quanyi') }}</h4>
                      <ul v-html="personal.intro">
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="buyMember-common">
                <h3 class="buyMember-red">{{ $t('lang.clients.enterpriseVip') }}</h3>
                <div class="buyMember-inner">
                  <div class="buyMember-common-content">
                    <router-link to="/user/register">
                      <div class="buyMember-common-content-zhuce">
                        {{ $t('lang.clients.register') }}
                      </div>
                    </router-link>
                    <div class="buyMember-common-content-shuoming">
                      <h4></h4>
                      <ul v-html="company.intro">
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <p class="line1"></p>
            <li class="list-li">
              <div class="buyMember-common">
                <h3 class="buyMember-blcak">{{ $t('lang.compon.vippay.zx') }}</h3>
                <div class="buyMember-inner">
                  <div class="buyMember-common-content">
                    <div :class="{ noselect: !circleVip }" class="buyMember-common-content-zhuce" @click="buy('circleVip')">
                      <template v-if="userInfo.vip === 1 || userInfo.vip === 2">
                        {{ $t('lang.clients.upgrade') }}
                      </template>
                      <template v-else>
                        {{ $t('lang.clients.becomeVip') }}
                      </template>
                    </div>
                    <div class="buyMember-common-content-shuoming">
                      <h4>{{ $t('lang.clients.enjoy') }}</h4>
                      <ul v-html="circle.intro">
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="buyMember-common2">
                <RadioGroup v-model="circleVip">
                  <ul>
                    <li v-for="(item, index) in circle.data" :key="index" class="common2-list">
                      <div class="buyMember-common2-content danxuan">
                        <Radio :label="item.value">
                          <div :class="{ checked: item.value === circleVip }" class="buyMember-common2-content-right">
                            <div class="buyMember-bottom">
                              <p>{{ $t('lang.clients.online') }}{{ item.meeting_num }}{{ $t('lang.common.hour') }}</p>
                              <p>{{ $t('lang.clients.question') }}{{ item.question_num }}{{ $t('lang.common.time') }}</p>
                              <p>{{ $t('lang.clients.active') }}{{ item.activity_num }}{{ $t('lang.common.personTime') }}</p>
                            </div>
                            <b>￥{{ item.price }}{{ $t('lang.common.unit') }}</b>
                          </div>
                        </Radio>
                      </div>
                    </li>
                  </ul>
                </RadioGroup>
              </div>
            </li>
            <p class="line2"></p>
            <li class="list-li">
              <div class="buyMember-common">
                <h3 class="buyMember-yellow">{{ $t('lang.compon.vippay.zk') }}</h3>
                <div class="buyMember-inner">
                  <div class="buyMember-common-content">
                    <div :class="{ noselect: !vip }" class="buyMember-common-content-zhuce" @click="buy('vip')">
                      <template v-if="userInfo.vip === 1 || userInfo.vip === 2">
                        {{ $t('lang.clients.upgrade') }}
                      </template>
                      <template v-else>
                        {{ $t('lang.clients.becomeVip') }}
                      </template>
                    </div>
                    <div class="buyMember-common-content-shuoming">
                      <h4>{{ $t('lang.clients.enjoy') }}</h4>
                      <ul v-html="vipdata.intro">
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="buyMember-common2">
                <RadioGroup v-model="vip">
                  <ul>
                    <li v-for="(item, index) in vipdata.data" :key="index" class="common2-list">
                      <div class="buyMember-common2-content danxuan">
                        <Radio :label="item.value">
                          <div :class="{ checked: item.value === vip }" class="buyMember-common2-content-right">
                            <div class="buyMember-bottom">
                              <p class="vip-intro" v-html="item.intro"></p>
                            </div>
                            <b>￥{{ item.price }}{{ $t('lang.common.unit') }} / {{ $t('lang.common.year') }}</b>
                          </div>
                        </Radio>
                      </div>
                    </li>
                  </ul>
                </RadioGroup>
              </div>
            </li>
          </div>
          <div class="buyMemberb-banner-right">
            <li class="list-li puhua">
              <div class="buyMember-common">
                <h3 class="buyMember-cyan">{{ topclub.title }}</h3>
                <div class="buyMember-inner">
                  <div class="buyMember-common-content">
                    <a :href="topclub.link" target="_blank">
                      <div class="buyMember-common-content-zhuce">
                        {{ $t('lang.clients.becomeVip') }}
                      </div>
                    </a>
                    <div class="buyMember-common-content-shuoming">
                      <h4>{{ $t('lang.clients.enjoy') }}</h4>
                      <ul v-html="topclub.intro">
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <vip-pay
      v-model="isShowModel"
      :content="pop"
      @order-data="childOrderData"
    />
    <pay-erweima
      v-model="isShowErweima"
      :erweima="payData.url"
      :price="payData.price + ''"
      :type="payData.type"
    ></pay-erweima>
    <model1
      v-model="isShowPapel"
      :title="$t('lang.clients.order')"
      :btn-type="'3'"
      :text="$t('lang.clients.lookorder')"
    />
  </div>
</template>
<script>
  import { mapMutations, mapState, mapActions } from 'vuex'
  import model1 from '~/components/common/pop/model1';
  import vipPay from '~/components/common/pop/vip-pay'
  import payErweima from '~/components/common/pop/pay-erweima'
  export default {
    components: {
      vipPay,
      payErweima,
      model1
    },
    data(){
       return {
         circleVip: '',
         vip: '',
         isShowModel: false,
         isShowPapel: false,
         isShowErweima: false,
         payData: {},
         // 个人会员
         personal: {},
         // 企业会员
         company: {},
         circle: {
           intro: '',
           data: []
         },
         vipdata: {
           intro: '',
           data: []
         },
         topclub: {},
         pop: {}
       }
    },
    layout:"layouts4",
    computed: {
      ...mapState(['userInfo'])
    },
    head(){
      return {
        title:this.$t('lang.title.clients')
      }
    },
    created() {
      this.clients().then((res) => {
         if (res.code === 200) {
           let data = res.data;
           this.personal = data.personal;
           this.company = data.company;
           this.circle = data.circle;
           this.circle.data.forEach((v,index) => {
             v.value = (index + 1) + ',circle'
           })
           this.vipdata = data.vip;
           this.vipdata.data.forEach((v,index) => {
             v.value = (index + 1) + ',vip'
           })
           this.topclub = data.topclub;
         } else if (res.code === 400) {
           this.$Message.warning(res.msg);
         }
      })
    },
    mounted() {
      window.scrollTo(0,0);
    },
    methods: {
      ...mapActions(['clients', 'payReplyMember']),
      ...mapMutations(['setPayReplyTimer']),
      buy(str) {
        if (!this.userInfo.nickname) {
          // 未登陆
          this.$router.push({
            path: '/user/login'
          })
        } else {
          // 已登陆
          if (str === 'vip') {
            //  支付的VIP业务
            if (!this.vip) {
              this.$Message.warning(this.$t('lang.clients.select'));
            } else {
              //  弹出支付弹窗
              this.isShowModel = true;
              // 会员权益 与套餐丢给弹窗
              this.vipdata.data.forEach((v) => {
                if (v.value === this.vip) {
                  this.pop = v;
                }
              })
            }
          } else if (str === 'circleVip') {
            //  支付的circleVip业务
            if (!this.circleVip) {
              this.$Message.warning(this.$t('lang.clients.select'));
            } else {
              //  弹出支付弹窗
              this.isShowModel = true;
              // 会员权益 与套餐丢给弹窗
              this.circle.data.forEach((v) => {
                if (v.value === this.circleVip) {
                  this.pop = v;
                }
              })
            }
          }
        }

      },
      childOrderData(payData) {
        if (payData.type === 3) {
          // papael 弹出提示
          this.isShowPapel = true;
          //  新开窗口
          window.open(payData.url)
        } else {
          // 接受到传输过来的数据 将数据给二维码弹窗
          this.isShowErweima = true;
        }
        this.payData = payData;
        // 使用全局定时器 定时请求
        this.setPayReplyTimer(
          {
            str: 'open',
            type: 'buyVip',
            fun: this.payReplyMemberApi
          }
        )
      },
      payReplyMemberApi() {
        // 判断是否支付成功
        this.payReplyMember({ id: this.payData.id }).then((res) => {
           if (res.code === 200) {
             this.$Message.success(this.$t('lang.clients.paymentSuccess'))
            // 如果支付成功 关闭定时器
             this.setPayReplyTimer({ str: 'off' })
            //  关闭弹窗
             this.isShowErweima = false;
             this.isShowPapel = false;
              //  跳转到会员权益
             this.$router.push({
               path: '/user/vip'
             })
           }
        })
      }
    }
  }
</script>
<style lang='less' type="text/less" >
  @import "../assets/less/common";
  .buyMember {
    background: #eeeeee url("../assets/img/login/member_01.jpg") no-repeat;
    background-size: cover;
    padding-top: 110px;
    .buyMember-common {
      .buyMember-red {
        .gradual-bgx(#d4746a, #bb4040)
      }
      .buyMember-blue {
        .gradual-bgx(#9be4ff, #029fa1)
      }
      .buyMember-blcak {
        .gradual-bgx(#e7e7e7, #7a7a7a)
      }
      .buyMember-yellow {
        .gradual-bgx(#ffcb4e, #e99030)
      }
      .buyMember-cyan {
        .gradual-bgx(#38efcf, #00cd8f)
      }
      padding-bottom: 44px;
      h3 {
        font-weight: normal;
      }
      h3 {
        height: 77px;
        font-size: 18px;
        color: #ffffff;
        line-height: 77px;
        text-align: center;
      }
      &-content {
        padding-top: 38px;
        &-pirce {
          text-align: center;
          line-height: 1;
          height: 47px;
          margin-bottom: 20px;
          i {
            font-style: normal;
            font-size: 14px;
            color: #999999;
          }
          span {
            font-size: 48px;
          }
        }
        &-zhuce {
          margin: 0 auto;
          width: 194px;
          height: 44px;
          line-height: 42px;
          text-align: center;
          color: #dd7116;
          border: 1px solid #dd7116;
          border-radius: 12px;
          cursor: pointer;
          position: relative;
          &.noselect {
            border: 1px solid #c1c1c1;
            color: #c1c1c1;
            &:hover {
              border: 1px solid #c1c1c1;
              color: #c1c1c1;
              background: #ffffff;
            }
          }
          &:hover {
            background: #dd7116;
            color: #ffffff;
          }
        }
        &-shuoming {
          padding-left: 30px;
          h4 {
            line-height: 1;
            margin-top: 30px;
            font-size: 14px;
            color: #333333;
            margin-bottom: 16px;
          }
          ul {
            width: 165px;
            line-height: 18px;
            font-size: 12px;
            color: #c1c1c1;
            li {
              line-height: 18px;
            }
          }
        }
      }
    }
    .buyMember-common2 {
      padding-left: 30px;
      ul {
        li.common2-list {
          .ivu-radio-wrapper {
            margin-right: 0px;
          }
          margin-bottom: 30px;
          .buyMember-common2-content {
            &-right {
              float: left;
              color: #999999;
              &.checked {
                color: #dd7116;
              }
              .buyMember-bottom {
                width: 112px;
                border-bottom: 1px solid #d2d2d2;
              }
              p.vip-intro {
                display: inline-block;
                white-space: normal;
                line-height: 17px;
                width: 112px;
              }
              p {
                line-height: 1;
                margin-bottom: 5px;
                font-size: 12px;
              }
              b {
                display: block;
                height: 24px;
                font-weight: normal;
                line-height: 1;
                padding-top: 12px;
              }
            }
          }
        }
      }
    }
    .memberTop{
        h1 {
          text-align: center;
          font-size: 36px;
          line-height: 53px;
          color: #333333;
          font-weight: normal;
        }
        p {
          font-size: 14px;
          line-height: 34px;
          color: rgba(51, 51, 51, 0.45);
          text-align: center;
        }
        margin-bottom: 50px;
      }
    .buyMemberb-banner {
        width: 100%;
        padding-bottom: 105px;
        &-left {
          float: left;
          background: white;
          position: relative;
          p.line1 {
            position: absolute;
            left: 245px;
            height: 100%;
            width: 1px;
            background: #d2d2d2;
            border-right: 1px solid #d2d2d2;
          }
          p.line2 {
            position: absolute;
            left: 490px;
            height: 100%;
            width: 1px;
            background: #d2d2d2;
            border-right: 1px solid #d2d2d2;
          }
        }
        &-right {
          float: right;
        }
        ul {
          overflow: hidden;
          .list-li {
            width: 245px;
            background: #ffffff;
            float: left;
            /*height: 700px;*/
            &.puhua {
              float: right;
            }
            &:nth-child(1) {

            }
            &:nth-child(2) {

            }
            &:nth-child(3) {

            }
            &:nth-child(4) {
            }
            &:last-child {
              /*border-left: 1px solid #d2d2d2;*/
              float: right;
            }
          }
        }
    }
  }
</style>
