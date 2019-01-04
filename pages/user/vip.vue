<template>
  <!--会员信息页面-->
  <div class="personal">
    <div class="nuohan-container">
      <user-head></user-head>
      <div class="personal-content">
        <user-menu></user-menu>
        <div class="personal-content-right">
          <div class="vip informationconmmon">
            <h3>{{ $t('lang.user.news.hyqy') }}</h3>
            <ul>
              <li class="user-list">
                <div class="userlist-title">
                  <span>{{ $t('lang.user.vip.online') }}<i>{{ userInfo.vip_data.meeting || '0' }}{{ $t('lang.common.hour') }}</i></span>
                </div>
                <div class="userlist-title">
                  <span>{{ $t('lang.user.vip.question') }}<i>{{ userInfo.vip_data.question || '0' }}{{ $t('lang.common.time') }}</i></span>
                </div>
                <div class="userlist-title">
                  <span>{{ $t('lang.user.vip.activity') }}<i>{{ userInfo.vip_data.activity || '0' }}{{ $t('lang.common.time') }}</i></span>
                </div>
              </li>
              <li class="user-list">
                <div class="userlist-title">
                  <span>{{ $t('lang.user.vip.metting') }}<i>{{ userInfo.vip_data.meeting_room || '0' }}</i></span>
                </div>
                <!--<div class="userlist-title">-->
                  <!--<span>法律咨询剩余：<i>{{ userInfo.vip_data.legal || '0天' }}</i></span>-->
                <!--</div>-->
                <!--<div class="userlist-title">-->
                  <!--<span>财税咨询剩余：<i>{{ userInfo.vip_data.tax || '0天' }}</i></span>-->
                <!--</div>-->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { _filterSecond, _filterUserInfo } from 'assets/js/filter';
  import userHead from '~/components/user/userHead'
  import userMenu from '~/components/user/userMenu'

  export default {
    layout: 'layouts2',
    components: {
      userHead, userMenu
    },
    data() {
      return {
      }
    },

    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    computed: {
      ...mapState(['userInfo']),
    },
    created() {
      this.initUserInfo();
    },
    methods: {
      ...mapMutations(['initUserInfo']),
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .vip {
    ul {
      li {
        div:nth-child(1),div:nth-child(2) {
          width: 330px;
        }
      }
    }
  }
</style>
