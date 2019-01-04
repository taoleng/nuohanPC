<template>
  <!--此处为办公室的预订页面-->
  <!--如果state="xiugai" 此页将为修改页面-->
  <div class="office">
    <div class="office-work">
      <p class="list-header">
        <i class="iconfont icon-dingwei"/><b/><span>{{ $t('lang.book.appt.office.itme1') }}</span>
      </p>
      <div class="office-work-content">
        <ul class="office-work-content-list">
          <li><select-ee :list="sideList.country" v-model="side.country" :placeholder="$t('lang.book.appt.office.placecoun')"/></li>
          <li><select-ee :list="sideList.city" v-model="side.city" :placeholder="$t('lang.book.appt.office.placecity')"/></li>
          <li><select-ee :list="sideList.office" v-model="side.office" :placeholder="$t('lang.book.appt.office.placeoffic')"/></li>
        </ul>
      </div>
    </div>
    <div class="office-hometype">
      <p class="list-header">
        <i class="iconfont icon-qiapianxingshi"/><b/><span>{{ $t('lang.book.appt.office.item2') }}</span>
      </p>
      <ul class="multiple-choice">
        <!--记得改称showtype-->
        <li
          v-for="(item, index) in showtype"
          :key="index"
          :class="{ 'checked' : standard == item.type }"
          @click="officeSpecification(item.type)"
        >{{ item.title }}</li>
      </ul>
    </div>
    <div class="office-howlong">
      <div class="num1">
        <p class="list-header">
          <i class="iconfont icon-gongwei"/><b/><span>{{ $t('lang.book.appt.office.item3') }}</span>
        </p>
        <div class="num-content">
          <div class="num-content-left">
            <amount-btn v-model="officeNum"/>
          </div>
          <span>人</span>
        </div>
      </div>
      <div class="num2">
        <p class="list-header">
          <i class="iconfont icon-shijian"/><b/><span>{{ $t('lang.book.appt.office.item4') }}</span>
        </p>
        <div class="num-content">
          <div class="num-content-left">
            <amount-btn v-model="officeTime"/>
          </div>
          <span>{{ $t('lang.book.appt.office.geyue') }}</span>
        </div>
      </div>
    </div>
    <div class="reserve-price">
      <p class="list-header">
        <i class="iconfont icon-jine"/><b/><span>{{ $t('lang.book.appt.office.price') }}</span><em>{{ total ? '￥' + total : '￥0' }}</em>
      </p>
    </div>
    <div class="reserve-btn">
      <div>
        <clause v-model="single"></clause>
        <div @click="submit">
          <btn-right :text="$t('lang.btn.reserve')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import btnRight from '~/components/common/button/btn-right';
  import selectEe from '~/components/common/pullDown/select-ee';
  import amountBtn from '~/components/common/button/amount-btn';
  import btnPay from '~/components/common/button/btn-pay';
  import clause from '~/components/common/select/clause';
  import { selectEeArr } from '~/assets/js/common.js';
  import { mapActions, mapMutations } from 'vuex';
    export default {
      components: {
        selectEe,
        btnRight,
        amountBtn,
        btnPay,
        clause
      },
      data() {
        return {
          modal1: false,
          // 代表的步数
          idx: 0,
          single: false,
          standard: undefined,
          locationNumber: '',
          hour: 0,
          hometype: [
            {
              title: this.$t('lang.common.huiyiarr[1]'),
              type: '1'
            },
            {
              title: this.$t('lang.common.huiyiarr[2]'),
              type: '2'
            },
            {
              title: this.$t('lang.common.huiyiarr[3]'),
              type: '3'
            }
          ],
          showtype: [],
          // address 接口数据
          addressData: {},
          officeListData: [],
          // 地点下拉的内容
          sideList: {
            country: [],
            city: [],
            office: []
          },
          // 地点选中的内容
          side: {
            country: '',
            city: '',
            office: ''
          },
          // 工位数量
          officeNum: 0,
          // 工位时长
          officeTime: 0,
          // 价格
          price: '',
          originalPrice: '',
          // 折扣
          discountArr: [],
          id: null
        }
      },
      head(){
        return {
          title:this.$t('lang.title.bookSpaceOffice')
        }
      },
      computed:{
        total(){
          let total = this.originalPrice * (this.officeTime || 1);
          let discount = this.discountArr;
          discount = discount.sort((a,b)=>b.month-a.month);
          for (var i=0;i<discount.length;i++){
            if ( discount[i].month <= this.officeTime ) {
              total = total * discount[i].discount;
              break;
            }
          }
          return total;
        }
      },
      watch: {
        'side.country'(val, oldVal) {
          // 筛选城市列表
          this.side.city = '';
          var cityArr = [];
          this.addressData.forEach((v, k) => {
            if (v.country === val) {
              this.sideList.city = v.city;
            }
          })
          this.sideList.city = selectEeArr(this.sideList.city)
        },
        'side.city'(val, oldVal) {
          // 清除后面的办公室value
          this.side.office = '';
          var obj = {
            country: this.side.country,
            city: this.side.city
          }
          // 国家选项发生变化进行筛选 第三个框
          this.officeListApi(obj);
          this.imputedPrice();
        },
        'side.office'(id) {
          // 排他
          this.showtype = []
          //  根据ID找出对应type
          var type = [];
          this.officeListData.forEach((v, k) => {
            if (v.id + '' === id) {
              type = v.type;
            }
          })
          type.forEach((v, k) => {
            this.hometype.forEach((item, index) => {
              if (v === item.type) {
                this.showtype.push(item)
              }
            })
          })
          console.log(this.hometype)
          this.idx = 1;
          //  得到ID 得到价格
          this.sideList.office.forEach((v, k) => {
            if (v.value === id) {
              this.price = v.price;
              this.originalPrice = v.price;
            }
          })
          this.id = id;
        },
        'standard'(val, oldVal) {
        },
        // 租聘时长
        'officeTime'(val) {
          this.hour = val;
          this.imputedPrice();
        }
      },
      created() {
        // 请求折扣
        this.addressApi();
        this.discountApi();
      },
      methods: {
        ...mapActions(['address', 'officeList', 'discount', 'orderOffice']),
        ...mapMutations(['setModelProtocol']),
        imputedPrice() {
          this.price = this.originalPrice * this.hour;
          // 计算价格
          var iszhekou = false;
          this.discountArr.filter((v, k) => {
            if (!iszhekou) {
              if (this.hour >= v.month) {
                // 享受折扣
                this.price = this.originalPrice * this.hour * v.discount;
                iszhekou = true;
              } else if (this.hour < v.month) {
              }
            }
          })
          this.price = this.price.toFixed(2);
        },
        // 国家 城市下拉 请求
        addressApi() {
          this.address().then((res) => {
            if ( res.code === 200 ) {
              let data = res.data;
              this.addressData = data;
              //  提出所有的城市
              var countryArr = [];
              data.forEach((v, k) => {
                countryArr.push(v.country)
              })
              // 整合成 select 可以用的格式
              this.sideList.country = selectEeArr(countryArr)
            } else if (res.code === 400) {
              this.$Message.warning(res.msg);
            } else if (res.code === -1) {
              this.$Message.warning(res.msg);
            } else if (res.code === -2) {
              this.$Message.warning(res.msg);
            }
          })
        },
        // 办公室列表 请求
        officeListApi(obj) {
          this.officeList(obj).then((res) => {
            if ( res.code === 200 ) {
              let data = res.data;
              this.officeListData = data;
              var titleArr = [];
              data.forEach((v, k) => {
                titleArr.push({
                  title: v.title,
                  value: v.id + '',
                  price: v.price
                })
              })
              this.sideList.office = titleArr;
            } else if (res.code === 400) {
              this.$Message.warning(res.msg);
            } else if (res.code === -1) {
              this.$Message.warning(res.msg);
            } else if (res.code === -2) {
              this.$Message.warning(res.msg);
            }
          })
        },
        // 初始化 idx 代表初始化到第几部
        discountApi() {
          this.discount().then((res) => {
            if ( res.code === 200 ) {
              let data = res.data;
              this.discountArr = data;
            } else if (res.code === 400) {
               this.$Message.warning(res.msg);
            } else if (res.code === -1) {
              this.$Message.warning(res.msg);
            } else if (res.code === -2) {
              this.$Message.warning(res.msg);
            }
          })
        },
        orderOfficeApi(obj) {
          this.orderOffice(obj).then((res) => {
            if ( res.code === 200 ) {
              let data = res.data;
              this.$Message.success(res.msg);
              //  跳转到订单
              this.$router.push({
                path: '/book/order/office',
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
        officeSpecification(type) {
          this.standard = type;
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
            this.$Message.warning(this.$t('lang.book.appt.office.placeoffic'));
            return;
          }
          if (!this.standard) {
            this.$Message.warning(this.$t('lang.book.appt.office.item2'));
            return;
          }
          if (!this.officeNum) {
            this.$Message.warning(this.$t('lang.book.appt.office.item3'));
            return;
          }
          if (!this.officeTime) {
            this.$Message.warning(this.$t('lang.book.appt.office.item4'));
            return;
          }
          if (!this.single) {
            this.$Message.warning(this.$t('lang.model.model1.clause'));
            return;
          }
          //  提交成功
          var obj = {
            id: this.id,//办公室ID
            type: this.standard,//公办室类型 1-独立办公室  2-固定工位  3-流动工位
            station: this.officeNum,//工位数
            times: this.officeTime //租赁时长
          }
          // 提交
          this.orderOfficeApi(obj);
        }
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .office {
    &-work {
      margin-bottom: 55px;
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
    }
    &-howlong {
      margin-bottom: 55px;
      .num1 {
        display: inline-block;
        margin-right: 36px;
      }
      .num2 {
        display: inline-block;
      }
      .num-content {
        overflow: hidden;
        &-left {
          float: left;
          margin-right: 10px;
        }
        span {
          float: left;
          line-height: 42px;
          color: #ffffff;
        }
      }
      &-content {
        width: 568px;
      }
    }

  }
</style>
