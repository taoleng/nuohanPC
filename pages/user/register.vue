<template>
  <div class="loginhome">
    <div class="nuohan-container">
      <div class="regFrom">
        <div class="regFrom-title">
          <h2 :class="{'regFrom-title-checked':rgspClass}" class="fsh2 simsun" @click="psRegister">{{ $t('lang.user.register.user') }}</h2>
          <template v-if="false">
            <p class="regFrom-line"></p>
            <h2 :class="{'regFrom-title-checked':rgseClass}" class="simsun" @click="epRegister">{{ $t('lang.user.register.enterprise') }}</h2>
          </template>
        </div>
        <div class="reginputForm logininputForm">
          <Form ref="form" :model="form" :rules="rules">
            <FormItem prop="email">
              <Input v-model="form.email" :placeholder="$t('lang.placeholder.email')" type="text"/>
              <i class="iconfont icon-youxiang"></i>
              <p>{{ $t('lang.common.agreement') }} <a href="/protocol?type=1" target="_blank">《{{ titile1 }}》</a><a href="/protocol?type=2" target="_blank">《{{ titile2 }}》</a></p>
            </FormItem>
            <FormItem>
              <Button type="primary" class="reginputForm-zhuce" @click="registerBtn('form')">{{ $t('lang.btn.register') }}</Button>
            </FormItem>
          </Form>
        </div>
        <p class="regFrom-yiyou">
          <router-link to="/user/login">{{ $t('lang.user.register.usered') }}</router-link>
        </p>
        <model1 :icon-type="'gou'" :text="$t('lang.user.register.registerurl')" v-model="isShowPop" :title="$t('lang.common.fasong')"
                :is-show-icon="true"/>
      </div>
      <login-right></login-right>
    </div>
  </div>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  import model1 from '~/components/common/pop/model1';
  import loginRight from '~/components/user/loginRight'

  export default {
    components: {
      model1, loginRight
    },
    head () {
      return {
        title: '诺汉咨询-注册'
      }
    },
    data() {
      return {
        isShowPop: false,
        form: {
          email: '',
          type: 1
        },
        rgspClass: true,
        rgseClass: false,
        rules: {
          user: [
            {required: true, message:this.$t('lang.common.email'), trigger: 'blur'},
            {
              type: 'string',
              pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$ /,
              message:this.$t('lang.common.emailMsg'),
              trigger: 'blur'
            },
          ],
        },
        titile1: '',
        titile2: ''
      }
    },
    head() {
      return {
        title: this.$t('lang.title.PersonalCenter')
      }
    },
    created() {
      //  请求协议
      this.registerProtocols().then((res) => {
         if (res.code === 200) {
           let data = res.data;
           this.titile1 = data[0].title;
           this.titile2 = data[1].title;
         } else if (res.code === 400) {
           this.$Message.warning(res.msg);
         } else if (res.code === -1) {
           this.$Message.warning(res.msg);
         } else if (res.code === -2) {
           this.$Message.warning(res.msg);
         }
      })
    },
    methods: {
      ...mapActions(['register', 'registerProtocols']),
      psRegister() {
        this.form.type = 1
        this.rgseClass = false;
        this.rgspClass = true;
      },
      epRegister() {
        this.form.type = 2;
        this.rgseClass = true;
        this.rgspClass = false;
      },
      registerBtn(name) {
        this.$refs[name].validate((valid) => {
          if (!this.form.email) {
            this.$Message.error(this.$t('lang.common.email'));
            return;
          }
          if (valid) {
            this.register(this.form).then((res) => {
              if (res.code === 200) {
                this.isShowPop = true;
              } else if (res.code === 400) {
                this.$Message.error(res.msg);
              }
            })
          } else {
            this.$Message.error(this.$t('lang.common.emailMsg'));
          }
        })
      },
    },
    layout: "layouts3"
  }
</script>
<style lang='less' type="text/less">
  @font-color: #fff;
  .regFrom {
    float: left;
    position: relative;
    top: 18px;
    margin-bottom: 200px;
    width: 50%;
    &-title {
      overflow: hidden;
      line-height: 1;
      margin-bottom: 75px;
      .fsh2 {
        font-size: 30px;
        display: inline-block;
        cursor: pointer;
        position: relative;
      }
      .regFrom-line {
        float: left;
        display: block;
        width: 2px;
        height: 27px;
        background: #ffffff;
        margin-left: 18px;
        margin-right: 18px;
      }
      h2 {
        color: rgba(255, 255, 255, 0.5);
        font-weight: normal;
        float: left;
        font-size: 30px;
        display: inline-block;
        cursor: pointer;
      }
      .regFrom-title-checked {
        font-weight: 700;
        color: #ffffff;
      }
    }
    .reginputForm {
      p {
        font-size: 14px;
        color: #ffffff;
        margin: 20px 0;
        a {
          color: #dd7116;
        }
      }
      &-zhuce {
        margin-top: 30px;
      }
    }
    p.regFrom-yiyou {
      margin-top: 25px;
    }
    p > a {
      color: @font-color;
    }
  }
</style>
