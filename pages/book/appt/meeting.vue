<template>
  <!--在线会议-->
  <div class="onlineTalks">
    <div>
      <p class="list-header">
        <i class="iconfont icon-qiapianxingshi"/><b/><span>{{ $t('lang.book.appt.meeting.item1') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="bigProject" v-model="bigProjectId" :placeholder="$t('lang.book.appt.meeting.item1place')"/>
      </div>
    </div>
    <div class="margintop45">
      <p class="list-header">
        <i class="iconfont icon-muluxiangmu"/><b/><span>{{ $t('lang.book.appt.meeting.item2') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="smallProject" v-model="smallProjectId"
                   :placeholder="$t('lang.book.appt.meeting.item2place')"/>
      </div>
    </div>
    <div class="margintop45 start-activity-kecheng">
      <p class="list-header">
        <i class="iconfont icon-shuoming"/><b/><span>{{ $t('lang.book.appt.meeting.shuoming') }}</span>
      </p>
      <div class="select-ee-width570">
        <inputEe v-model="contentText" :placeholder="$t('lang.book.appt.meeting.shuomingplace')"/>
      </div>
    </div>
    <div class="talks-date margintop45">
      <div class="talks-date-date">
        <datePicker v-model="dayTime" :type="'datetimerange'" :text="$t('lang.book.appt.meeting.datePicker')"/>
      </div>
    </div>
    <div class="onlineTalks-calllist office-hometype margintop45">
      <div class="onlineTalks-calllist-list">
        <div class="onlineTalks-calllist-list-select">
          <p class="list-header">
            <i class="iconfont icon-goutong"></i><b/><span>{{ $t('lang.book.appt.meeting.linkup') }}</span>
          </p>
          <ul class="multiple-choice">
            <li :class="{checked: contactType === 'weixin'}" @click="contactType = 'weixin'">
              <i class="iconfont icon-weixin"></i><span>{{ $t('lang.book.appt.meeting.weixin') }}</span>
            </li>
            <li :class="{checked: contactType === 'skype'}" @click="contactType = 'skype'">
              <i class="iconfont icon-skype"></i><span>skype</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="margintop45">
      <div class="onlineTalks-phone select-ee-width570">
        <p class="list-header">
          <i class="iconfont icon-wo"></i><b/><span>{{ $t('lang.book.appt.meeting.relation') }}</span>
        </p>
        <div class="activity-phone-div">
          <input-ee1 v-model="account"/>
        </div>
      </div>
      <div class="reserve-price margintop55">
        <p class="list-header">
          <i class="iconfont icon-jine"/><b/><span>{{ $t('lang.book.appt.meeting.price') }}</span><em>￥{{ price }}</em>
        </p>
      </div>
    </div>
    <div class="reserve-btn">
      <clause v-model="single"></clause>
      <div @click="submit">
        <!--/book/order/meeting-->
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
  import hourMinute from '~/components/common/timer/hour-minute';
  import btnPay from '~/components/common/button/btn-pay';
  import clause from '~/components/common/select/clause';
  import {mapActions} from 'vuex'

  export default {
    components: {
      selectEe,
      btnRight,
      inputEe,
      inputEe1,
      datePicker,
      hourMinute,
      btnPay,
      clause
    },
    head () {
      return {
        title: '在线会议'
      }
    },
    data() {
      return {
        dayTime: {
          hour: 0
        }, // 时间对象
        single: false,
        bigProject: [], // 大项下拉
        bigProjectId: '', // 大项ID
        smallProject: [], // 小项下拉
        smallProjectId: '', // 小项ID
        contactType: '', // 联系方式
        account: '', // 账号
        contentText: '', // 备注
        everyHourPrice: 0, // 每小时价格
        price: 0, //价格
        hour: 0
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookConMeet')
      }
    },
    watch: {
      bigProjectId(id) {
        // 获取第二步（小项的）数据
        this.smallProjectId = '';
        this.smallCategoryApi(id);
        this.imputedPrice();
      },
      smallProjectId(id) {
        this.smallCategoryData.forEach((v, k) => {
          if (v.id === Number(id)) {
            this.everyHourPrice = v.price
          }
        })
        this.imputedPrice();
      },
      'dayTime.hour'(val) {
        this.hour = val;
        this.imputedPrice();
      }
    },
    created() {
      this.meetingCategoryApi();
    },
    methods: {
      ...mapActions(['meetingCategory', 'meetingSmallCategory', 'orderMeeting']),
      imputedPrice() {
        this.price = this.everyHourPrice * this.hour;
      },
      meetingCategoryApi() {
        this.meetingCategory().then((res) => {
          if (res.code === 200) {
            let data = res.data;
            // 整理之后给组建 填充下拉
            var titleArr = [];
            data.forEach((v, k) => {
              titleArr.push({
                title: v.title,
                value: v.id + '',
                price: v.price
              })
            })
            this.bigProject = titleArr;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      smallCategoryApi(id) {
        this.meetingSmallCategory({'id': id}).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            // 整理之后给组建 填充下拉
            this.smallCategoryData = data;
            // 整理之后给组建 填充下拉
            var titleArr = [];
            data.forEach((v, k) => {
              titleArr.push({
                title: v.title,
                value: v.id + '',
                price: v.price
              })
            })
            this.smallProject = titleArr;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      submit() {
        if (!this.bigProjectId) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.item1place'));
          return;
        }
        if (!this.smallProjectId) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.item2place'));
          return;
        }
        if (!this.contentText) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.shuomingplace'));
          return;
        }
        if (!this.hour) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.datePicker'));
          return;
        }
        if (!this.contactType) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.linkup'));
          return;
        }
        if (!this.account) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.relation'));
          return;
        }

        if (!this.single) {
          this.$Message.warning(this.$t('lang.model.model1.clause'));
          return;
        }
        var obj = {
          id: this.smallProjectId, // 小类ID
          question: this.contentText,// 问题描述
          start: this.dayTime.date[0],
          end: this.dayTime.date[1],
          type: this.contactType, // 联系方式
          account: this.account // 联系账号
        }
        // 提交
        this.submitApi(obj)
      },
      submitApi(obj) {
        this.orderMeeting(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            //  跳转到订单
            this.$router.push({
              path: '/book/order/meeting',
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
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .onlineTalks {
    &-calllist {
      .list-header {
        margin-bottom: 15px;
        span {
          line-height: 1;
        }
      }
      &-list {
        overflow: hidden;
        .multiple-choice {
          li:nth-child(1) {
            margin-right: 8px;
          }
          li:nth-child(2) {
            margin-right: 32px;
          }
          li {
            line-height: 34px;
            span {
              vertical-align: middle;
              display: inline-block;
            }
            i {
              vertical-align: middle;
              display: inline-block;
              font-size: 24px;
              margin-right: 12px;
            }
          }
        }
        &-select {
          float: left;
        }
        &-phone {
          float: left;
          width: 200px;
        }
      }
    }
  }
</style>
