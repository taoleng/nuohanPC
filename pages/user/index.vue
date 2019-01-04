<template>
  <div class="personal">
    <div class="nuohan-container">
      <user-head></user-head>
      <div class="personal-content">
        <user-menu></user-menu>
        <div class="personal-content-right">
          <div class="user-and-password informationconmmon">
            <h3>{{ $t('lang.user.index.basic') }}</h3>
            <ul class="user-and-password-content">
              <li class="user-list">
                <div class="userlist-title">
                  <span class="user-list-left">{{ $t('lang.user.index.name') }}<i>{{ $t('lang.user.index.must') }}</i></span>
                </div>
                <div class="userlist-submit">
                  <input v-if="amendData.nickname.state" v-model="input.nickname" :placeholder="$t('lang.placeholder.name')" type="text">
                  <span v-else>{{ userInfo.nickname + callType[userInfo.call] }}</span>
                </div>
                <div class="userlist-btn">
                  <div v-if="amendData.nickname.state" class="queding">
                    <b @click="submit('nickname')">{{ $t('lang.btn.ok') }}</b>
                    <b @click="off('nickname')">{{ $t('lang.btn.off') }}</b>
                  </div>
                  <span v-else @click="amend('nickname', 1)">{{ $t('lang.btn.change') }}</span>
                </div>
              </li>
              <li class="user-list">
                <div class="userlist-title">
                  <span class="user-list-left">{{ $t('lang.user.index.member') }}</span>
                </div>
                <div class="userlist-submit">
                  <span>{{ userInfo.vip_level }}</span>
                </div>
                <div class="userlist-btn">
                  <a href="/clients">
                    <span>{{ $t('lang.user.index.upgrade') }}</span>
                  </a>
                </div>
              </li>
              <li class="user-list">
                <div class="userlist-title">
                  <span class="user-list-left">{{ $t('lang.user.index.email') }}<i>{{ $t('lang.user.index.must') }}</i></span>
                </div>
                <div class="userlist-submit">
                  <span>{{ userInfo.email }}</span>
                </div>
                <div class="userlist-btn">
                  <span @click="amend('email')">{{ $t('lang.btn.change') }}</span>
                </div>
              </li>
              <li class="user-list">
                <div class="userlist-title">
                  <span class="user-list-left">{{ $t('lang.user.index.iphone') }}</span>
                </div>
                <div class="userlist-submit">
                  <span>{{ userInfo.mobile }}</span>
                </div>
                <div class="userlist-btn">
                  <span @click="amend('phone')">{{ $t('lang.btn.change') }}</span>
                </div>
              </li>
              <li class="user-list">
                <div class="userlist-title">
                  <span class="user-list-left">{{ $t('lang.user.index.nationality') }} <i>{{ $t('lang.user.index.must') }}</i></span>
                </div>
                <div class="userlist-submit">
                  <input v-if="amendData.country.state" v-model="input.country" :placeholder="$t('lang.placeholder.nationality')" type="text">
                  <span v-else>{{ userInfo.country }}</span>
                </div>
                <div class="userlist-btn">
                  <div v-if="amendData.country.state" class="queding">
                    <b @click="submit('country', 1)">{{ $t('lang.btn.ok') }}</b>
                    <b @click="off('country', 1)">{{ $t('lang.btn.off') }}</b>
                  </div>
                  <span v-else @click="amend('country')">{{ $t('lang.btn.change') }}</span>
                </div>
              </li>
              <li class="user-list">
                <div class="userlist-title">
                  <span class="user-list-left">{{ $t('lang.user.index.password') }}<i>{{ $t('lang.user.index.must') }}</i></span>
                </div>
                <div class="userlist-submit">
                  <span>******</span>
                </div>
                <div class="userlist-btn">
                  <span @click="amend('password')">{{ $t('lang.btn.change') }}</span>
                </div>
              </li>
              <li class="user-list">
                <div class="userlist-title">
                  <span class="user-list-left">{{ $t('lang.user.index.sex') }}</span>
                </div>
                <div class="userlist-submit">
                  <template v-if="amendData.sex.state">
                    <div class="danxuan">
                      <RadioGroup v-model="input.sex">
                        <Radio label="1">
                          <span>{{ $t('lang.user.index.man') }}</span>
                        </Radio>
                        <Radio label="2">
                          <span>{{ $t('lang.user.index.woman') }}</span>
                        </Radio>
                      </RadioGroup>
                    </div>
                  </template>
                  <!--<input v-if="amendData.sex.state" v-model="input.sex" type="text" placeholder="请填写您的姓名">-->
                  <span v-else>{{ userInfo.sex || $t('lang.user.index.nowrite') }}</span>
                </div>
                <div class="userlist-btn">
                  <div v-if="amendData.sex.state" class="queding">
                    <div v-if="amendData.sex.state" class="queding">
                      <b @click="submit('sex')">{{ $t('lang.btn.ok') }}</b>
                      <b @click="off('sex')">{{ $t('lang.btn.off') }}</b>
                    </div>
                  </div>
                  <span v-else @click="amend('sex')">{{ $t('lang.btn.change') }}</span>
                </div>
              </li>
              <li class="user-list">
                <div class="userlist-title">
                  <span class="user-list-left">{{ $t('lang.user.index.weixin') }}</span>
                </div>
                <div class="userlist-submit">
                  <input v-if="amendData.weixin.state" v-model="input.weixin" :placeholder="$t('lang.placeholder.weixin')" type="text">
                  <span v-else>{{ userInfo.weixin }}</span>
                </div>
                <div class="userlist-btn">
                  <div v-if="amendData.weixin.state" class="queding">
                    <b @click="submit('weixin')">{{ $t('lang.btn.ok') }}</b>
                    <b @click="off('weixin')">{{ $t('lang.btn.off') }}</b>
                  </div>
                  <span v-else @click="amend('weixin')">{{ $t('lang.btn.change') }}</span>
                </div>
              </li>
              <li class="user-list">
                <div class="userlist-title">
                  <span class="user-list-left">{{ $t('lang.user.index.skype') }}</span>
                </div>
                <div class="userlist-submit">
                  <input v-if="amendData.skype.state" v-model="input.skype" :placeholder="$t('lang.placeholder.skype')" type="text">
                  <span v-else>{{ userInfo.skype }}</span>
                </div>
                <div class="userlist-btn">
                  <div v-if="amendData.skype.state" class="queding">
                    <b @click="submit('skype')">{{ $t('lang.btn.ok') }}</b>
                    <b @click="off('skype')">{{ $t('lang.btn.off') }}</b>
                  </div>
                  <span v-else @click="amend('skype')">{{ $t('lang.btn.change') }}</span>
                </div>
              </li>
              <model1
                v-model="isShowModel"
                :type="model.type"
                :title="model.title"
                :yanzheng="model"
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  import model1 from '~/components/common/pop/model1';
  import userHead from '~/components/user/userHead'
  import userMenu from '~/components/user/userMenu'
  import {_filterUserInfo} from '~/assets/js/filter';

  export default {
    layout: 'layouts2',
    components: {
      model1, userHead, userMenu
    },
    data() {
      return {
        callType: this.$t('lang.user.replenish.call'),
        amendData: {
          nickname: {
            state: 0  // 0为显示信息 1为修改
          },
          country: {
            state: 0  // 0为显示信息 1为修改
          },
          sex: {
            state: 0  // 0为显示信息 1为修改
          },
          weixin: {
            state: 0  // 0为显示信息 1为修改
          },
          skype: {
            state: 0  // 0为显示信息 1为修改
          }
        },
        input: {
          nickname: '',
          country: '',
          sex: '',
          weixin: '',
          skype: ''
        },
        mustArr: [
          'nickname',
          'email',
          'phone',
          'country',
          'password',
          'skype',
          'weixin',
          'sex'
        ], // 必填项
        isShowModel: false,
        model: {
          input1: '',
          input2: '',
          title: '',
          value: '',
          type: 1
        }
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
    watch: {},
    head () {
      return {
        title: '个人中心-会员信息'
      }
    },
    created() {
      //  获取用户信息
      this.initUserInfo();
    },
    methods: {
      ...mapMutations(['initUserInfo']),
      ...mapActions(['modinfo']),
      // 此处是吧按钮点出来
      amend(val, isBitian) {
        let self = this;
        if (val === 'email') {
          //  修改邮箱
          var model = {
            input1: this.$t('lang.placeholder.email'),
            input2: this.$t('lang.placeholder.yanzheng'),
            input3: this.$t('lang.placeholder.password'),
            title: this.$t('lang.placeholder.email'),
            value: 'email',
            type: 1
          }
          this.model = model;
          this.isShowModel = true;
        } else if (val === 'phone') {
          //  修改手机号
          var model = {
            input1: this.$t('lang.placeholder.phone'),
            input2: this.$t('lang.placeholder.yanzheng'),
            input3: this.$t('lang.placeholder.password'),
            title: this.$t('lang.placeholder.phone'),
            value: 'phone',
            type: 1
          }
          this.model = model;
          this.isShowModel = true;
        } else if (val === 'password') {
          //  修改手机号
          var model = {
            input1: this.$t('lang.placeholder.oldpassword'),
            input2: this.$t('lang.placeholder.newpassword'),
            input3: this.$t('lang.placeholder.wrn1'),
            title: this.$t('lang.placeholder.changePassword'),
            value: 'password',
            type: 2
          }
          //  修改密码
          this.model = model;
          this.isShowModel = true;
        } else {
          this.amendData[val].state = !this.amendData[val].state;
        }
      },
      // 此处是修改 此处是修改逻辑都在这里 提交请求 判断空
      submit(val) {
        if (val === 'nickname') {
          if (this.input.nickname.length > 6) {
            this.$Message.warning(this.$t('lang.user.index.lessThan'));
            return;
          }
        }
        var isBitian = false;
        this.mustArr.forEach((v) => {
          if (v === val) {
            isBitian = true;
          }
        })
        if (!this.input[val] && isBitian) {
          this.$Message.warning(this.$t('lang.user.index.mustMessage'));
          return;
        }
        // 填写完毕 请求修改
        var obj = {
          [val]: this.input[val]
        }
        this.modinfoApi(obj);
        this.amendData[val].state = !this.amendData[val].state;
      },
      off(val) {
        this.amendData[val].state = !this.amendData[val].state;
      },
      // 修改接口API
      modinfoApi(obj) {
        this.modinfo(obj).then((res) => {
          if (res.code === 200) {
            this.$Message.warning(res.msg);
            // 成功之后初始化一次
            this.init()
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      init() {
        //  请求userInfo
        this.initUserInfo();
      }
    }
  }
</script>

<style lang='less' type="text/less">
  .user-and-password {
    .danxuan-sex {
      span {
        font-size: 14px;
      }
    }
    &-content {
      li {
        > div {
          float: left;
          &.userlist-title {
            width: 220px;
            span {
              height: 30px;
              line-height: 30px;
            }
          }
          &.userlist-submit {
            width: 430px;
            min-height: 30px;
            margin-right: 48px;
            span {
              height: 30px;
              line-height: 30px;
            }
          }
          &.userlist-btn {
            .queding {
              border-color: #dd7116;
              overflow: hidden;
              width: 116px;
              /*确定的*/
              b {
                display: block;
                cursor: pointer;
                height: 30px;
                line-height: 28px;
                border: 1px solid #dcdcdc;
                text-align: center;
                width: 50px;
                font-weight: normal;
                &:first-child {
                  float: left;
                  border-color: #dd7116;
                  color: #dd7116;
                }
                /*取消的*/
                &:last-child {
                  float: right;
                  color: #999999;
                }
              }
            }
            span {
              transition: all 0.2s linear;
              cursor: pointer;
              width: 100%;
              text-align: center;
              display: inline-block;
              width: 116px;
              height: 30px;
              line-height: 28px;
              color: #999999;
              border: 1px solid #dcdcdc;
              &:hover {
                border-color: #dd7116;
                color: #dd7116;
              }
            }
          }
        }
      }
    }
  }
</style>
