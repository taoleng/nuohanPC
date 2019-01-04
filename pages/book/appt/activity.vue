<template>
  <!--发起活动页面-->
  <div class="start-activity">
    <div>
      <p class="list-header">
        <i class="iconfont icon-leibie"/><b/><span>{{ $t('lang.book.appt.activity.form') }}</span>
      </p>
      <div class="select-ee-width570">
        <input-ee1 :placeholder="$t('lang.book.appt.activity.item1place')" v-model="acData.modus"/>
      </div>
    </div>
    <div class="margintop45">
      <p class="list-header">
        <i class="iconfont icon-qiapianxingshi"/><b/><span>{{ $t('lang.book.appt.activity.industryclass') }}</span>
      </p>
      <div class="select-ee-width570">
        <input-ee1 :placeholder="$t('lang.book.appt.activity.project')" v-model="acData.type"/>
      </div>
    </div>
    <div class="margintop45 start-activity-kecheng">
      <p class="list-header">
        <i class="iconfont icon-xiugai"/><b/><span>{{ $t('lang.book.appt.activity.business') }}</span>
      </p>
      <div class="select-ee-width570">
        <inputEe :placeholder="$t('lang.book.appt.activity.agenda')" v-model="acData.content"/>
      </div>
    </div>
    <div class="margintop45 start-activity-time">
      <datePicker :text="$t('lang.book.appt.activity.selecttime')" :type="'datetimerange'" v-model="acData.time"/>
    </div>
    <div class="margintop45">
      <p class="list-header">
        <i class="iconfont icon-renshu"/><b/><span>{{ $t('lang.book.appt.activity.numberParticipants') }}</span>
      </p>
      <div class="select-ee-width570">
        <amount-btn v-model="acData.people"></amount-btn>
      </div>
    </div>
    <div class="margintop45">
      <p class="list-header">
        <i class="iconfont icon-wo"/><b/><span>{{ $t('lang.book.appt.activity.name') }}</span>
      </p>
      <div class="select-ee-width570">
        <input-ee1 :placeholder="$t('lang.book.appt.activity.namePlace')" v-model="acData.realname"/>
      </div>
    </div>
    <div class="margintop45 start-activity-phone">
      <div class="activity-phone">
        <p class="list-header">
          <i class="iconfont icon-shouji"/><b/><span>{{ $t('lang.book.appt.activity.phone') }}</span>
        </p>
        <div class="select-ee-width570">
          <input-ee1 :placeholder="$t('lang.book.appt.activity.phoneandEmail')" v-model="acData.mobile"/>
          <p class="activity-phone-div" @click="yanzhen">
            <template v-if="isLoad">
              <Spin fix>
                <Icon type="ios-loading" class="demo-spin-icon-load"></Icon>
              </Spin>
            </template>
            {{ yzContent }}
          </p>
        </div>
      </div>
    </div>
    <div class="margintop45">
      <p class="list-header">
        <i class="iconfont icon-AK-MNdunpai"/><b/><span>{{ $t('lang.book.appt.activity.yzm') }}</span>
      </p>
      <div class="select-ee-width570">
        <input-ee1 :placeholder="$t('lang.book.appt.activity.yzmplac')" v-model="acData.code"/>
      </div>
    </div>
    <div class="reserve-btn">
      <clause v-model="single"></clause>
      <div @click="submit">
        <btn-right :text="$t('lang.btn.submit')"/>
      </div>
    </div>
  </div>
</template>

<script>
  import btnRight from '~/components/common/button/btn-right';
  import selectEe from '~/components/common/pullDown/select-ee';
  import inputEe from '~/components/common/input/input-ee';
  import inputEe1 from '~/components/common/input/input-ee1';
  import datePicker from '~/components/common/timer/date-picker';
  import clause from '~/components/common/select/clause';
  import amountBtn from '~/components/common/button/amount-btn';
  import {isPhone, isEmail} from '~/assets/js/tool';
  import model1 from '~/components/common/pop/model1';
  import {mapActions, mapMutations, mapState} from 'vuex'

  export default {
    components: {
      selectEe,
      btnRight,
      inputEe,
      inputEe1,
      datePicker,
      clause,
      amountBtn,
      model1
    },
    data() {
      return {
        acData: {
          modus: '', // 活动形式
          type: '', //行业类别
          content: '', // 活动内容
          time: {}, // 活动时间
          people: 0, // 参与人数
          realname: '', //称谓
          mobile: '', // 手机号或者邮箱
          code: ''
        },
        init: true,
        single: false,
        isLoad: false,
        isLock: false,
        isCyz: false,
        yzContent: this.$t('lang.common.sendYzm')
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookActivityPro')
      }
    },
    mounted() {
      window.scrollTo(0,0)
    },
    methods: {
      ...mapActions(['activityBooking', 'actSendsms']),
      submit() {
        // acData: {
        //   modus: '', // 活动形式
        //     type: '', //行业类别
        //     content: '', // 活动内容
        //     time: {}, // 活动时间
        //   people: 0, // 参与人数
        //     realname: '', //称谓
        //     mobile: '', // 手机号或者邮箱
        //     code: ''
        // },
        if (!this.acData.modus) {
          this.$Message.warning(this.$t('lang.book.appt.activity.item1place'));
          return;
        }
        if (!this.acData.type) {
          this.$Message.warning(this.$t('lang.book.appt.activity.project'));
          return;
        }
        if (!this.acData.content) {
          this.$Message.warning(this.$t('lang.book.appt.activity.agenda'));
          return;
        }
        if (!this.acData.time.hour) {
          this.$Message.warning(this.$t('lang.book.appt.activity.selecttime'));
          return;
        }
        if (!this.acData.people) {
          this.$Message.warning(this.$t('lang.book.appt.activity.numberParticipants'));
          return;
        }
        if (!this.acData.realname) {
          this.$Message.warning(this.$t('lang.book.appt.activity.name'));
          return;
        }
        if (!this.acData.code) {
          this.$Message.warning(this.$t('lang.book.appt.activity.phoneandEmail'));
          return;
        }
        if (!this.single) {
          this.$Message.warning(this.$t('lang.model.model1.clause'));
          return;
        }
        if (!this.acData.mobile) {
          this.$Message.warning(this.$t('lang.common.fill'));
          return;
        }
        if (isPhone(this.acData.mobile) || isEmail(this.acData.mobile)) {

        } else {
          this.$Message.warning(this.$t('lang.common.fillerr'));
          return;
        }
        var obj = this.acData;
        obj.start_time = this.acData.time.date[0];
        obj.end_time = this.acData.time.date[1];
        // 提交
        this.activityBookingApi(obj)
      },
      activityBookingApi(obj) {
        this.activityBooking(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            //  跳转到订单
            this.$router.push({
              path: '/book/payed',
              query: {
                type: 'sponsor'
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
      },
      yanzhen() {
        var time = null;
        if (!this.acData.mobile) {
          return this.$Message.warning(this.$t('lang.common.emailandphone'));
        }
        // 锁 返回
        if (this.isLock) {
          return;
        }
        var mins = 60;
        // 锁 true
        this.isLock = true;
        // 点击开始loading
        this.isLoad = true
        // 发送验证码
        this.actSendsms({mobile: this.acData.mobile}).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            // 接口回来取消load;
            this.isLoad = false;
            // 倒计时
            this.yzContent = (mins--) + 's';
            clearInterval(time);
            time = setInterval(() => {
              if (mins === 0) {
                this.isLoad = false;
                this.isLock = false;
                this.yzContent = this.$t('lang.common.sendYzm');
                clearInterval(time);
                return;
              }
              this.yzContent = (mins--) + 's';
            }, 1000)
            //  开始计时
          } else if (res.code === 400) {
            this.isLock = false;
            this.isLoad = false;
            this.$Message.warning(res.msg);
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

<style lang='less' type="text/less">
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }

  .start-activity {
    .activity-phone {
      overflow: hidden;
      .input-ee1 {
        float: left;
        width: 410px;
        margin-right: 18px;
      }
      .activity-phone-div {
        position: relative;
        cursor: pointer;
        float: left;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
        width: 135px;
        height: 38px;
        background: #999999;
        margin-bottom: 18px;
        .ivu-spin-fix {
          background: #999999 !important;
        }
        .ivu-spin {
          color: #ffffff !important;
        }
      }
    }
    &-kecheng {
    }
    &-phone {
      overflow: hidden;
      button {
        float: left;
        display: inline-block;
        height: 38px;
        width: 118px;
        font-size: 14px;
        text-align: center;
        line-height: 38px;
        color: #999999;
        background: #535353;
        border: none;
      }
    }
  }
</style>
