<!--suppress ALL -->
<template>
  <!--预约服务确认订单页面-->
  <!--qurery state为 details 时此页面为办公室的订单详情-->
  <div class="affirm-serve">
    <ul class="affirm-serve-tabel">
      <template v-if="$route.query.state !== 'details'">
        <li class="affirm-tabel-li no-bottom"><i class="iconfont icon-dingdan"/><span>{{ $t('lang.book.order.activity.number') }}</span><b>{{
          orderData.order_id }}</b></li>
      </template>
      <template v-if="$route.query.state === 'details'">
        <li class="affirm-tabel-li width100">
          <div class="width530 inline-block">
            <i class="iconfont icon-dingdan"/><span>{{ $t('lang.book.order.activity.number') }}</span><b>{{
            orderData.order_id }}</b>
          </div>
          <div class="width425 inline-block">
            <i class="iconfont icon-dingdan1"/><span>{{ $t('lang.book.order.activity.state') }}</span><b>{{
            orderData.payState }}</b>
          </div>
          <div class="inline-block">
            <i class="iconfont icon-shouliren"/>
            <span>{{ $t('lang.book.order.activity.receiver') }}</span>
            <template v-if="!orderData.manage">
              <b>{{ $t('lang.book.order.activity.unsbd') }}</b>
            </template>
            <template v-else>
              <b>{{ orderData.manage.truename }} {{ orderData.manage.mobile }}</b>
            </template>
          </div>
        </li>
      </template>
      <li class="affirm-serve-tabel-fuwu margintop50">
        <p>
          <i class="iconfont icon-shenpigaizhang"/>
        </p>
        <ul>
          <li>
            <span>{{ $t('lang.book.order.service.type') }}</span>
            <div>
              {{ orderData.first_title }}
            </div>
          </li>
          <li>
            <span>{{ $t('lang.book.order.service.content') }}</span>
            <div>
              {{ orderData.second_title }}
            </div>
          </li>
          <li>
            <span>{{ $t('lang.book.order.service.name') }}</span>
            <div>
              {{ orderData.title }}
            </div>
          </li>
        </ul>
      </li>
      <!--显示提供的资料-->
      <!--="(fileStyleType === 'up' && !(orderData.informationList || (orderData.informationList.length >= 1))) || isXiugai"-->
      <!--<template v-if=" (orderData.informationList.length >= 1) && !isXiugai">-->
      <li class="affirm-tabel-look no-bottom margintop50">
        <i class="iconfont icon-cailiaoshenbao"/>
        <div class="look-img">
          <div class="look-img-header pstyle">
            <template v-if="$route.query.state === 'details'">
              <p>请上传以下资料</p>
            </template>
            <template v-else>
              <p>请确认订单后您可以提供服务项目所需的以下材料</p>
            </template>
          </div>
          <ul class="material-list">
            <li v-for="(item, index) in orderData.information" :key="index" class="material-list-li">
              <span class="material-list-li-span">{{ item.title }}：{{ item.intro }}</span>
              <b class="material-list-li-b margin-right25px" @click="bigImg = item.exp_img">示例</b>
            </li>
          </ul>
          <template v-if="$route.query.state === 'details'">
            <ul class="look-img-content" style="margin-top: 20px">
              <p class="pstyle">以下是您提供的资料</p>
              <li
                v-for="(item, index) in imglist"
                :style="{ 'background-image': 'url(' + (item.url ? item.url : ' ') + ')' }"
                :key="index"
              >
                <template v-if="/.pdf$/.test(item.url)">
                  <img src="../../../assets/img/pdf.png">
                </template>
                <div class="listbanner" @click="lookbigimg(item.url)">
                  <i class="iconfont icon-quxiao" @click.stop="removeImg(item.id)"></i>
                </div>
              </li>
              <avatar-upload @on-change="filechange"></avatar-upload>
            </ul>
            <div class="serve-material-content-bottom" style="margin-top: 20px">
              <p>{{ $t('lang.book.appt.service.itemneed') }}<i class="istyle">{{ orderData.needtimes }}</i>{{
                $t('lang.book.appt.service.itemneed2') }}</p>
              <p>{{ $t('lang.book.appt.service.yuji') }}<i class="istyle">{{ yujidate }}</i></p>
            </div>
          </template>
        </div>
      </li>
      <!--</template>-->
      <!--&lt;!&ndash;修改资料&ndash;&gt;-->
      <!--<template v-else>-->
      <!--<li class="affirm-tabel-cailiao no-bottom margintop50">-->
      <!--<i class="iconfont icon-cailiaoshenbao"/>-->
      <!--<span>请确认提交订单后您可以提供服务项目所需的以下材料：</span>-->
      <!--<ul class="material-list">-->
      <!--<li v-for="(item, index) in orderData.information" :key="index" class="material-list-li">-->
      <!--<span class="material-list-li-span">{{ item.title }}：{{ item.intro }}</span>-->
      <!--<b class="material-list-li-b margin-right25px" @click="bigImg = item.exp_img">示例</b>-->
      <!--<template v-if="$route.query.state === 'details'">-->
      <!--<b class="material-list-li-b">-->
      <!--上传-->
      <!--<avatar-upload @on-change="filechange($event,index)"></avatar-upload>-->
      <!--</b>-->
      <!--</template>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</li>-->
      <!--</template>-->
    </ul>
    <template v-if="$route.query.state === 'details'">
      <div class="margintop50">
        <business :value="orderData.payState"/>
      </div>
    </template>
    <template v-if="$route.query.state === 'details'">
      <business-msg :message="orderData.message"/>
    </template>
    <div class="affirm-serve-price order-price">
      <span>{{ $t('lang.book.order.activity.price') }}</span>
      <h3><i>￥</i><b>{{ orderData.total_price }}</b></h3>
    </div>
    <template v-if="$route.query.state === 'details'">
      <div class="affirm-serve-patternn margintop50">
        <patternn :value="orderData.payType"/>
      </div>
    </template>
    <template v-else>
      <select-pay
        v-model="patternPay"
        :vipcar="true"
        class="margintop50"
      />
      <div v-if="patternPay === 'vipCar'" class="vip-tishi-explain">
        <header>
          <span>{{ $t('lang.book.order.activity.viptitle') }}</span>
          <a href="/clients">
            <i>{{ $t('lang.book.order.activity.upgrade') }}</i>
          </a>
        </header>
        <ul>
          <li :style="{ opacity: userInfo.vip_data.meeting ? 1 : 0.3 }">{{ $t('lang.user.vip.online') }}{{
            userInfo.vip_data.meeting || '0' }}{{ $t('lang.common.hour') }}
          </li>
          <li :style="{ opacity: userInfo.vip_data.question ? 1 : 0.3 }">{{ $t('lang.user.vip.question') }}{{
            userInfo.vip_data.question || '0' }}{{ $t('lang.common.time') }}
          </li>
          <li :style="{ opacity: userInfo.vip_data.activity ? 1 : 0.3 }">{{ $t('lang.user.vip.activity') }}{{
            userInfo.vip_data.activity || '0' }}{{ $t('lang.common.time') }}
          </li>
          <li :style="{ opacity: userInfo.vip_data.meeting_room ? 1 : 0.3 }">{{ $t('lang.user.vip.metting') }}{{
            userInfo.vip_data.meeting_room || '0' }}
          </li>
        </ul>
      </div>
    </template>
    <clause
      v-if="!(orderData.numstate >= 5)"
      v-model="single"
      :text="$t('lang.common.clausetext')"
      :url-obj="{ text: $t('lang.common.nuohanxy') }"
      class="margintop50"
    ></clause>
    <div class="affirm-listbtn">
      <template v-if="!($route.query.state === 'details')">
        <div class="btn1" @click="payOrder">
          <btn-right :text="$t('lang.btn.subOrder')"/>
        </div>
      </template>
      <template v-if="orderData.numstate == 4">
        <nuxt-link :to="'/user/order?id=' + orderData.order_id + '&type=evaluate'">
          <btn-right :text="$t('lang.user.order.evaluate')"/>
        </nuxt-link>
      </template>
      <template v-else-if="orderData.numstate <= 3">
        <div class="btn2" @click="offOrder">
          <btn-pay :text="$t('lang.btn.cancelOrder')"/>
        </div>
      </template>
    </div>
    <div v-if="bigImg"
         :style="'background-image: url(' + bigImg + ')'"
         class="big-img"
         @click="bigImg= ''">
    </div>
    <!--轮播图弹窗-->
  </div>
</template>

<script>
  import selectEe from '~/components/common/pullDown/select-ee';
  import selectPay from '~/components/common/pay/select-pay';
  import btnRight from '~/components/common/button/btn-right';
  import patternn from '~/components/common/pay/pattern';
  import businessMsg from '~/components/common/pushbox/business-msg';
  import business from '~/components/common/flow/business';
  import btnPay from '~/components/common/button/btn-pay';
  import clause from '~/components/common/select/clause';
  import avatarUpload from '~/components/common/avatarUpload';
  import {_filterDateString2} from '~/assets/js/filter';
  import {mapState, mapActions, mapMutations} from 'vuex';

  export default {
    components: {
      selectEe,
      selectPay,
      btnRight,
      patternn,
      businessMsg,
      btnPay,
      business,
      clause,
      avatarUpload,
    },
    data() {
      return {
        idx: 1,
        patternPay: '',
        single: true,
        bigImg: '',
        files: [],
        fileStyleType: 'up',
        imgListId: [],
        imglist: [],
        isXiugai: false,
        lunboleft: 0,
        isShowLun: false,
        lunboidx: 0
      }
    },
    head(){
      return {
        title:this.$t('lang.title.order')
      }
    },
    computed: {
      ...mapState(['orderData', 'userInfo']),
      yujidate() {
        var time = _filterDateString2((this.orderData.needtimes * (60 * 60 * 24) + this.userInfo.timestamp) * 1000).split(' ')[0];
        return time;
      }
    },
    watch: {
      'orderData.informationList'(val) {
        val.forEach((v) => {
          this.imgListId.push(v.id);
        })
        this.imglist = val;
      }
    },
    methods: {
      ...mapMutations(['payPc', 'orderCancelCommon', 'setOrderData', 'seTpayedType']),
      ...mapActions(['serviceUpload', 'orderSubmit', 'orderDetail']),
      gundong(str) {
        if (str === 'left') {
          this.lunboidx <= 0 ? this.lunboidx : this.lunboidx--;
        } else if (str === 'right') {
          this.lunboidx >= (this.orderData.information.length - 1) ? this.lunboidx : this.lunboidx++;
        } else {

        }
      },
      lookbigimg(url) {
        if (url.indexOf('.pdf') !== -1) {
          // PDF新开页面看
          window.open(url);
          return;
        }
        this.bigImg = url;
      },
      removeImg(id) {
        // 审核通过不能修改与上传
        if (this.orderData.numstate >= 2) {
          this.$Message.warning(this.$t('lang.common.orderpass'));
          return;
        }
        this.imgListId = this.uniq(this.imgListId);
        var index = this.imgListId.indexOf(id);
        this.imglist.forEach((v, k) => {
          if (v.id === id) {
            this.imglist.splice(k, 1);
          }
        })
        if (index === -1) {
          return;
        }
        // 前端删除
        // 后端删除
        this.imgListId.splice(index, 1);
        this.uplistId();
      },
      businessClick(idx) {
        this.idx = idx;
      },
      payOrder() {
        // 没登陆 下单去登陆
        if (!this.userInfo.email) {
          this.$router.push({
            path: '/user/login'
          })
          return;
        }
        var type;
        if (!this.patternPay) {
          this.$Message.warning(this.$t('lang.common.selectpay'));
          return;
        } else {
          // 使用优惠码
          if (this.patternPay === 'youhuima') {
            // 存入当前type 值
            this.seTpayedType({payedType: 'service'});
            // 弹出优惠码
            this.$emit('show-youhui', true)
            return;
          }
          // 选择了支付方式
          if (this.patternPay === 'zhifubao') {
            type = 1;
          } else if (this.patternPay === 'weixin') {
            type = 2;
          } else if (this.patternPay === 'paypal') {
            type = 3;
          } else if (this.patternPay === 'vipCar') {
            type = 4;
          }
          this.payPc({
            _this: this,
            type: type,
            order_id: this.$route.query.id,
            payedType: 'service'
          })
        }
      },
      offOrder() {
        if (this.$route.query.state === 'details') {
          // 弹出取消页面
          this.$emit('show-model', true);
        } else {
          this.orderCancelCommon({
            order_id: this.orderData.order_id,
            str: 'service',
            _this: this
          });
        }
      },
      filechange(file) {
        // 审核通过不能修改与上传
        if (this.orderData.numstate >= 2) {
          this.$Message.warning(this.$t('lang.common.orderpass'));
          return;
        }
        let param = new FormData();
        param.append('file', file);
        this.serviceUploadApi(param);
      },
      serviceUploadApi(param) {
        this.serviceUpload(param).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            this.imgListId.push(data.id)
            this.imgListId = this.uniq(this.imgListId);
            this.imglist.push(data)
            this.uplistId();
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      uplistId() {
        // 将ID传给后端
        var idStr = this.imgListId.join(',');
        this.orderSubmitApi({
          order_id: this.orderData.order_id,
          information: idStr
        })
      },
      // 去重
      uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
          if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
          }
        }
        return temp;
      },
      orderSubmitApi(obj) {
        this.orderSubmit(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
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
  .affirm-serve {
    &-input-inner {
      width: 430px;
      padding-bottom: 35px;
      .ivu-select-selection {
        background: #eeeeee !important;
      }
      .select-right {
        background: #d2d2d2 !important;
        i {
          color: #ffffff !important;
        }
      }
      .ivu-select-placeholder {
        text-align: center !important;
        color: #333333 !important;
        font-size: 14px !important;
      }
    }
    &-input-inner2 {
      padding-bottom: 7px;
    }
    &-tabel {
      .affirm-serve-tabel-fuwu {
        p {
          i {
            display: block;
            font-size: 28px;
            color: #dd7116;
          }
        }
        ul {
          li {
            span {
              display: block;
              line-height: 1;
              margin-bottom: 20px;
              font-size: 20px;
              color: #333333;
            }
            div {
              width: 430px;
              height: 38px;
              background: #eeeeee;
              line-height: 38px;
              text-align: center;
              color: #333333;
            }
            margin-bottom: 32px;
            &:last-child {
              margin-bottom: 0px;
            }
          }
        }
      }
      .affirm-tabel-cailiao {
        padding-bottom: 10px;
        > i {
          display: block;
          font-size: 28px;
          color: #dd7116;
        }
        > span {
          display: block;
          line-height: 1;
          font-size: 20px;
          color: #333333;
          margin-bottom: 30px;
        }
      }
      .affirm-tabel-look {
        padding-bottom: 10px;
        > i {
          display: block;
          font-size: 28px;
          color: #dd7116;
        }
        .look-img {
          &-header {
            height: 30px;
            margin-bottom: 20px;
            p {
              float: left;
              line-height: 1;
              margin-right: 45px;
              padding-top: 13px;
            }
            &-btn {
              float: left;
              height: 30px;
              width: 100px;
              border: 1px solid #999999;
              color: #999999;
              text-align: center;
              line-height: 28px;
              cursor: pointer;
            }
          }
          &-content {
            overflow: hidden;
            li {
              float: left;
              position: relative;
              height: 150px;
              width: 150px;
              background-size: 100%;
              background-repeat: no-repeat;
              background-position: center center;
              margin-right: 20px;
              img {
                position: absolute;
                height: 150px;
                width: 150px;
              }
              &:hover {
                .listbanner {
                  display: block;
                }
              }
              .listbanner {
                cursor: pointer;
                position: absolute;
                display: none;
                width: 150px;
                height: 150px;
                background: rgba(0, 0, 0, 0.3);
                i {
                  line-height: 1;
                  color: #ffffff;
                  font-size: 30px;
                  position: absolute;
                  right: 5px;
                  top: 5px
                }
              }
            }
          }
        }
      }
      .affirm-tabel-li {
        span {
          font-size: 20px;
          color: #333333;
        }
      }
      .affirm-serve-business {
        width: 150%;
        border: none;
        &-list {
          overflow: hidden;
          li {
            cursor: pointer;
            float: left;
            width: 120px;
            height: 38px;
            font-size: 14px;
            color: #333333;
            background: #f6f6f6;
            line-height: 38px;
            text-align: center;
            margin-right: 12px;
            &:last-child {
              margin-right: 0px;
            }
            &.checked {
              background: #dd7116;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
</style>
