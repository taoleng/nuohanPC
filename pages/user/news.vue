<template>
  <div class="personal">
    <div class="nuohan-container">
      <user-head></user-head>
      <div class="personal-content">
        <user-menu></user-menu>
        <div class="personal-content-right">
          <div class="information informationconmmon">
    <h3>{{ $t('lang.user.news.allMsg') }}</h3>
    <ul class="information-msg">
      <li v-for="(item, index) in list" :key="index" class="information-msg-lis">
        <p v-if="item.unread" class="information-msg-lis-looked">
        </p>
        <div class="information-msg-lis-header">
          <p><span>{{ item.create_time }}</span></p>
          <template v-if="item.msgtype === 1">
            <ul>
              <li><b>{{ $t('lang.common.orderMsg') }}：</b><span>{{ type[ item.type ] }}</span></li>
              <li><b>{{ $t('lang.user.news.orderNum') }}</b><span>{{ item.order_id }}</span></li>
            </ul>
          </template>
          <template v-else>
            <ul>
              <li><b>{{ $t('lang.user.news.systemMsg') }}</b><span>{{ $t('lang.user.news.system') }}</span></li>
            </ul>
          </template>
        </div>
        <div :class="{checked: item.lookDtail}" class="information-msg-lis-content">
          <span :class="{ nolook: item.unread }">
            <template v-if="item.msgtype === 1">
              {{ $t('lang.common.orderMsg') }}：
            </template>
            <template v-else>
              {{ $t('lang.user.news.systemMsg') }}
            </template>
          </span>
          <p v-html="item.message"></p>
          <template v-if="item.msgtype === 1">
            <b @click="clickOrderDetails(item)">{{ $t('lang.user.news.lookDetails') }}</b>
          </template>
          <template v-else>
            <b @click="lookDtail(index)">
              <template v-if="!item.lookDtail">
                {{ $t('lang.user.news.open') }}
              </template>
              <template v-else>
                {{ $t('lang.user.news.close') }}
              </template>
            </b>
          </template>
        </div>
      </li>
    </ul>
    <div class="information-page">
      <nuohan-page
        :count="page.count"
        :pagesize="page.pagesize"
        :current="page.page"
        @on-change="changepage"
      ></nuohan-page>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //订单类型，1-办公室，2会议室，3线下会谈，4在线会议，5问题，6预约服务，7预约活动
  import nuohanPage from '~/components/common/page/nuohan-page';
  import { mapActions } from 'vuex'
  import userHead from '~/components/user/userHead'
  import userMenu from '~/components/user/userMenu'

  export default {
    layout: 'layouts2',
    components: {
      nuohanPage, userHead, userMenu
    },
    data() {
      return {
        list: {},
        type:this.$t('lang.common.type'),
        page: {
          count: 0,
          pagesize: 8,
          page: 1
        }
      }
    },

    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    created() {
      // 初始请求
      this.userMessageApi({
        pagesize: this.page.pagesize,
        page: this.page.page
      });
    },
    methods: {
      ...mapActions(['userMessage', 'orderReadmsg']),
      userMessageApi(obj) {
        this.userMessage(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            data.list.forEach((v) => {
              v.lookDtail = false;
            })
            this.list = data.list
            this.page.count = data.count;
            this.page.pagesize = data.pagesize;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      lookDtail(index) {
        this.list[index].lookDtail = !this.list[index].lookDtail;
        // 前端 已读
        // 后端 已读
        if (this.list[index].unread) {
          this.list[index].unread = 0;
          this.orderReadmsg({ order_id: this.list[index].order_id }).then((res) => {
            if (res.code === 200) {
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
      clickOrderDetails(item) {
        //订单类型，1-办公室，2会议室，3线下会谈，4在线会议，5问题，6预约服务，7预约活动
        var arr = [
          '',
          'office',
          'room',
          'talks',
          'meeting',
          'question',
          'service',
          'activity'
        ]
        this.$router.push({
          path: '/book/order/' + arr[item.type],
          query: {
            id: item.order_id,
            state: 'details',
            isPersonal: 'true'
          }
        })
      },
      changepage(val) {
        this.page.page = val;
        this.userMessageApi({
          pagesize: this.page.pagesize,
          page: this.page.page
        })
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .information {
    &-msg {
      &-lis {
        position: relative;
        padding-left: 10px;
        padding-top: 25px;
        padding-bottom: 25px;
        border-top: 1px solid #e5e5e5;
        &-looked {
          position: absolute;
          width: 6px;
          height: 6px;
          top: 29px;
          left: -15px;
          border-radius: 50%;
          background: #dd7116;
        }
        &-header {
          overflow: hidden;
          margin-bottom: 18px;
          line-height: 1;
          b {
            font-weight: normal;
            line-height: 1;
            color: #999999;
            font-size: 12px;
          }
          p {
            width: 395px;
            float: left;
            line-height: 1;
            span {
              font-weight: normal;
              line-height: 1;
              color: #999999;
              font-size: 12px;
              margin-right: 14px;
            }
          }
          ul {
            float: right;
            width: 415px;
            li {
              span {
                font-size: 12px;
                color: #666666;
              }
            }
            li:nth-child(1) {
              float: left;
            }
            li:nth-child(2) {
              float: right;
            }
          }
        }
        &-content {
          overflow: hidden;
          span {
            float: left;
            line-height: 26px;
            color: #333333;
            margin-right: 4px;
            &.nolook {
              color: #dd7116;
            }
          }
          p {
            float: left;
            width: 525px;
            line-height: 26px;
            color: #333333;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            transition: all 0.1s linear;
          }
          b {
            float: right;
            display: block;
            width: 116px;
            height: 30px;
            color: #999999;
            font-weight: normal;
            border: 1px solid #dcdcdc;
            text-align: center;
            line-height: 28px;
            cursor: pointer;
            transition: all 0.1s linear;
          }
          &.checked {
            p {
              white-space: normal;
            }
            /*b {*/
              /*background: #e5e5e5;*/
              /*border-color: #e5e5e5;*/
              /*color: #ffffff;*/
            /*}*/
          }
        }
      }
    }
  }
</style>
