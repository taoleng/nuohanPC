<template>
  <!--此弹出框有三种形态-->
  <!--isShow 是否显示-->
  <!--text 文本主要内容-->
  <!--title 标题-->
  <!--iconType 图标类型-->
  <!--isShowIcon 是否显示头部图标-->
  <!--btnType 底部按钮的类型-->
  <!--btnText 底部按钮的文字-->
  <!--isShowHome 是否显示返回首页-->
  <!--type 开启表单状态  1 邮箱 手机 验证 2 密码状态（不显示验证码） 3 填写取消原因表单 4优惠码-->
  <div>
    <Modal
      :mask-closable="false"
      :value="isShow"
      class="model1"
    >
      <p slot="header">
        <i class="iconfont icon-quxiao" @click="ok"></i>
      </p>
      <div class="model1-content">
        <header :class="{
          'position-top50': type === 3
        }" class="model1-content-header">
          <template v-if="isShowIcon && !type">
            <template v-if="iconType === 'gantanhao'">
              <i class="iconfont icon-xianzhi"></i>
            </template>
            <template v-else-if="iconType === 'gou'">
              <i class="iconfont icon-chenggong-"></i>
            </template>
          </template>
          <span>{{ title }}</span>
        </header>
        <div class="model1-content-content">
          <template v-if="!type">
            <p>
              {{ text }}
            </p>
          </template>
          <template v-else>
            <!--4优惠码-->
            <template v-if="type === 4">
              <div class="model1-content-content-youhuima">
                <input
                  v-model="formData.youhuima"
                  :placeholder="$t('lang.placeholder.yhm')"
                  style="ime-mode:disabled"
                  type="text"
                  class="input-common"
                >
              </div>
            </template>
            <!--3 填写取消原因表单-->
            <template v-if="type === 3">
              <div class="model1-content-content-quxiao">
                <header>
                  <select-ee
                    :list="[
                      {
                        title: $t('lang.model.wu'),
                        value: $t('lang.model.wu')
                      },
                      {
                        title: $t('lang.model.lin'),
                        value: $t('lang.model.lin')
                      },
                      {
                        title: $t('lang.model.else'),
                        value: $t('lang.model.else')
                      }
                    ]"
                    v-model="quxiao.why"
                    :placeholder="$t('lang.model.cause')"></select-ee>
                </header>
                <div v-if="quxiao.why ===$t('lang.model.else')" class="model1-content-content-quxiao-content">
                  <textarea v-model="quxiao.reason" :placeholder="$t('lang.model.causetext')"></textarea>
                </div>
              </div>
            </template>
            <!--1 邮箱 手机 验证 2 密码状态（不显示验证码）-->
            <template v-else-if="type === 1 || type === 2">
              <div class="model1-content-content-input">
                <ul>
                  <li>
                    <input
                      v-model="formData.input1"
                      :placeholder="yanzheng.input1"
                      :type="(yanzheng.input1.indexOf($t('lang.user.index.password')) === -1) ? 'text' : 'password'"
                      style="ime-mode:disabled"
                      class="input-common"
                    >
                    <div v-if="type !== 2" class="model1-yanzhengma">
                      <get-code :type="yanzheng.value" :content="formData.input1"></get-code>
                    </div>
                  </li>
                  <li>
                    <input
                      v-model="formData.input2"
                      :placeholder="yanzheng.input2"
                      :type="(yanzheng.input2.indexOf($t('lang.user.index.password')) === -1) ? 'text' : 'password'"
                      style="ime-mode:disabled"
                      class="input-common"
                    >
                  </li>
                  <li>
                    <input
                      v-model="formData.input3"
                      :type="isinputpass ? 'text' : 'password'"
                      :placeholder="yanzheng.input3"
                      style="ime-mode:disabled"
                      class="input-common"
                    >
                  </li>
                </ul>
              </div>
            </template>
          </template>
        </div>
      </div>
      <div slot="footer" class="footer">
        <template v-if="!type">
          <template v-if="btnType === '3'">
            <router-link to="/user/order">
              <div class="footer-btn" @click="ok">
                {{ $t('lang.model.lookod') }}
              </div>
            </router-link>
          </template>
          <template v-else>
            <div class="footer-btn hoverblack03" @click="ok">
              <template v-if="btnType === '2'">
                <p class="footer-btn-right-line"></p>
              </template>
              {{ btnText }}
            </div>
          </template>
        </template>
        <template v-else>
          <div class="footer-btn hoverblack03" @click="submit">
            {{ $t('lang.btn.submit') }}
          </div>
        </template>
        <template v-if="isShowHome">
          <nuxt-link to="/">
            <div class="footer-gohome">
              {{ $t('lang.btn.home') }}
            </div>
          </nuxt-link>
        </template>
      </div>
    </Modal>
  </div>
</template>

<script>
  import popBtn from './pop-btn';
  import selectEe from '~/components/common/pullDown/select-ee';
  import getCode from '~/components/common/button/get-code';
  import { mapState, mapMutations, mapActions } from 'vuex';
    export default {
      components: {
        popBtn,
        getCode,
        selectEe
      },
      model:{
        prop:'isShow',//这个字段，是指父组件设置 v-model 时，将变量值传给子组件的 msg
        event:'input'//这个字段，是指父组件监听 parent-event 事件
      },
      props: {
        isAffrm: {
          type: Boolean,
          default: false
        },
        orderId: {
          type: String,
          default: ''
        },
        // 是否显示
        isShow: {
          type: Boolean,
          default: false
        },
        // model 型态 1 列如邮箱 2 列如优惠码 3 列如邮箱号
        type: {
          type: Number,
          default: 0
        },
        // 文本主要内容
        text: {
          type: String,
          default: ''
        },
        // 标题内容部分
        title: {
          type: String,
          default: ''
        },
        // 是否显示icon
        isShowIcon: {
          type: Boolean,
          default: true
        },
        // icon 类型
        iconType: {
          type: String,
          default: 'gantanhao'
        },
        // 按钮类型 1 没箭头 2 有箭头
        btnType: {
          type: String,
          default: '1'
        },
        // 按钮文字
        btnText: {
          type: String,
          default: '关闭'
        },
        // 是否显示返回首页
        isShowHome: {
          type: Boolean,
          default: false
        },
        yanzheng: {
          type: Object,
          default() {
            return {
              input1: '',
              input2: '',
              input3: '',
              title: '',
              value: ''
            }
          }
        }
      },
      data() {
        return {
          isShowg: false,
          isinputpass: true,
          formData: {
            youhuima: '',
            input1: '',
            input2: '',
            input3: ''
          },
          quxiao: {
            why: '',
            reason: '',
          }
        }
      },
      computed: {
        ...mapState(['orderData', 'payedType'])
      },
      watch: {
        'formData.input1'(val) {
          // 1 邮箱 或者 手机 2 密码
          if (this.type === 1) {
            this.formData.input1 = val.replace('/[\u4e00-\u9fa5]/g', '')
          }
        },
        'yanzheng.input3'(val) {
          this.isinputpass = this.yanzheng.input3.indexOf(this.$t('lang.user.index.password')) === -1;
        }
      },
      methods: {
        ...mapActions(
          [
            'changeEmail',
            'changemobile',
            'changepassword',
            'loginout',
            'orderCancel',
            'orderUsecoupon',
            'wechat'
          ]
        ),
        ...mapMutations(['initUserInfo', 'REMOVE_TOKEN', 'priceYouhui']),
        ok() {
          this.$emit('input', false)
          this.initInput();
        },
        submit() {
          if (this.yanzheng.value === 'email') {
            if (!this.formData.input1) {
              this.$Message.warning(this.$t('lang.common.email'));
              return;
            }
            if (!this.formData.input2) {
              this.$Message.warning(this.$t('lang.common.yzm'));
              return;
            }
            if (!this.formData.input3) {
              this.$Message.warning(this.$t('lang.common.password'));
              return;
            }
            // 提交 修改邮箱
            this.changeEmailApi({
              email: this.formData.input1,
              code: this.formData.input2,
              password: this.formData.input3
            })
          } else if (this.yanzheng.value === 'phone') {
            if (!this.formData.input1) {
              this.$Message.warning(this.$t('lang.common.phoneero'));
              return;
            }
            if (!this.formData.input2) {
              this.$Message.warning(this.$t('lang.common.yzm'));
              return;
            }
            if (!this.formData.input3) {
              this.$Message.warning(this.$t('lang.common.password'));
              return;
            }
            // 提交 修改电话
            this.changemobileApi({
              mobile: this.formData.input1,
              code: this.formData.input2,
              password: this.formData.input3
            })
          } else if (this.yanzheng.value === 'password') {
            if (!this.formData.input1) {
              this.$Message.warning(this.$t('lang.placeholder.oldpassword'));
              return;
            }
            if (!this.formData.input2) {
              this.$Message.warning(this.$t('lang.placeholder.newpassword'));
              return;
            }
            if (!this.formData.input3) {
              this.$Message.warning(this.$t('lang.placeholder.wrn1'));
              return;
            }
            if (this.formData.input2 === this.formData.input1) {
              this.$Message.warning(this.$t('lang.placeholder.wrn2'));
              return;
            }
            if (this.formData.input2 !== this.formData.input3) {
              this.$Message.warning(this.$t('lang.placeholder.wrn3'));
              return;
            }
            this.changepasswordApi({
              oldpassword: this.formData.input1,
              newpassword: this.formData.input2
            })
          } else if (this.type === 3) {
            if ( !this.quxiao.why ) {
              this.$Message.warning(this.$t('lang.model.off'));
              return;
            }
            if (this.quxiao.why === this.$t('lang.model.else') && this.quxiao.reason ) {
              var reason = this.quxiao.reason;
            } else {
              var reason = this.quxiao.why;
            }
            //  取消订单
            this.orderCancelApi(reason);
          } else if (this.type === 4) {
            if ( !this.formData.youhuima ) {
              this.$Message.warning(this.$t('lang.model.yhm'));
              return;
            }
           // 得到优惠码
            var obj = {
              order_id: this.orderData.order_id,
              code: this.formData.youhuima,
              type: 5
            }
            // 开始优惠码支付
            this.wechatApi(obj);
          }
        },
        changeEmailApi(obj) {
          this.changeEmail(obj).then((res) => {
             if (res.code === 200) {
               let data = res.data;
               this.$Message.success(res.msg);
               // 初始化 innt
               this.initUserInfo();
               this.initInput();
               this.$emit('input', false)
             } else if (res.code === 400) {
               this.$Message.warning(res.msg);
             } else if (res.code === -1) {
               this.$Message.warning(res.msg);
             } else if (res.code === -2) {
               this.$Message.warning(res.msg);
             }
          })
        },
        changemobileApi(obj) {
          this.changemobile(obj).then((res) => {
            if (res.code === 200) {
              let data = res.data;
              this.$Message.success(res.msg);
              // 初始化 innt
              this.initUserInfo();
              this.initInput();
              this.$emit('input', false)
            } else if (res.code === 400) {
              this.$Message.warning(res.msg);
            } else if (res.code === -1) {
              this.$Message.warning(res.msg);
            } else if (res.code === -2) {
              this.$Message.warning(res.msg);
            }
          })
        },
        changepasswordApi(obj) {
          this.changepassword(obj).then((res) => {
            if (res.code === 200) {
              let data = res.data;
              this.$Message.success(this.$t('lang.model.change'));
              // 初始化 innt
              this.initInput();
              this.$emit('input', false)
              this.REMOVE_TOKEN()
              this.$router.push({
                path: '/user/login'
              })
            } else if (res.code === 400) {
              this.$Message.warning(res.msg);
            } else if (res.code === -1) {
              this.$Message.warning(res.msg);
            } else if (res.code === -2) {
              this.$Message.warning(res.msg);
            }
          })
        },
        orderCancelApi(reason) {
          this.orderCancel(
              {
                order_id: this.orderId,
                reason: reason
              }
            ).then((res) => {
             if (res.code === 200) {
               let data = res.data;
               this.$emit('input', false)
               this.$emit('orderoff');
               // 取消
               if (this.$route.query.isPersonal) {
                 this.$router.push({
                   path: '/user/order',
                   query: {
                     idx: 3
                   }
                 })
               } else if (this.$route.query.type) {
                 this.$router.push({
                   path: '/book/appt/' +  this.$route.query.type
                 })
               }
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
        wechatApi(obj) {
          this.wechat(obj).then((res) => {
             if (res.code === 200) {
               let data = res.data;
               this.$emit('input', false)
               this.$router.push({
                 path: '/book/payed',
                 query: {
                   id: this.orderData.order_id,
                   type: this.payedType
                 }
               })
             } else if (res.code === 400) {
               this.$Message.warning(res.msg);
             } else if (res.code === -1) {
               this.$Message.warning(res.msg);
             } else if (res.code === -2) {
               this.$Message.warning(res.msg);
             }
          })
          // this.orderUsecoupon(obj).then((res) => {
          //    if (res.code === 200) {
          //      let data = res.data;
          //     // 将优惠码 优惠后的价格 传到vuex 改变orderData价格
          //      var obj = {
          //        total_price: data.price
          //      }
          //      this.priceYouhui(obj);
          //      // 关闭窗口
          //      this.$emit('input', false)
          //    } else if (res.code === 400) {
          //      this.$Message.warning(res.msg);
          //    } else if (res.code === -1) {
          //      this.$Message.warning(res.msg);
          //    } else if (res.code === -2) {
          //      this.$Message.warning(res.msg);
          //    }
          // })
        },
        initInput() {
          this.formData = {
            input1: '',
            input2: '',
            input3: ''
          }
        },
        // 退出登陆
        zhuxiao() {
          // this.loginout().then((res)=>{
          //   if(res.code === 200){
          //     this.REMOVE_TOKEN()
          //     console.log('444')
          //     //  跳转到登陆页面
          //     this.$router.push({
          //       path: '/user/login'
          //     })
          //   }
          // })
        }
      }
    }
</script>

<style lang='less' type="text/less">
  @import "../../../assets/less/common";
  .model1 {
    .input-common {
      display: block;
      width: 100%;
      outline: none;
      border: none;
      font-size: 14px;
      color: #666666;
      height: 50px;
      border-bottom: 1px solid #cccccc;
      &::-webkit-input-placeholder {
        color: #dcdcdc;
        font-size: 14px;
      }
      &:focus::-webkit-input-placeholder {
        color: #dcdcdc;
        font-size: 14px;
      }
      &:-moz-placeholder {
        color: #dcdcdc;
        font-size: 14px;
      }
      &:focus:-moz-placeholder {
        color: #dcdcdc;
        font-size: 14px;
      }
      &::-moz-placeholder {
        color: #dcdcdc;
        font-size: 14px;
      }
      &:focus::-moz-placeholder {
        color: #dcdcdc;
        font-size: 14px;
      }
      &:-ms-input-placeholder {
        color: #dcdcdc;
        font-size: 14px;
      }
      &:focus:-ms-input-placeholder {
        color: #dcdcdc;
        font-size: 14px;
      }
    }
    .ivu-modal {
      border-radius: 10px;
      width: 426px !important;
      height: 492px !important;
      background: #ffffff;
      top: 50%;
      margin-top: -241px;
      .ivu-modal-content {
        box-shadow: none;
        .ivu-modal-header {
          padding: 22px 27px;
          padding-bottom: 60px;
          border: none !important;
          text-align: right;
          i {
            color: #666666;
            cursor: pointer;
            font-size: 16px;
          }
        }
      }
    }
    .ivu-modal-close {
      display: none;
    }
    .ivu-modal-body {
      padding: 0px;
      border: none !important;
      .model1-content {
        text-align: center;
        border: none !important;
        .model1-content-header {
          color: #666666;
          font-size: 20px;
          height: 48px;
          line-height: 48px;
          i {
            vertical-align: middle;
            display: inline-block;
            color: #dd7116;
            font-size: 40px;
            position: relative;
            top: -1px;
          }
          span {
            vertical-align: middle;
            display: inline-block;
            line-height: 32px;
          }
        }
        .model1-content-content {
          font-size: 18px;
          color: #666666;
          height: 205px;
          margin: 0 auto;
          width: 238px;
          line-height: 205px;
          &.show-gohome {
            height: 140px;
            line-height: 140px;
          }
          p {
            display: inline-block;
            vertical-align: middle;
            margin: 0 auto;
            text-align: center;
            width: 214px;
            line-height: 30px;
          }
          &-youhuima {
            width: 100%;
            display: inline-block;
          }
          &-input {
            padding-top: 30px;
            ul {
              li {
                position: relative;
                .model1-yanzhengma {
                  position: absolute;
                  right: 0;
                  top: 8px;
                }
                input {
                }
              }
            }
          }
          &-quxiao {
            header {
              height: 38px !important;
              line-height: 1;
              .select-ee {
                border-radius: 5px;
                .ivu-select-selection {
                  background: #eeeeee;
                  .ivu-select-selected-value {
                    color: #333333;
                    font-size: 14px;
                    padding-left: 0px;
                    padding-right: 0px;
                  }
                }
                border: 1px solid #cccccc;
                height: 38px !important;
                .select-right {
                  i {
                    top: 14px;
                  }
                }
              }
              .ivu-select-dropdown {
                li {
                  color: #333333;
                  font-size: 14px;
                  padding-left: 0px;
                  padding-right: 0px;
                }
              }
            }
            &-content {
              line-height: 1;
              textarea {
                outline: none;
                border-radius: 5px;
                background: #f7f7f7;
                border: 1px solid #dcdcdc;
                height: 130px;
                width: 100%;
                margin-top: 20px;
                line-height: 1;
                color: #333333;
                font-size: 14px;
                padding-top: 10px;
                padding-left: 10px;
                line-height: 18px;
                .input-placehoader(#c0c0c0, 14px);
              }
            }
          }
        }
      }
    }
    .ivu-modal-footer {
      padding: 0px;
      border: none;
      .footer {
        .footer-btn {
          cursor: pointer;
          width: 238px;
          height: 64px;
          text-align: center;
          background: #dd7116;
          color: #ffffff;
          font-size: 14px;
          line-height: 64px;
          margin: 0 auto;
          &-right-line {
            position: relative;
            display: inline-block;
            width: 55px;
            height: 2px;
            background: #ffffff;
            margin-right: 20px;
            &::after {
              content: '';
              position: absolute;
              right: 0px;
              bottom: 4px;
              width: 10px;
              height: 2px;
              background: #ffffff;
              transform: rotate(45deg);
            }
          }
        }
        .footer-gohome {
          margin: 0 auto;
          width: 108px;
          text-align: center;
          margin-top: 13px;
          color: #666666;
          font-size: 14px;
        }
      }
    }
  }
</style>
