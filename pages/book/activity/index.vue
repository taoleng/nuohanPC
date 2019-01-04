<template>
  <div class="activitylist">
    <div class="nuohan-container">
      <div class="activitylist-left">
        <div class="activitylist-left-header">
          <div
            :class="{
              'checked-all': checked === 'all',
              'checked-new': checked === 'new'
            }"
            class="activitylist-left-header-left">
            <span @click="checked = 'all'">{{ $t('lang.book.activity.all') }}</span>
            <span @click="checked = 'new'">{{ $t('lang.book.activity.new') }}</span>
            <p class="activitylist-left-header-left-line"></p>
          </div>
          <nuxt-link to="/book/appt/activity">
            <div class="activitylist-left-header-right hoverblack03">
              <span >{{ $t('lang.book.activity.sponsoractivi') }}</span>
              <i class="iconfont icon-you"></i>
            </div>
          </nuxt-link>
        </div>
        <ul class="activitylist-left-list">
          <!--统一 图片按照320 * 200传-->
          <nuxt-link v-for="(item, index) in list" :key="index" :to="'/book/activity/detail?id=' + item.id">
            <li class="activitylist-left-list-li">
              <div v-if="!item.state" class="activitylist-left-list-li-banner">
                {{ $t('lang.book.activity.activied') }}
              </div>
              <img :src="item.cover" alt="图片加载失败">
              <div class="activitylist-left-list-li-content">
                <div class="activitylist-left-list-li-content-top">
                  <div :style="{ background: !item.state ? '#999999' : '' }" class="activitylist-left-list-li-content-top-time">
                    <p class="time-day">{{ item.day }}</p>
                    <p class="time-month">{{ item.month }}</p>
                  </div>
                  <div class="activitylist-left-list-li-content-top-right">
                    <h3>{{ item.title }}</h3>
                    <div class="activitylist-left-list-li-content-top-right-content">
                      <p>
                        <span>{{ $t('lang.book.activity.price2') }}</span>
                        <i>{{ item.price }}/{{ $t('lang.book.activity.wei') }}</i>
                      </p>
                      <p>
                        <span>{{ $t('lang.book.activity.side') }}：</span>
                        <i>{{ item.address }}</i>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="activitylist-left-list-li-content-bottom">
                  <p v-html="item.intro"></p>
                </div>
              </div>
            </li>
          </nuxt-link>
        </ul>
        <div class="activitylist-left-page">
          <nuohan-page
            :count="page.count"
            :pagesize="page.pagesize"
            :current="page.current"
            @on-change="changepage"
          ></nuohan-page>
        </div>
      </div>
      <div class="activitylist-right">
        <h3>{{ $t('lang.book.activity.wangqi') }}</h3>
        <ul v-if="passlist[0]" class="activitylist-right-list">
          <nuxt-link v-for="(item, index) in passlist" :key="index" :to="'/book/activity/detail?id=' + item.id">
            <li class="activitylist-right-list-li">
              <img :src="item.cover" alt="图片加载失败">
              <div class="activitylist-right-list-li-title">
                <span></span>
                <h3>{{ item.title }}</h3>
              </div>
              <div class="activitylist-right-list-li-time">
                <span>{{ $t('lang.book.activity.shijian') }}</span>
                <b>{{ item.satrtStr }}</b>
              </div>
            </li>
          </nuxt-link>
        </ul>
        <div class="activitylist-right-sponsor">
          <p>{{ $t('lang.book.activity.noActivi') }}</p>
          <b>{{ $t('lang.book.activity.faqiActivi') }}</b>
          <nuxt-link to="/book/appt/activity">
            <span>{{ $t('lang.book.activity.faqi') }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { _filterDateString } from '~/assets/js/filter';
  import nuohanPage from '~/components/common/page/nuohan-page';
  export default {
    components: {
      nuohanPage
    },
    data() {
      return {
        monthArrEn: [
          '',
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec'
        ],
        idx: 0,
        list: [],
        passlist: [],
        checked: 'all',
        // 翻页
        page: {
          pagesize: 8,
          count: 0,
          current: 1
        },
        type: ''
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookActivity')
      }
    },
    watch: {
      checked(val) {
        if (!val) {
          return;
        }
        // 请求最新 活动
        if (val === 'new') {
          this.type = 'new'
        } else if (val === 'all') {
          this.type = ''
        }
        var obj = {
          pagesize: 8,
          page: 1,
          type: this.type
        }
        this.page = {
          pagesize: 8,
          count: 0,
          current: 1
        }
        // 切换按钮 切换请求
        this.activityListApi(obj);
      }
    },
    // layout: 'nocontainer',
    created() {
      var obj = {
        pagesize: 8,
        page: 1
      }
      // 请求全部活动
      this.activityListApi(obj);
      // 请求历史活动
      this.activityListOver();
    },
    head () {
      return {
        title: '最新活动'
      }
    },
    mounted() {
      window.scrollTo(0,0)
    },
    methods: {
      ...mapActions(['activityList']),
      // 最新活动 和全部活动 用此方法
      activityListApi(obj) {
        this.activityList(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            this.list = data.list;
            data.list.forEach((v) => {
              var satrtStr = _filterDateString(v.start_time * 1000);
              var timeArr = satrtStr.split(' ')[0].split('-');
              v.month = this.monthArrEn[Number(timeArr[1])];
              v.day = timeArr[2];
            })
            window.scrollTo(0,0);
            //  请求成功获取数据总数
            this.page.count = data.count;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      // 往期活动 用此方法
      activityListOver() {
        var obj = {
          type: 'pass',
          page: 1
        }
        this.activityList(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            data.list.forEach((v) => {
              var satrtStr = _filterDateString(v.start_time * 1000);
              v.satrtStr = satrtStr;
            })
            this.passlist = data.list;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      changepage(page) {
        //  点击切换页面按钮 首先改变组件的按钮
        if(window)window.scrollTo(0,0);
        this.page.current = page;
        //  请求
        var obj = {
          pagesize: 8,
          page: page,
          type: this.type
        }
        this.activityListApi(obj);
        //  全部活动 最新活动 完成
      }
    },
    layout: 'layouts5'
  }
</script>

<style scoped lang='less' type="text/less">
  .activitylist {
    padding-top: 40px;
    padding-bottom: 100px;
    overflow: hidden;
    &-left {
      float: left;
      width: 742px;
      &-header {
        border-bottom: 1px solid #cecece;
        height: 63px;
        clear: both;
        &-left {
          float: left;
          padding-top: 10px;
          height: 62px;
          position: relative;
          span {
            line-height: 1;
            margin-right: 72px;
            font-size: 24px;
            color: #333333;
            cursor: pointer;
            height: 100%;
            display: inline-block;
          }
          &-line {
            transition: all 0.2s linear;
            position: absolute;
            left: 0px;
            bottom: -3px;
            width: 48px;
            height: 3px;
            background: #dd7116;
          }
          &.checked-all {
            span:nth-child(1) {
              color: #dd7116;
            }
            .activitylist-left-header-left-line {
              left: 0px;
            }
          }
          &.checked-new {
            span:nth-child(2) {
              color: #dd7116;
            }
            .activitylist-left-header-left-line {
              left: 145px;
            }
          }
        }
        &-right {
          cursor: pointer;
          float: right;
          height: 42px;
          padding: 0 9px;
          background: #dd7116;
          color: #ffffff;
          text-align: center;
          line-height: 42px;
          font-size: 16px;
          span {
            margin-right: 18px;
          }
          i {
            position: relative;
            top: -1px;
            font-size: 13px;
          }
        }
      }
      &-list {
        padding-top: 60px;
        &-li {
          padding-bottom: 50px;
          position: relative;
          &-banner {
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 330.8px;
            background: black;
            opacity: 0.5;
            line-height: 330.8px;
            text-align: center;
            font-size: 30px;
            color: #ffffff;
            font-weight: bold;
          }
          img {
            display: block;
            width: 100%;
          }
          &-content {
            padding-top: 30px;
            &-top {
              overflow: hidden;
              margin-bottom: 23px;
              &-time {
                float: left;
                width: 74px;
                height: 74px;
                text-align: center;
                text-align: center;
                color: #ffffff;
                background: #dd7116;
                margin-right: 15px;
                padding-top: 14px;
                .time-day {
                  font-size: 22px;
                  font-weight: 700;
                  line-height: 27px;
                }
                .time-month {
                  font-size: 14px;
                  line-height: 21px;
                }
              }
              &-right {
                float: left;
                display: inline-block;
                h3 {
                  width: 650px;
                  line-height: 1.1;
                  color: #333333;
                  margin-bottom: 23px;
                  height: 15px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical !important;
                  -webkit-line-clamp: 1;
                  overflow: hidden;
                  /*! autoprefixer: off */
                }
                &-content {
                  p {
                    font-size: 14px;
                    line-height: 1;
                    margin-bottom: 10px;
                    span {
                      color: #999999;
                    }
                    i {
                      color: #333333;
                      font-style: normal;
                    }
                    &:nth-child(2) {
                      margin-bottom: 0px;
                    }
                  }
                }
              }
            }
            &-bottom {
              font-size: 14px;
              color: #999999;
              p {
                padding-left: 89px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                /* autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
              }
            }
          }
        }
      }
      &-page {
        margin-top: 20px;
      }
    }
    &-right {
      width: 380px;
      float: right;
      h3 {
        font-weight: normal;
        font-size: 20px;
        color: #333333;
        line-height: 62px;
      }
      &-list {
        border: 1px solid #cecece;
        padding-top: 60px;
        &-li {
          padding: 0px 28px;
          padding-bottom: 50px;
          position: relative;
          img {
            display: block;
            width: 100%;
            margin-bottom: 17px;
          }
          &-title {
            height: 18px;
            line-height: 18px;
            margin-bottom: 11px;
            overflow: hidden;
            span {
              float: left;
              display: inline-block;
              height: 12px;
              width: 12px;
              border-radius: 50%;
              background: #dd7116;
              margin-right: 15px;
              position: relative;
              top: 2px;
            }
            h3 {
              float: left;
              width: 288px;
              height: 18px;
              line-height: 20px;
              font-weight: 700;
              font-size: 18px;
              color: #333333;
              display:-webkit-box;
              -webkit-box-orient: vertical !important;
              /*! autoprefixer: off */
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
          }
          &-time {
            padding-left: 30px;
            line-height: 1;
            font-size: 14px;
            span {
              color: #999999;
            }
            b {
              font-weight: normal;
               color: #333333;
            }
          }
        }
      }
      &-sponsor {
        padding-top: 45px;
        padding-left: 25px;
        margin-top: 53px;
        width: 100%;
        height: 317px;
        background: url("../../../assets/img/book/sponsor-bg.jpg") center center no-repeat;
        background-size: 100%;
        font-size: 24px;
        color: #333333;
        line-height: 30px;
        margin-bottom: 18px;
        b {
          font-weight: normal;
        }
        span {
          margin-top: 18px;
          width: 60px;
          text-align: center;
          font-size: 14px;
          line-height: 23px;
          display: block;
          color: #dd7116;
          border-bottom: 1px solid #dd7116;
        }
      }
    }
  }
</style>
