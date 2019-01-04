<template>
  <!--此处为线下的预订页面-->
  <!--如果state="xiugai" 此页将为修改页面-->
  <div class="offlineTalks">
    <!--第0步-->
    <div>
      <p class="list-header">
        <i class="iconfont icon-qiapianxingshi"/><b/><span>{{ $t('lang.book.appt.meeting.item1') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="bigProject" v-model="bigProjectId" :placeholder="$t('lang.book.appt.meeting.item1place')"/>
      </div>
    </div>
    <!--第1步-->
    <div class="margintop45">
      <p class="list-header">
        <i class="iconfont icon-muluxiangmu"/><b/><span>{{ $t('lang.book.appt.meeting.item2') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="smallProject" v-model="smallProjectId"
                   :placeholder="$t('lang.book.appt.meeting.item2place')"/>
      </div>
    </div>
    <!--第2步-->
    <div class="margintop45 start-activity-kecheng">
      <p class="list-header">
        <i class="iconfont icon-shuoming"/><b/><span>{{ $t('lang.book.appt.meeting.shuoming') }}</span>
      </p>
      <div class="select-ee-width570">
        <inputEe v-model="contentText" :placeholder="$t('lang.book.appt.meeting.shuomingplace')"/>
      </div>
    </div>
    <!--第3步-->
    <div class="talks-date margintop45">
      <div class="talks-date-date">
        <datePicker v-model="dayTime" :type="'datetimerange'" :text="$t('lang.book.appt.talks.datePicker')"/>
      </div>
    </div>
    <!--第4步-->
    <div class="margintop45">
      <p class="list-header">
        <i class="iconfont icon-dingwei"/><b/><span>{{ $t('lang.book.appt.talks.item1') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="sideList" v-model="side" :placeholder="$t('lang.book.appt.talks.item1place')"/>
      </div>
    </div>
    <!--第5步-->
    <div>
      <div class="margintop95 reserve-price">
        <p class="list-header">
          <i class="iconfont icon-jine"/><b/><span>{{ $t('lang.book.appt.talks.price') }}</span><em>￥{{ priceIng }}</em>
        </p>
      </div>
      <div>
        <div class="reserve-btn">
          <clause v-model="single"></clause>
          <div @click="submit">
            <btn-right :text="$t('lang.btn.submit')"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import btnRight from '~/components/common/button/btn-right';
  import selectEe from '~/components/common/pullDown/select-ee';
  import inputEe from '~/components/common/input/input-ee';
  import inputEe1 from '~/components/common/input/input-ee1';
  import datePicker from '~/components/common/timer/date-picker';
  import hourMinute from '~/components/common/timer/hour-minute';
  import btnPay from '~/components/common/button/btn-pay';
  import clause from '~/components/common/select/clause';
  import {mapActions, mapMutations} from 'vuex'

  export default {
    components: {
      selectEe,
      btnRight,
      inputEe,
      inputEe1,
      datePicker,
      hourMinute,
      btnPay,
      clause
    },
    head () {
      return {
        title: '商务会面'
      }
    },
    data() {
      return {
        hour: 0,
        idx: 0, // 已完成的步骤数,
        bigProject: [], // 大项下拉
        bigProjectId: '', // 大项ID
        smallProject: [], // 小项下拉
        smallProjectId: '', // 小项ID
        sideList: [], // 地址下拉
        contentText: '', // 文本内容
        dayTime: {}, // 时间对象
        side: '', // 会议地点
        sideId: '', // 会见地点ID
        smallCategoryData: null, // smallCategory 接口Data
        price: '', // 原价
        priceIng: '', // 显示价格
        single: false,
        smallClassID: ''
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookConTalks')
      }
    },
    watch: {
      // 完成第一步
      bigProjectId(id) {
        // 清空后面的值
        this.smallProjectId = '';
        this.smallProject = [];
        // 获取第二步（小项的）数据
        this.smallCategoryApi(id);
      },
      // 完成第二步
      smallProjectId(id) {
        // 清空地址的值
        this.side = '';
        // 根据选择的小项 渲染地址框的下拉
        this.smallClassID = id;
        this.smallCategoryData.forEach((v, k) => {
          if (v.id + '' === id) {
            var arr = [];
            // 将数据组装给地址下拉
            v.place.forEach((v, k) => {
              arr.push({
                title: v.title,
                value: v.id + '',
                map_link: v.map_link
              })
            })
            this.sideList = arr;
          }
        })
        //  根据第二相筛选出价格
        this.smallProject.forEach((v, k) => {
          if (v.value === id) {
            this.price = v.price
          }
        })
        this.imputedPrice();
      },
      // 完成第三步
      contentText(val) {
      },
      // 完成第4步
      dayTime(val) {
        this.hour = val.hour;
        this.imputedPrice();
      },
      // 完成第五步
      side(id) {
        this.sideId = id;
      }
    },
    created() {
      this.categoryApi();
    },
    methods: {
      ...mapActions(['category', 'smallCategory', 'orderAdvisory']),
      ...mapMutations(['setModelProtocol']),
      imputedPrice() {
        this.priceIng = this.price * this.hour;
      },
      categoryApi() {
        this.category().then((res) => {
          if (res.code === 200) {
            var data = res.data;
            // 整理之后给组建 填充下拉
            var titleArr = [];
            data.forEach((v, k) => {
              titleArr.push({
                title: v.title,
                value: v.id + '',
                price: v.price
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
      smallCategoryApi(id) {
        this.smallCategory({'id': id}).then((res) => {
          if (res.code === 200) {
            var data = res.data;
            // 保存 data
            this.smallCategoryData = data;
            // 整理之后给组建 填充下拉
            var titleArr = [];
            data.forEach((v, k) => {
              titleArr.push({
                title: v.title,
                value: v.id + '',
                price: v.price
              })
            })
            this.smallProject = titleArr;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      orderAdvisoryApi(obj) {
        this.orderAdvisory(obj).then((res) => {
          if (res.code === 200) {
            var data = res.data;
            this.$Message.success(res.msg);
            this.$router.push({
              path: '/book/order/talks',
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
      // 初始化方法 idx 已完成idx步的时候
      submit() {
        if (!this.bigProjectId) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.item1place'));
          return;
        }
        if (!this.smallProjectId) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.item2place'));
          return;
        }
        if (!this.contentText) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.shuomingplace'));
          return;
        }
        if (!this.dayTime.hour) {
          this.$Message.warning(this.$t('lang.book.appt.talks.datePicker'));
          return;
        }
        if (!this.side) {
          this.$Message.warning(this.$t('lang.book.appt.talks.item1place'));
          return;
        }
        if (!this.single) {
          this.$Message.warning(this.$t('lang.model.model1.clause'));
          return;
        }
        var obj = {
          id: this.smallClassID, //小类ID
          question: this.contentText, //问题描述
          start: this.dayTime.date[0], // 开始时间
          end: this.dayTime.date[1], // 结束时间
          place_id: this.sideId// 会见地点ID
        }
        //  提交
        this.orderAdvisoryApi(obj)
      }
    }
  }
</script>

<style lang='less' type="text/less">
</style>
