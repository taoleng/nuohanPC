<template>
  <div class="language">
    <div class="language-selected" @click="changeIsShow">
      <span>{{ (this.$i18n.locale === 'cn') ? '中文' : 'English' }}</span>
      <i :class="{ deg90: !isShow, 'iconfont': true, 'icon-tubiaozhizuo-': true }"></i>
    </div>
    <span v-show="isShow" class="language-select" @click="changeLanguage">{{ (this.$i18n.locale === 'cn') ? 'English' : '中文' }}</span>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    data() {
      return {
        isShow: false
      }
    },
    mounted() {
    },
    methods: {
      ...mapMutations(['setLoalLang', 'SET_LANG', 'REMOVE_LANG']),
      changeIsShow() {
        this.isShow = !this.isShow;
      },
      changeLanguage() {
        this.isShow = !this.isShow;
        if (this.$i18n.locale === 'cn') {
          this.$i18n.locale = 'en';
          this.SET_LANG('en');
          location.reload()
        } else if (this.$i18n.locale === 'en') {
          this.$i18n.locale = 'cn';
          this.SET_LANG('cn');
          location.reload()
        } else {
          this.$i18n.locale = 'cn';
        }
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .language {
    cursor: pointer;
    color: #ffffff;
    font-size: 0px;
    position: relative;
    &-selected {
      span {
        display: inline-block;
        width: 55px;
        text-align: center;
        font-size: 16px;
        margin-right: 5px;
        line-height: 30px;
      }
    }
    &-select {
      height: 30px;
      display: inline-block;
      width: 55px;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      transition: all 0.2s linear 0s;
      position: absolute;
      border-top: 1px solid #ccc;
      bottom: -35px;
      left: 0px;
      &:hover {
        color: #dd7116;
      }
    }
    i {
      display: inline-block;
      transition: transform 0.2s linear 0s;
      transform: rotate(0deg);
    }
    .deg90 {
      display: inline-block;
      transform: rotate(-90deg);
    }
  }
</style>
