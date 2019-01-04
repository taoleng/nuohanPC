<template>
  <!--服务的预定页面-->
  <!--如果state="xiugai" 此页将为修改页面-->
  <div class="serve">
    <div class="serve-service">
      <p class="list-header">
        <i class="iconfont icon-qiapianxingshi"/><b/><span>{{ $t('lang.book.appt.service.item1') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="bigProject" v-model="bigProjectId" :placeholder="$t('lang.book.appt.meeting.item1place')"/>
      </div>
    </div>
    <div class="serve-service margintop45">
      <p class="list-header">
        <i class="iconfont icon-leixing"/><b/><span>{{ $t('lang.book.order.service.content') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="twoProject" v-model="twoProjectId" :placeholder="$t('lang.book.appt.meeting.item2place')"/>
      </div>
    </div>
    <div class="serve-service margintop45">
      <p class="list-header">
        <i class="iconfont icon-dingdan1"/><b/><span>{{ $t('lang.book.appt.service.item3') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="threeProject" v-model="threeProjectId"
                   :placeholder="$t('lang.book.appt.service.item3place')"/>
      </div>
    </div>
    <div class="reserve-price margintop95">
      <p class="list-header">
        <i class="iconfont icon-jine"/><b/><span>{{ $t('lang.common.pricetatol') }}</span><em>￥{{ price || 0 }}</em>
      </p>
    </div>
    <div class="reserve-btn">
      <!--/book/order/serve-->
      <clause v-model="single"></clause>
      <div @click="submit">
        <btn-right :text="$t('lang.btn.submit')"/>
      </div>
    </div>
    <div v-show="threeProjectId" class="serve-material">
      <div class="serve-material-content">
        <p class="serve-material-content-header">{{ $t('lang.book.appt.service.offer') }}</p>
        <div class="serve-material-content-body">
          <div class="serve-material-content-body-left">
            {{ $t('lang.book.appt.service.offerneed') }}
          </div>
          <ul class="serve-material-content-body-right material-list">
            <li v-for="(item, index) in hint.information" :key="index" class="material-list-li">
              <span class="material-list-li-span">{{ item.title }}：{{ item.intro }}</span>
              <b class="material-list-li-b" @click="bigImg = item.exp_img">{{ $t('lang.book.appt.service.lieh') }}</b>
            </li>
          </ul>
        </div>
        <div class="serve-material-content-bottom">
          <p>{{ $t('lang.book.appt.service.itemneed') }}<i>{{ hint.needtimes }}</i>{{
            $t('lang.book.appt.service.itemneed2') }}</p>
          <p>{{ $t('lang.book.appt.service.yuji') }}<i>{{ yujidate }}</i></p>
        </div>
      </div>
    </div>
    <div v-if="bigImg"
         :style="'background-image: url(' + bigImg + ')'"
         class="big-img"
         @click="bigImg= ''">
    </div>
  </div>
</template>

<script>
  import btnRight from '~/components/common/button/btn-right';
  import selectEe from '~/components/common/pullDown/select-ee';
  import clause from '~/components/common/select/clause';
  import {_filterDateString2} from '~/assets/js/filter';
  import {mapActions, mapMutations, mapState} from 'vuex'

  export default {
    components: {
      selectEe,
      btnRight,
      clause
    },
    data() {
      return {
        single: false,
        bigProject: [],
        bigProjectId: '',
        twoProject: [],
        twoProjectId: '',
        threeProject: [],
        threeProjectId: '',
        threeData: [],
        price: '',
        hint: {},
        bigImg: ''
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookServices')
      }
    },
    computed: {
      ...mapState(['userInfo']),
      yujidate() {
        if (!this.hint.needtimes) {
          return;
        }
        var time = _filterDateString2((this.hint.needtimes * 1000 * (60 * 60 * 24) + new Date().getTime())).split(' ')[0];
        return time;
      }
    },
    head () {
      return {
        title: this.$t('lang.title.bookServices'),
      }
    },
    watch: {
      bigProjectId(id) {
        // 清空后面的值
        this.twoProjectId = '';
        this.twoProject = [];
        // 获取第二步（小项的）数据
        this.twoCategoryApi(id);
      },
      twoProjectId(id) {
        // 清空后面的值
        this.threeProject = [];
        this.threeProjectId = '';
        // 获取第三部数据
        this.threeCategoryApi(id);
      },
      threeProjectId(id) {
        this.threeData.forEach((v, k) => {
          if (v.id === Number(id)) {
            this.price = v.price;
            this.hint = v;
            console.log(this.hint)
            //  传给下一个页面
            this.setHint(v);
          }
        })
      }
    },
    created() {
      this.serviceCategoryApi();
    },
    methods: {
      ...mapMutations(['setHint']),
      ...mapActions(['serviceCategory', 'serviceSecond', 'serviceList', 'orderService']),
      serviceCategoryApi() {
        this.serviceCategory().then((res) => {
          if (res.code === 200) {
            let data = res.data;
            // 整理之后给组建 填充下拉
            var titleArr = [];
            data.forEach((v, k) => {
              titleArr.push({
                title: v.title,
                value: v.id + ''
              })
            })
            this.bigProject = titleArr;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      twoCategoryApi(id) {
        this.serviceSecond({'id': id}).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            // 整理之后给组建 填充下拉
            var titleArr = [];
            data.forEach((v, k) => {
              titleArr.push({
                title: v.title,
                value: v.id + ''
              })
            })
            this.twoProject = titleArr;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      threeCategoryApi(id) {
        if (!id) {
          return;
        }
        this.serviceList({'id': id}).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            this.threeData = data;
            var titleArr = [];
            data.forEach((v, k) => {
              titleArr.push({
                title: v.title,
                value: v.id + ''
              })
            })
            this.threeProject = titleArr;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      orderServiceApi(obj) {
        this.orderService(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            this.$Message.success(res.msg);
            this.$router.push({
              path: '/book/order/service',
              query: {
                id: data.order_id
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
      },
      submit() {
        if (!this.bigProjectId) {
          this.$Message.warning(this.$t('lang.book.appt.service.item1'));
          return;
        }
        if (!this.twoProjectId) {
          this.$Message.warning(this.$t('lang.book.appt.service.item2'));
          return;
        }
        if (!this.threeProjectId) {
          this.$Message.warning(this.$t('lang.book.appt.service.item3'));
          return;
        }
        if (!this.single) {
          this.$Message.warning(this.$t('lang.model.model1.clause'));
          return;
        }
        var obj = {
          id: this.threeProjectId
        }
        // 提交
        this.orderServiceApi(obj)
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .serve {
    position: relative;
    .select-tishi {
      display: inline-block;
      color: #999999;
      margin-top: 10px;
    }
    .select-inner {
      width: 570px;
    }
    &-service {
    }
    &-uploading {
      color: #d9d9d9;
      margin-bottom: 50px;
      overflow: hidden;
      .uploading-left {
        float: left;
        margin-right: 50px;
      }
      &-title {
        line-height: 1;
        margin-bottom: 25px;
      }
      &-content {
        height: 135px;
        margin-bottom: 18px;
        &-left {
          display: inline-block;
          vertical-align: top;
          margin-right: 20px;
          h3 {
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
          }
          p {
            width: 145px;
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 15px;
          }
          b {
            font-weight: normal;
            font-size: 12px;
          }
        }
        &-right {
          display: inline-block;
          vertical-align: middle;
          img {
            display: block;
            width: 103px;
            height: 130px;
          }
        }
      }
      &-bottom {
        width: 316px;
        i {
          display: inline-block;
        }
        p {
          display: inline-block;
          font-size: 14px;
          line-height: 25px;
          &:last-child {
            text-indent: 6px;
          }
        }
      }
      .uploading-right {
        float: left;
        padding-top: 36px;
        overflow: hidden;
        div {
          float: left;
          width: 95px;
          height: 130px;
          color: #999999;
          line-height: 130px;
          text-align: center;
          background: #222222;
          &.yulan {
            margin-right: 5px;
          }
        }
      }
    }
    &-material {
      min-height: 300px;
      position: absolute;
      top: 0px;
      left: 690px;
      font-size: 14px;
      color: #d9d9d9;
      &-content {
        padding-top: 7px;
        &-header {
          line-height: 1;
          margin-bottom: 36px;
        }
        &-body {
          clear: both;
          height: 74px;
          margin-bottom: 30px;
          &-left {
            float: left;
            margin-right: 45px;
            margin-bottom: 5px;
          }
          &-right {
            float: left;
          }
        }
        &-bottom {
          p {
            i {
              font-style: normal;
              color: #dd7116;
            }
          }
        }
      }
    }
  }
</style>
