<template>
  <div class="personal-top">
    <ul>
      <li>
        <div>
          <p>{{ $t('lang.user.login.fx') }}</p>
          <p>{{ $t('lang.user.login.different') }}</p>
        </div>
        <b></b>
      </li>
      <li>
        <div>
          <p>Discover</p>
          <p>a different world</p>
        </div>
        <b></b>
      </li>
    </ul>
    <div class="personal-top-picture">
      <div :style="{ 'background-image': 'url(' + userInfo.avatar + ')' }">
        <avatar-upload @on-change="uploadFile"></avatar-upload>
        <span>{{ $t('lang.user.replenish.changehead') }}</span>
      </div>
      <p>{{ userInfo.nickname }}</p>
    </div>
  </div>
</template>

<script>
  import avatarUpload from '~/components/common/upload/avatarUpload';
  import {mapState, mapActions, mapMutations} from 'vuex'

  export default {
    components: {
      avatarUpload
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapActions(['uploadAvatar']),
      ...mapMutations(['initUserInfo']),
      uploadFile(file) {
        let param = new FormData();
        param.append('file', file, 'file_' + Date.parse(new Date()) + '.jpg');
        this.uploadAvatar(param).then((res) => {
          if (res.code === 200) {
            this.initUserInfo();
            this.$Message.success(res.msg);
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

<style lang='less' type="text/less">
  .personal {
    background: url("../../assets/img/login/personalbg.jpg") top center no-repeat;
    min-height: 300px;
    .personal-top {
      height: 358px;
      padding-top: 160px;
      position: relative;
      ul {
        overflow: hidden;
        li {
          div {
            p {
              font-size: 30px;
              color: #ffffff;
              line-height: 44px;
            }
            margin-bottom: 22px;
          }
          b {
            display: inline-block;
            height: 24px;
            width: 1px;
            background: #ffffff;
          }
        }
        li:nth-child(1) {
          float: left;
          text-align: left;
        }
        li:nth-child(2) {
          float: right;
          text-align: right;
          b {
            text-align: right;
          }
        }
      }
    }
    .personal-content {
      overflow: hidden;
      padding-top: 125px;
      padding-bottom: 210px;
      &-left {
        float: left;
        ul {
          border: 1px solid #e5e5e5;
          border-bottom: none;
          li {
            cursor: pointer;
            text-align: center;
            line-height: 62px;
            color: #999999;
            width: 216px;
            height: 63px;
            border-bottom: 1px solid #e5e5e5;
            &.checked {
              border-bottom-color: #dd7116;
              background: #dd7116;
              color: #ffffff;
            }
          }
        }
      }
      &-right {
        min-height: 300px;
        float: right;
        width: 962px;
        border: 1px solid #e5e5e5;
      }
    }
  }
</style>
