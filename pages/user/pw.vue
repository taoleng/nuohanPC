<template>
  <div class="loginhome">
    <div class="nuohan-container">
      <div class="complateFrom">
        <h2>{{ $t('lang.user.pw.register') }}</h2>
        <div class="logininputForm">
          <Form ref="passwordInline" :model="passwordInline" :rules="passwordrules">
            <FormItem prop="password">
              <Input v-model="passwordInline.password" :placeholder="$t('lang.placeholder.importpass')" type="password"/>
              <i class="iconfont icon-mima"></i>
            </FormItem>
            <FormItem prop="passwordagain">
              <Input v-model="passwordagain" :placeholder="$t('lang.placeholder.twoimportpass')" type="password"/>
              <i class="iconfont icon-mima"></i>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="registerNow('passwordInline')">{{ $t('lang.btn.promptlyRegister') }}</Button>
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
        title: '诺汉咨询-完成注册'
      }
    },
    data() {
      return {
        passwordInline: {
          id: this.$route.query.id,
          password: '',
        },
        complatecans: '',
        passwordagain: '',
        dis: '',
        passwordrules: {
          password: [
            {required: true, message:this.$t('lang.common.passMsg'), trigger: 'blur'},
            {type: 'string', min: 6, message:this.$t('lang.common.pass6')}
          ]
        }
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    created() {
      this.checked({id: this.passwordInline.id}).then((res) => {
        if(res.code == 200) {
        } else {
          this.$router.push({path:'/user/login'})
          this.$Message.error(res.msg);
        }
      })
    },
    methods: {
      ...mapActions(['complete', 'checked', 'personinfo']),
      ...mapMutations(['SET_TOKEN', 'setUserInfo']),
      registerNow(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.passwordInline.password.length < 6) {
              this.$Message.error(this.$t('lang.common.pass6'));
              return;
            }
            if (this.passwordInline.password == this.passwordagain) {
              this.complete(this.passwordInline).then((res) => {
                if (res.code == 200) {
                  this.SET_TOKEN(res.data.token);
                  this.personinfo().then((res2) => {
                    if (res2.code === 200) {
                      // 有登录状态
                      var userInfo = res2.data || {};
                      this.setUserInfo(userInfo)
                      if (!userInfo.complete) {
                        this.$router.push({path: '/user/replenish'})
                      } else {
                        this.$router.push({path: '/user'})
                      }
                    }
                  })
                } else {
                  this.$Message.error(res.msg);
                }
              })
            } else {
              this.$Message.error(this.$t('lang.common.passMsgerr'));
            }
          }
        })
      }
    },

    layout: "layouts3"
  }
</script>
<style lang='less' type="text/less">
  @font-color: #fff;
  .complateFrom {
    float: left;
    margin-bottom: 200px;
    width: 50%;
    > h2 {
      color: #fff;
      font-size: 30px;
      font-family: NotoSansHans;
      margin-bottom: 60px;
      position: relative;
      margin-left: 20px;
      &::after {
        content: '';
        position: absolute;
        left: -20px;
        top: 12px;
        display: block;
        width: 2px;
        height: 27px;
        background: #ffffff;

      }
    }
    .complateinputForm {
      position: relative;
      .ivu-form-item-content {
        .ivu-input {
          width: 464px;
          background-color: rgba(0, 0, 0, 0.4);
          border: 0;
          height: 65px;
          line-height: 65px;
          padding-left: 88px;
          border-radius: 5px;
          outline: none;
          font-family: "iconfont";
          input::-webkit-input-placeholder {
            color: ragb(255, 255, 255, 0.4);
            font-size: 14px;

          }
        }
        .ivu-btn {
          outline: none;
          background-color: #dd7116;
          display: block;
          color: @font-color;
          border: 0;
          width: 462px;
          height: 50px;
          line-height: 40px;
          border-radius: 10px;
          margin-top: 50px;

        }
      }

      .icon-wode {
        color: @font-color;
        font-size: 25px;
        position: absolute;
        left: 37px;
        top: 20px;
        display: inline-block;
      }
      .icon-mima {
        color: @font-color;
        font-size: 25px;
        position: absolute;
        left: 37px;
        top: 20px;
      }

      li {
        display: inline-block;
        &:first-child {
          margin-right: 280px;
        }
        > a {
          color: #fff;
        }
      }
    }
    .logininputForm {
      .ivu-form-item-error-tip {
        color: #ffffff !important;
      }
    }
  }


</style>
