<template>
  <!--预定的父路由页面-->
  <!--如果state="xiugai"此页将为修改页面-->
  <div :class="{
    'reserve-parent': true,
    'bg1' : $route.fullPath === '/book/appt/office',
    'bg2' : $route.fullPath === '/book/appt/room',
    'bg5' : $route.fullPath === '/book/appt/talks',
    'bg6' : $route.fullPath === '/book/appt/question',
    'bg7' : $route.fullPath === '/book/appt/meeting'
  }"
  :style="{
    'background-image': 'url(' + ($route.fullPath === '/book/appt/service' ? bg.srv : $route.fullPath === '/book/appt/activity' ? bg.acr : '') + ')'
  }"
  >
    <header>
      <div class="nuohan-container">
        <h3 v-if="$route.fullPath === '/book/appt/office'">{{ $t('lang.book.appt.officetext') }}</h3>
        <h3 v-if="$route.fullPath === '/book/appt/room'">{{ $t('lang.book.appt.roomtext') }}</h3>
        <h3 v-if="$route.fullPath === '/book/appt/service'">{{ $t('lang.book.appt.servicetext') }}</h3>
        <h3 v-if="$route.fullPath === '/book/appt/activity'">{{ $t('lang.book.appt.activitytext') }}</h3>
        <h3 v-if="$route.fullPath === '/book/appt/talks'">{{ $t('lang.book.appt.talkstext') }}</h3>
        <h3 v-if="$route.fullPath === '/book/appt/meeting'">{{ $t('lang.book.appt.meetingtext') }}</h3>
        <h3 v-if="$route.fullPath === '/book/appt/question'">{{ $t('lang.book.appt.questiontext') }}</h3>
      </div>
    </header>
    <section class="reserve-parent-content">
      <div class="nuohan-container">
        <nuxt-child @childisShowProtocol="childisShowProtocol"/>
      </div>
    </section>
    <!--modelProtocol-->
    <model1 :title="$t('lang.model.model1.submitEr')" :text="'请阅读并同意服务条款'" v-model="modelProtocol" />
  </div>
</template>

<script>
  import model1 from '~/components/common/pop/model1';
  import { mapState, mapActions, mapMutations } from 'vuex';
  import md5 from 'md5';
  export default {
      components: {
        model1
      },
      data() {
        return {
          type: '1',
          modelProtocol: false,
          bg: {
            srv: '',
            acr: ''
          }
        }
      },
      computed: {
        ...mapState(['webToken']),
      },
      mounted() {
        if (!this.webToken) {
          this.SET_WEB_TOKEN(md5(Math.random()));
        }
      },
      created() {
        this.bookServiceApi();
        this.bookActivityApi();
      },
      methods: {
        ...mapActions(
          [
            'protocol',
            'bookSpace',
            'bookService',
            'bookActivity'
          ]),
        ...mapMutations(['SET_WEB_TOKEN']),
        childisShowProtocol(bool) {
          this.modelProtocol = bool;
        },
        bookServiceApi() {
          this.bookService().then((res) => {
             if (res.code === 200) {
               let data = res.data;
               this.bg.srv = data.banner;
             } else if (res.code === 400) {
               this.$Message.warning(res.msg);
             } else if (res.code === -1) {
               this.$Message.warning(res.msg);
             } else if (res.code === -2) {
               this.$Message.warning(res.msg);
             }
          })
        },
        bookActivityApi() {
          this.bookActivity().then((res) => {
            if (res.code === 200) {
              let data = res.data;
              this.bg.acr = data.banner;
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
      layout: 'layouts2'
    }
</script>

<style scoped lang='less' type="text/less">
  .reserve-parent {
    background: #202020 center top no-repeat;
    &.bg1 {
      background: #202020 url("../../assets/img/book/office.jpg") center top no-repeat !important;
    }
    &.bg2 {
      position: relative;
      background: #202020 url("../../assets/img/book/conference.jpg") center top no-repeat !important;
    }
    &.bg3 {
      background: #202020 url("../../assets/img/book/serve.jpg") center top no-repeat !important;
    }
    &.bg4 {
      background: #202020 url("../../assets/img/book/activebg.jpg") center top no-repeat !important;
    }
    &.bg5 {
      background: #202020 url("../../assets/img/consult/0fflineTalksbg.jpg") center top no-repeat !important;
    }
    &.bg6 {
      background: #202020 url("../../assets/img/consult/jiehuoyuyue.jpg") center top no-repeat !important;
    }
    &.bg7 {
      background: #202020 url("../../assets/img/consult/online-talks.jpg") center top no-repeat !important;
    }
  }
</style>
