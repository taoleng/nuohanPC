<template>
  <div class="replenish">
    <div class="replenish-content">
      <div class="replenish-content-header">
        <div class="personal-top-picture">
          <div :style="{ 'background-image': 'url(' + userInfo.avatar + ')' }">
            <avatar-upload @on-change="uploadFile"></avatar-upload>
            <span>{{ $t('lang.user.replenish.changehead') }}</span>
          </div>
          <p>{{ userInfo.nickname }}</p>
        </div>
      </div>
      <div class="nuohan-container">
        <div class="replenish-content-from user-and-password informationconmmon">
          <h3>{{ $t('lang.user.replenish.title') }}</h3>
          <ul>
            <li class="user-list name">
              <div class="userlist-title">
                <span class="user-list-left">{{ $t('lang.common.name') }}<i>{{ $t('lang.user.index.must') }}</i></span>
              </div>
              <div class="userlist-submit">
                <input v-model="from.nickname" :placeholder="$t('lang.placeholder.name')" type="text">
                <ul class="userlist-submit-btn">
                  <li :class="{ checked: from.call === 1 }" @click="from.call = 1">{{ $t('lang.user.replenish.call')[1] }}</li>
                  <li :class="{ checked: from.call === 2 }" @click="from.call = 2">{{ $t('lang.user.replenish.call')[2] }}</li>
                  <li :class="{ checked: from.call === 3 }" @click="from.call = 3">{{ $t('lang.user.replenish.call')[3] }}</li>
                  <li :class="{ checked: from.call === 4 }" @click="from.call = 4">{{ $t('lang.user.replenish.call')[4] }}</li>
                </ul>
              </div>
            </li>
            <li class="user-list">
              <div class="userlist-title">
                <span class="user-list-left">{{ $t('lang.user.index.member') }}</span>
              </div>
              <div class="userlist-submit">
                <span>
                  {{ userInfo.vip_level }}
                </span>
              </div>
            </li>
            <li class="user-list">
              <div class="userlist-title">
                <span class="user-list-left">{{ $t('lang.user.index.email') }}</span>
              </div>
              <div class="userlist-submit">
                <span>
                  {{ userInfo.email }}
                </span>
              </div>
            </li>
            <li class="user-list">
              <div class="userlist-title">
                <span class="user-list-left">{{ $t('lang.user.index.phone') }}</span>
              </div>
              <div class="userlist-submit">
                <template v-if="userInfo.mobile">
                  <span>
                    {{ userInfo.mobile }}
                  </span>
                </template>
                <template v-else>
                  <ul class="userlist-submit-btn">
                    <li @click="setPhone">{{ $t('lang.user.replenish.setPhone') }}</li>
                  </ul>
                </template>
              </div>
            </li>
            <li class="user-list">
              <div class="userlist-title">
                <span class="user-list-left">{{ $t('lang.user.index.nationality') }}<i>{{ $t('lang.user.index.must') }}</i></span>
              </div>
              <div class="userlist-submit">
                <input v-model="from.country" :placeholder="$t('lang.placeholder.nationality')" type="text">
              </div>
            </li>
            <li class="user-list">
              <div class="userlist-title">
                <span class="user-list-left">{{ $t('lang.user.index.sex') }}</span>
              </div>
              <div class="userlist-submit">
                <ul class="userlist-submit-btn">
                  <li :class="{ checked: from.sex === 1 }" @click="from.sex = 1">{{ $t('lang.user.index.man') }}</li>
                  <li :class="{ checked: from.sex === 2 }" @click="from.sex = 2">{{ $t('lang.user.index.woman') }}</li>
                  <li :class="{ checked: from.sex === 3 }" @click="from.sex = 3">{{ $t('lang.user.replenish.nonDisclosure') }}</li>
                </ul>
              </div>
            </li>
            <li class="user-list">
              <div class="userlist-title">
                <span class="user-list-left">{{ $t('lang.user.index.weixin') }}</span>
              </div>
              <div class="userlist-submit">
                <input v-model="from.weixin" :placeholder="$t('lang.placeholder.weixin')" type="text">
              </div>
            </li>
            <li class="user-list">
              <div class="userlist-title">
                <span class="user-list-left">{{ $t('lang.user.index.skype') }}</span>
              </div>
              <div class="userlist-submit">
                <input v-model="from.skype" :placeholder="$t('lang.placeholder.skype')" type="text">
              </div>
            </li>
          </ul>
        </div>
        <div class="replenish-content-submit">
          <div class="replenish-content-submit-btn" @click="submit">
            <btn-right :text="$t('lang.btn.submit')"/>
          </div>
        </div>
      </div>
    </div>
    <model1
      :type="1"
      :title="$t('lang.user.replenish.setPhone2')"
      v-model="isShowModel"
      :yanzheng="model"
    />
  </div>
</template>

<script>
  import model1 from '~/components/common/pop/model1';
  import btnRight from '~/components/common/button/btn-right';
  import avatarUpload from '~/components/common/upload/avatarUpload';
  import {mapState, mapActions, mapMutations} from 'vuex'

  export default {
    layout: 'layouts4',
    components: {
      avatarUpload,
      btnRight,
      model1
    },
    data() {
      return {
        isShowModel: false,
        model: {
          input1: this.$t('lang.placeholder.phone'),
          input2: this.$t('lang.placeholder.yanzheng'),
          input3: this.$t('lang.placeholder.password'),
          title: this.$t('lang.placeholder.phone'),
          value: 'phone',
          type: 1
        },
        from: {
          nickname: '', // 姓名
          call: '', // 称呼
          country : '', // 国籍
          sex: '', // 性别
          weixin : '', //微信号
          skype: '', //skype账号
        },
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created() {

    },
    head () {
      return {
        title: '完善资料'
      }
    },
    methods: {
      ...mapActions(['userComplete', 'uploadAvatar']),
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
      },
      submit() {
        if (!this.from.nickname) {
          this.$Message.warning(this.$t('lang.user.replenish.mustName'));
          return;
        }
        if (!this.from.country) {
          this.$Message.warning(this.$t('lang.user.replenish.contry'));
          return;
        }
        this.userCompleteApi(this.from);
      },
      setPhone() {
        this.isShowModel = true;
      },
      userCompleteApi(obj) {
        this.userComplete(obj).then((res) => {
           if (res.code === 200) {
             let data = res.data;
             this.$router.push({path:'/user'})
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
  .replenish {
    padding-top: 120px;
    &-content {
      min-height: 500px;
      background: #f6f6f6;
      &-header {
        position: relative;
        height: 305px;
        .personal-top-picture {
          top: 82px;
        }
      }
      &-from {
        background: #ffffff;
        border: 1px solid #e5e5e5;
        padding: 0px 70px;
        padding-bottom: 40px;
        .user-list {
          padding-left: 0px;
          .userlist-title {
            width: 220px;
            .user-list-left {
              height: 30px;
              line-height: 30px;
            }
          }
          .userlist-submit {
            width: 615px;
            input {
              border-color: transparent;
              &:focus {
                border: 1px solid #dd7116;
              }
            }
            span {
              height: 30px;
              line-height: 30px;
            }
          }
        }
        .name {
          height: 130px;
          .userlist-submit-btn {
            margin-top: 20px;
          }
        }
      }
      &-submit {
        padding-top: 55px;
        padding-bottom: 80px;
        &-btn {
          display: block;
          width: 266px;
          margin: 0 auto;
        }
      }
    }
  }
</style>
