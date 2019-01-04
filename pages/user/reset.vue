<template>
  <div class="loginhome">
    <div class="nuohan-container">
      <div class="setpwFrom">
        <h2>{{ $t('lang.user.reset.setPass') }}</h2>
        <div class="logininputForm">
          <Form ref="setpasswordInline" :model="setpasswordInline" :rules="setpwrules">
            <FormItem prop="password">
              <Input v-model="setpasswordInline.password" :placeholder="$t('lang.placeholder.setNewPass')" type="password"/>
              <i class="iconfont icon-mima"></i>
            </FormItem>
            <FormItem prop="passwordagain">
              <Input v-model="passwordagain" :placeholder="$t('lang.placeholder.twosetNewPass')" type="password"/>
              <i class="iconfont icon-mima"></i>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="stpwLogin('setpasswordInline')">{{ $t('lang.btn.promptlyLogin') }}</Button>
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
    data() {
      return {
        setpasswordInline: {
          password: '',
          token: this.$route.query.tok
        },
        passwordagain: '',
        setpwrules: {
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
    computed: {
      ...mapState(['pwtoken']),
    },
    mounted() {
    },
    methods: {
      ...mapActions(['setpassword']),
      stpwLogin(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.setpasswordInline.password == this.passwordagain) {
              this.setpassword(this.setpasswordInline).then((res) => {
                if (res.code == 200) {
                  this.$Message.success(this.$t('lang.user.reset.newMsg'));
                  this.$router.push({path: '/user/login'})
                } else {
                  this.$router.push({path: '/user/forget'})
                }
              })
            } else {
              this.$Message.error(this.$t('lang.common.passTwo'));
            }
          }
        })
      }
    },
    layout:"layouts3"
  }
</script>
<style lang='less' type="text/less">
  @font-color: #fff;
  .setpwFrom {
    float: left;
    margin-bottom: 200px;
    width: 50%;
    > h2 {
      color: #fff;
      font-size: 30px;
      margin-bottom: 60px;
      margin-left: 20px;
      position: relative;
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
  }
</style>
