<template>
  <div class="loginhome">
    <div class="nuohan-container">
      <div class="passwordFrom">
        <h2>{{ $t('lang.user.forget.findpassword') }}</h2>
        <div class="logininputForm">
          <Form ref="passwordForm" :model="passwordForm" :rules="passwordrules">
            <FormItem prop="email">
              <Input v-model="passwordForm.email" :placeholder="$t('lang.placeholder.email')" type="email"/>
              <i class="iconfont icon-youxiang"></i>
            </FormItem>
            <FormItem class="passwordFrom-input2">
              <Input v-model="passwordForm.code" :placeholder="$t('lang.placeholder.importyzm')" type="text"/>
              <!--<div class="yanzhengma" @click="getpassCode('passwordForm')">获取验证码</div>-->
              <div class="logininputForm-yzm">
                <template v-if="isLoading">
                  <Spin fix>
                    <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
                  </Spin>
                </template>
                <template v-else>
                  <div class="phoneinputForm-yzm-content" type="primary" @click="getpassCode('passwordForm')">{{ phonemessage }}</div>
                </template>
              </div>
            </FormItem>
            <FormItem>
              <Button class="spanbtn" @click="passwordLogin()">{{ $t('lang.user.login.login') }}</Button>
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
  import loginRight from '~/components/user/loginRight';

  export default {
    components: {
      loginRight
    },
    head () {
      return {
        title: '诺汉咨询-找回密码'
      }
    },
    data(){
      return{
        isLoading: false,
        isLock: false,
        totaltime: 60,
        phonemessage:this.$t('lang.btn.gainyzm'),
        passwordForm:{
          email:'',
          code:''
        } ,
        passwordrules:{
          email:[
            {required: true, message: this.$t('lang.common.email'), trigger: 'blur' },
            { type: 'string',pattern:/^[\w.-]+@([0-9a-zA-Z\w-]+\.)+[0-9a-zA-Z]{2,8}$/, message:this.$t('lang.common.emailMsg'), trigger:'blur'},
          ]
        }
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    methods:{
      ...mapActions([ 'passwordEmail' ]),
      ...mapActions([ 'findpassword' ]),
      ...mapMutations(['getpwtoken']),
      getpassCode(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.isLock) {
              return;
            }
            this.isLock = true;
            this.isLoading = true;
            this.passwordEmail({email:this.passwordForm.email}).then((res)=>{
              if(res.code == 200) {
                var _this = this;
                clearInterval(clock);
                this.isLoading = false;
                let clock = setInterval(() => {
                  this.totaltime-- ;
                  if (this.totaltime === 0) {
                    clearInterval(clock);
                    _this.isLock = false;
                    this.totaltime = 60;
                    this.phonemessage = this.$t('lang.btn.resend');
                    return;
                  }
                  this.phonemessage = this.totaltime + 's';
                },1000);
                this.$Message.success(this.$t('lang.user.forget.yzmSendEmail'))
              }else{
                this.isLoading = false;
                this.$Message.error(res.msg);
              }
            })
          }else{
            this.$Message.error(this.$t('lang.common.emailMsg'));
          }
        })
      } ,
      passwordLogin(){
        this.findpassword(this.passwordForm).then((res)=>{
          if(res.code == 200) {
            this.$router.push('/user/reset?tok=' + res.data);
          }
        })
      }
    },

    layout:"layouts3"

  }
</script>
<style lang='less' type="text/less">
  @font-color:#fff;
  .passwordFrom {
    .passwordFrom-input2 {
      .ivu-input {
        padding-left: 40px;
      }
    }
    float: left;
    margin-bottom: 200px;
    width: 50%;
    > h2 {
      color: @font-color;
      font-size: 30px;
      font-family: NotoSansHans;
      margin-bottom: 60px;
      margin-left: 20px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left:-20px;
        top: 12px;
        display: block;
        width: 2px;
        height: 27px;
        background: #ffffff;
      }
    }
    .logininputForm-yzm {
      right: 0;
      .phoneinputForm-yzm-content {
        width: 90px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
</style>

