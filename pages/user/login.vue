<template>
  <div class="loginhome">
    <div class="nuohan-container">
      <div class="loginFrom">
        <h2 class="simsun">{{ $route.query.type === 'mobile' ? $t('lang.user.login.yanzhenglogin') : $t('lang.user.login.login') }}</h2>
        <a v-if="$route.query.type === 'mobile'" class="change-btn" href="/user/login?type=email&go=user" @click="type = 'email'">{{ $t('lang.user.login.passwordlogin') }}<i class="iconfont icon-xiangyou"></i></a>
        <a v-else class="change-btn" href="/user/login?type=mobile&go=user" @click="type = 'mobile'">{{ $t('lang.user.login.phonelogin') }} <i class="iconfont icon-xiangyou"></i></a>
        <div v-if="$route.query.type === 'mobile'" class="phoneinputForm logininputForm" @keyup.enter="loginbtn('phoneform')">
          <Form ref="phoneform" :model="phoneform" :rules="phonerules">
            <FormItem prop="mobile">
              <div class="phoneFrom-phone">
                <Input v-model="phoneform.mobile" :placeholder="$t('lang.placeholder.importphone')" type="text"/>
                <span class="span">0086</span><i class="line"></i>
              </div>
            </FormItem>
            <FormItem prop="code">
              <Input v-model="phoneform.code" :placeholder="$t('lang.placeholder.importyzm')" type="text"/>
              <div class="phoneinputForm-yzm">
                <template v-if="isLoading">
                  <Spin fix>
                    <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
                  </Spin>
                </template>
                <template v-else>
                  <div class="phoneinputForm-yzm-content" type="primary" @click="getCode('phoneform')">{{
                    phonemessage
                    }}
                  </div>
                </template>
              </div>
            </FormItem>
            <FormItem>
              <span class="loginbtn" type="primary" @click="loginbtn('phoneform')">{{ $t('lang.btn.login') }}</span>
            </FormItem>
          </Form>
        </div>
        <div v-else class="logininputForm" @keyup.enter="loginbtn('formInline')">
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="username">
              <Input v-model="formInline.username" :placeholder="$t('lang.placeholder.importemail')" type="text"/>
              <i class="iconfont icon-wode"></i>
            </FormItem>
            <FormItem prop="password">
              <p class="loginFrom-phonelogintext wangjimima">
                <router-link to="/user/forget?go=user">{{ $t('lang.user.login.forgetpass') }}</router-link>
              </p>
              <Input v-model="formInline.password" :placeholder="$t('lang.placeholder.importpass')" type="password"/>
              <i class="iconfont icon-mima"></i>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="loginbtn('formInline')">{{ $t('lang.btn.login') }}</Button>
            </FormItem>
            <FormItem>
              <router-link to="/user/register">
                <Button type="primary" class="logininputForm-bottom2">{{ $t('lang.btn.register') }}</Button>
              </router-link>
            </FormItem>
          </Form>
        </div>
      </div>
      <login-right></login-right>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  import loginRight from '~/components/user/loginRight'

  export default {
    components: {
      loginRight
    },
    head () {
      return {
        title: '诺汉咨询-登陆'
      }
    },
    data() {
      return {
        type: 'email',
        formInline: {
          type: 1,
          username: '',
          password: ''
        },
        state: true,
        ruleInline: {
          username: [
            {required: true, message:this.$t('lang.common.noneName'), trigger: 'blur'},
          ],
          password: [
            {required: true, message:this.$t('lang.common.passMsg'), trigger: 'blur'},
          ]
        },
        isLock: false,
        isLoading: false,
        phoneform: {
          type: 2,
          mobile: '',
          code: '',
        },
        phonemessage: this.$t('lang.btn.gainyzm'),
        totaltime: 60,
        phonerules: {
          mobile: [
            {required: true, message:this.$t('lang.common.phoneero'), trigger: 'blur'},
//            { type: 'string',pattern:/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/, message:'请输入正确的手机号格式', trigger:'blur'},
          ]
        }
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    computed: {
      ...mapState(['webToken'])
    },
    mounted() {
    },
    methods: {
      ...mapActions(['login', 'personinfo', 'phone']),
      ...mapMutations(['SET_TOKEN', 'setUserInfo', 'SET_WEB_TOKEN', 'GET_WEB_TOKEN']),
      getCode(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.isLock) {
              return;
            }
            this.isLock = true;
            this.isLoading = true;
            this.phone({mobile: this.phoneform.mobile}).then((res) => {
              if (res.code == 200) {
                var _this = this;
                clearInterval(clock);
                this.isLoading = false;
                let clock = setInterval(() => {
                  this.totaltime--;
                  if (this.totaltime === 0) {
                    clearInterval(clock);
                    _this.isLock = false;
                    this.totaltime = 60;
                    this.phonemessage = this.$t('lang.btn.resend');
                    return;
                  }
                  this.phonemessage = this.totaltime + 's';
                }, 1000);
                this.$Message.success(this.$t('lang.common.fasong'))
              } else {
                this.$Message.error(res.msg);
              }
            })
          }
        })
      },
      loginbtn(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let params = this.$route.query.type === 'mobile' ? this.phoneform : this.formInline;
            this.login(params).then((res) => {
              if (res.code == 200) {
                this.SET_TOKEN(res.data);
                this.$Message.success(res.msg);
                this.personinfo().then((res2) => {
                  if (res2.code === 200) {
                    // 有登录状态
                    var userInfo = res2.data || {};
                    if (this.$route.query.go) {
                      this.setUserInfo(userInfo)
                      this.$router.push({path: '/user'});
                    } else {
                      this.setUserInfo(userInfo)
                      this.$router.go(-1)
                    }
                  }
                })
              } else {
                this.$Message.error(res.msg);
              }
            })
          } else {
            this.$Message.error(this.$t('lang.user.forget.emailFormat'));
          }
        })
      }
    },
    layout: "layouts3"
  }


</script>
<style lang='less' type="text/less">
  @font-color: #fff;
  .loginFrom {
    position: relative;
    float: left;
    margin-bottom: 200px;
    width: 464px;
    > h2 {
      top: 13px;
      color: #fff;
      font-size: 30px;
      margin-bottom: 60px;
      margin-left: 20px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: -20px;
        top: 10px;
        display: block;
        width: 2px;
        height: 27px;
        background: #ffffff;
      }
    }
    .change-btn {
      position: absolute;
      top: 66px;
      right: 0;
      color: #fff;
      i {
        font-size: 10px;
      }
    }
    .phoneinputForm {
      .ivu-form-item-content {
        .ivu-input {
          width: 464px;
          background-color: rgba(0, 0, 0, 0.4);
          border: 0;
          color: @font-color;
          box-shadow: none !important;
          height: 65px;
          line-height: 65px;
          border-radius: 5px;
          outline: none !important;
          padding-left: 40px;
          input::-webkit-input-placeholder {
            color: ragb(255, 255, 255, 0.4);
            font-size: 14px;
          }
        }
        .ivu-btn {
          position: absolute;
          background-color: transparent;
          border: 0;
          left: 376px;
          top: -71px;
          outline: none;
          box-shadow: none !important;
        }

      }
      .phoneFrom-phone {
        position: relative;
        .span {
          position: absolute;
          left: 38px;
          top: 18px;
          font-size: 18px;
          color: #ffffff;
        }
        .line {
          display: inline-block;
          position: absolute;
          left: 109px;
          bottom: 19px;
          width: 1px;
          height: 25px;
          background: rgba(255, 255, 255, 0.45);
        }
        .ivu-input {
          padding-left: 140px !important;
        }
      }
      .loginbtn {
        outline: none;
        background-color: #dd7116;
        display: block;
        color: @font-color;
        width: 462px;
        height: 50px;
        line-height: 50px;
        border-radius: 10px;
        text-align: center;
        margin-top: 50px;
      }
      &-yzm {
        position: absolute;
        right: 2px;
        bottom: 0px;
        width: 90px;
        height: 64px;
        .ivu-spin-fix {
          background: transparent;
        }
        i.demo-spin-icon-load {
          color: #999999 !important;
        }
        .demo-spin-icon-load {
          animation: ani-demo-spin 1s linear infinite;
        }
        @keyframes ani-demo-spin {
          from {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        &-content {
          cursor: pointer;
          width: 100%;
          color: #fff;
          line-height: 64px;
          text-align: center;
        }
      }
    }
    /*手机验证码登陆*/
    .loginFrom-phonelogintext {
      position: absolute;
      right: 0px;
      top: -42px;
      a {
        color: #ffffff;
      }
      &.wangjimima {
        right: 0px;
        top: 76px;
      }
    }
  }
</style>

