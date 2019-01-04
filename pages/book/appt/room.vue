<template>
  <!--会议室预定-->
  <!--如果state="xiugai" 此页将为修改页面-->
  <div class="conference">
    <div class="conference-work">
      <p class="list-header">
        <i class="iconfont icon-dingwei"/><b/><span>{{ $t('lang.book.appt.room.item1') }}</span>
      </p>
      <div class="conference-work-content">
        <ul class="conference-work-content-list">
          <li>
            <select-ee :list="sideList.country" v-model="side.country"
                       :placeholder="$t('lang.book.appt.office.placecoun')"/>
          </li>
          <li>
            <select-ee :list="sideList.city" v-model="side.city" :placeholder="$t('lang.book.appt.office.placecity')"/>
          </li>
          <li>
            <select-ee :list="sideList.office" v-model="side.office"
                       :placeholder="$t('lang.book.appt.room.placeoffic')"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="conference-hometype margintop55">
      <p class="list-header">
        <i class="iconfont icon-qiapianxingshi"/><b/><span>{{ $t('lang.book.appt.room.item2') }}</span>
      </p>
      <ul class="conference-hometype-content">
        <li v-for="(item, index) in scaleDate"
            :key="index"
            :class="{ 'checked' : scaleValue == item.id }"
            @click="conferenceSpecification(item)"
        >{{ item.people }}
        </li>
      </ul>
    </div>
    <div class="conference-howlong">
      <div class="talks-date margintop55">
        <div class="talks-date-date">
          <datePicker v-model="dayTime" :type="'datetimerange'" :text="$t('lang.book.appt.room.datePicker')"/>
        </div>
      </div>
    </div>
    <div class="reserve-price">
      <p class="list-header">
        <i class="iconfont icon-jine"/><b/><span>总金额：</span><em>￥{{ price || 0 }}</em>
      </p>
    </div>
    <div class="reserve-btn">
      <clause v-model="single"></clause>
      <div @click="submit">
        <btn-right :text="$t('lang.btn.reserve')"/>
      </div>
    </div>
  </div>
</template>

<script>
  import btnRight from '~/components/common/button/btn-right';
  import selectEe from '~/components/common/pullDown/select-ee';
  import btnPay from '~/components/common/button/btn-pay';
  import clause from '~/components/common/select/clause';
  import {selectEeArr} from '~/assets/js/common.js';
  import datePicker from '~/components/common/timer/date-picker';
  import {mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      selectEe,
      btnRight,
      btnPay,
      clause,
      datePicker
    },
    data() {
      return {
        single: false,
        sideList: { // 地点下拉的内容
          country: [],
          city: [],
          office: []
        },
        side: { // 地点选中的内容
          country: '',
          city: '',
          office: ''
        },
        hour: 0,
        dayTime: {
          hour: 0
        }, // 时间对象
        addressData: [],// 城市接口的DATA
        ListData: [], // 会议室的数据
        scaleDate: [], // 规模数据
        scaleValue: undefined,// 规模
        hourlyPrice: '', // 每小时的价格,
        price: ''// 价格
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookSpaceRoom')
      }
    },
    watch: {
      // 国家产生变化
      'side.country'(val) {
        // 每次变化 清除后面的 俩个框
        this.side.city = '';
        // 根据国家 筛选城市
        var cityArr = [];
        this.addressData.forEach((v, k) => {
          if (v.country === val) {
            this.sideList.city = v.city;
          }
        })
        this.sideList.city = selectEeArr(this.sideList.city)
      },
      // 城市产生变化
      'side.city'(val) {
        //  清除后面的 value
        this.side.office = '';
        // 根据国家 和 城市 请求API
        var obj = {
          country: this.side.country,
          city: this.side.city
        };
        this.meetingListApi(obj);
      },
      'side.office'(id) {
        this.scaleValue = undefined;
        //  根据id来请求 规模列表数据
        this.ListData.forEach(v => {
          if (v.id === Number(id)) {
            this.scaleDate = v.size;
            this.scaleDate.forEach((v, k) => {
              if (v.size === 1) {
                v.people = this.$t('lang.common.typearr[1]') + ' (' + v.people + ')'
              } else if (v.size === 2) {
                v.people = this.$t('lang.common.typearr[2]') + ' (' + v.people + ')'
              } else if (v.size === 3) {
                v.people = this.$t('lang.common.typearr[3]') + ' (' + v.people + ')'
              }
            })
          }
        })
      },
      'dayTime.hour'(val) {
        this.hour = val;
        this.price = this.hourlyPrice * this.hour;
      }
    },
    created() {
      this.meetingAddress().then((res) => {
        if (res.code === 200) {
          let data = res.data;
          this.addressData = data;
          //  提出所有城市
          var arr = [];
          data.forEach((v, k) => {
            arr.push(v.country);
          })
          this.sideList.country = selectEeArr(arr);
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
      ...mapActions(['meetingAddress', 'meetingList', 'meetingOrder']),
      // 会议室规格
      conferenceSpecification(val) {
        this.scaleValue = val.id;
        // 得到每小时的价格
        this.hourlyPrice = val.price;
        this.price = this.hourlyPrice * this.hour;
      },
      submit() {
        if (!this.side.country) {
          this.$Message.warning(this.$t('lang.book.appt.office.placecoun'));
          return;
        }
        if (!this.side.city) {
          this.$Message.warning(this.$t('lang.book.appt.office.placecity'));
          return;
        }
        if (!this.side.office) {
          this.$Message.warning(this.$t('lang.book.appt.room.placeoffic'));
          return;
        }
        if (!this.single) {
          this.$Message.warning(this.$t('lang.model.model1.clause'));
          return;
        }
        if (!this.dayTime.hour) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.datePicker'));
          return;
        }
        // 组合提交数据
        var obj = {
          size_id: this.scaleValue,
          start: this.dayTime.date[0],
          end: this.dayTime.date[1]
        }
        this.meetingOrderApi(obj);
      },
      meetingOrderApi(obj) {
        this.meetingOrder(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            this.$Message.success(res.msg);
            //  跳转到订单
            this.$router.push({
              path: '/book/order/room',
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
      meetingListApi(obj) {
        this.meetingList(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            var arrList = [];
            this.ListData = data;
            data.forEach((v, k) => {
              arrList.push({
                title: v.title,
                value: v.id + '',
                price: v.price
              })
            })
            this.sideList.office = arrList;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      }
    },
  }
</script>

<style scoped lang='less' type="text/less">
  .conference {
    &-work {
      &-content {
        &-list {
          font-size: 0px;
          > li {
            display: inline-block;
            width: 164px;
            margin-right: 36px;
            &:last-child {
              margin-right: 0px;
            }
          }
        }
      }
    }
    &-hometype {
      margin-bottom: 55px;
      &-content {
        font-size: 0px;
        li {
          display: inline-block;
          width: 164px;
          height: 38px;
          font-size: 14px;
          line-height: 36px;
          text-align: center;
          color: #ffffff;
          background: #303030;
          border: 1px solid #ffffff;
          margin-right: 36px;
          cursor: pointer;
          &.checked {
            background: #dd7116;
            border-color: #dd7116;
          }
        }
      }
    }
    &-howlong {
      margin-bottom: 55px;
    }
  }
</style>
