<template>
  <div
    class="header-adaptione transitionshow"
  >
    <div class="main">
      <div class="main-inner">
        <div class="header-adaptione-nav">
          <ul class="header-adaptione-nav-list">
            <li
              v-for="(item, index) in list"
              :key="index"><a
                :class="{ apage13: homePageIdx === 1 || homePageIdx === 3, 'transition8s': true}"
                :href="item.url">{{ item.text }}</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="header-adaptione-logo">
      <router-link to="/">
        <img src="~/assets/img/logo.png">
      </router-link>
    </div>
    <div class="header-adaptione-right">
      <div class="loginweb">
        <div class="loginweb-language">
          <language :class="{ transition8s: true, language33: homePageIdx === 1 || homePageIdx === 3 }"/>
        </div>
        <div class="loginweb-content">
          <div class="loginweb-content-user">
            <a href="/user">
              <template v-if="userInfo.email">
                <b :style="{ 'background-image': 'url(' + userInfo.avatar + ')' }"></b>
              </template>
              <template v-else>
                <i
                  :style="{ color: (homePageIdx === 1 || homePageIdx === 3) ? '#333333' : '#ffffff' }"
                  class="iconfont icon-wode transition8s"
                />
              </template>
            </a>
            <template v-if="userInfo.email">
              <a href="/user">
                <span
                  :class = "{ 'apage13' : homePageIdx === 1 || homePageIdx === 3, 'transition8s': true}">
                  {{ userInfo.nickname || $t('lang.header.nickname') }}
                </span>
                <span :class = "{ 'apage13' : homePageIdx === 1 || homePageIdx === 3, 'transition8s': true}"> | </span>
              </a>
              <span :class="{ 'apage13' : homePageIdx === 1 || homePageIdx === 3, 'transition8s': true}" @click="zhuxiao">{{ $t('lang.header.out') }}</span>
            </template>
            <template v-else>
              <router-link class="login" to="/user/login?go=user">
                <span :class = "{ 'apage13' : homePageIdx === 1 || homePageIdx === 3, 'transition8s': true}">
                  {{ $t('lang.header.login') }}
                </span>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import language from './language'
  export default {
    components: {
      language,
    },
    data() {
      return {
        page: this.$store.state.homePageIdx,
        list: [
          {
            text: this.$t('lang.header.index'),
            url:'/'
          },
          {
            text: this.$t('lang.header.news'),
            url:'/news'
          },
          {
            text: this.$t('lang.header.reserve'),
            url: '/book'
          },
          {
            text: this.$t('lang.header.contact'),
            url:'/contact'
          },
          {
            text: this.$t('lang.header.clients'),
            url:'/clients'
          },
        ]
      }
    },
    computed: {
      ...mapState(['homePageIdx', 'userInfo']),
    },
    created() {
    },
    methods: {
      ...mapActions(['loginout']),
      ...mapMutations(['REMOVE_TOKEN']),
      zhuxiao() {
        this.loginout().then((res)=>{
          if(res.code === 200){
            this.REMOVE_TOKEN()
            this.$router.push({path:'/'})
          }
        })
      }
    },
  }
</script>

<style lang='less' type="text/less">
  .header-adaptione {
    /*overflow: hidden;*/
    .language33 {
      color: #333333 !important;
    }
    .apage13 {
      color: #333333 !important;
    }
    .transition8s {
      transition: all 2s linear 0s;
    }
    position: absolute;
    z-index: 3;
    width: 100%;
    min-width: 1200px;
    padding-right: 9.375%;
    .main {
      float: left;
      width: 100%;
      .main-inner {
        margin-left: 160px;
        margin-right: 356px;
      }
    }
    &-logo {
      margin-left: -100%;
      float: left;
      position: relative;
      height: 120px;
      width: 160px;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -31.5px;
        margin-top: -25px;
      }
    }
    &-nav {
      padding-left: 27.3%;
      &-list {
        width: 100%;
        height: 120px;
        li {
          float: left;
          height: 120px;
          text-align: center;
          line-height: 120px;
          font-size: 16px;
          a {
            display: inline-block;
            padding: 0 10px;
            color: #fff;
          }
          &:nth-child(1) {
            width: 19.5%;
          }
          &:nth-child(2) {
            width: 19.0%;
          }
          &:nth-child(3) {
            width: 21.4%;
          }
          &:nth-child(4) {
            width: 24.9%;
          }
          &:nth-child(5) {
            width: 14.9%;
          }
        }
      }
    }
    &-right {
      text-align: right;
      margin-left: -356px;
      float: left;
      width: 356px;
    }
  }
</style>
