<template>
  <!--获取验证码组件-->
  <div :class="{ lock: islock }" class="get-code hoverblack03" @click="gain">
    <template v-if="isloading">
      <Spin fix>
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      </Spin>
    </template>
    <template v-else>
      {{ contentText }}
    </template>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
    /*
    *isloading 是否显示loading 采用双向绑定 外界接口完毕关闭loading 开始计时
    *text 按钮的文案
    *tiemText 倒计时 时前面拼接的文案
    *content 所带的参数
    * */
    export default {
      props: {
        text: {
          type: String,
          default: '获取验证码'
        },
        content: {
          type: String,
          default: ''
        },
        type: {
          type: String,
          default: ''
        }
      },
      data() {
        return {
          isloading: false,
          islock: false, // 是否禁止用户点击
          timer: null, // 计时器
          num: 60,
          contentText: ''
        }
      },
      created() {
        this.contentText = this.text;
      },
      methods: {
        ...mapActions(['changemailCode', 'changephoneCode']),
        gain() {
          // 如果锁住了禁止操作
          if (this.islock) {
            return;
          }
          if (this.type === 'email') {
            if (!this.content) {
              this.$Message.warning(this.$t('lang.common.email'));
              return;
            }
            // 点击下去加载loading
            this.isloading = true;
            this.islock = true;
            //  获取邮箱验证码的接口
            this.changemailCodeApi({ email: this.content });
          } else if (this.type === 'phone') {
            if (!this.content) {
              this.$Message.warning(this.$t('lang.common.phoneero'));
              return;
            }
            // 点击下去加载loading
            this.isloading = true;
            this.islock = true;
            //  获取手机验证码的接口
            this.changephoneCodeApi({ mobile: this.content });
          }
        },
        changemailCodeApi(obj) {
          this.changemailCode(obj).then((res) => {
            if (res.code === 200) {
              let data = res.data;
              // 消息回来
              this.mssageAccept();
              this.$Message.success(res.msg);
            } else if (res.code === 400) {
              this.islock = false;
              this.isloading = false;
              this.$Message.warning(res.msg);
            } else if (res.code === -1) {
              this.$Message.warning(res.msg);
            } else if (res.code === -2) {
              this.$Message.warning(res.msg);
            }
          })
        },
        changephoneCodeApi(obj) {
          this.changephoneCode(obj).then((res) => {
            if (res.code === 200) {
              let data = res.data;
              // 消息回来
              this.mssageAccept();
              this.$Message.success(res.msg);
            } else if (res.code === 400) {
              this.islock = false;
              this.isloading = false;
              this.$Message.warning(res.msg);
            } else if (res.code === -1) {
              this.$Message.warning(res.msg);
            } else if (res.code === -2) {
              this.$Message.warning(res.msg);
            }
          })
        },
        mssageAccept() {
          //  验证码回来的事件
          // 清除loading
          this.isloading = false;
          this.contentText = '60s';
          // 开始倒计时
          clearInterval(this.timer);
          this.timer = setInterval(() => {
            this.num = this.num - 1;
            if (this.num === 0) {
              clearInterval(this.timer);
              this.num = 60;
              this.contentText = this.text;
              this.islock = false;
              return;
            }
            this.contentText = this.num + 's';
          }, 1000)
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
  .get-code {
    .ivu-spin-fix {
      background: transparent;
      .ivu-icon {
        color: #dd7116 !important;
      }
    }
    cursor: pointer;
    width: 70px;
    height: 32px;
    background: #dd7116;
    line-height: 32px;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
    &.lock {
      background: #dcdcdc;
      color: #dd7116;
    }
  }
</style>
