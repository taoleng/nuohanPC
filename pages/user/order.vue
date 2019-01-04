<template>
  <div class="personal">
    <div class="nuohan-container">
      <user-head></user-head>
      <div class="personal-content">
        <user-menu></user-menu>
        <div class="personal-content-right">
          <template v-if="$route.query.type === 'evaluate'">
            <div class="evaluate informationconmmon">
              <h3>
                <span class="evaluate-header-left">{{ $t('lang.user.order.evaluateOrder') }}</span>
                <div class="evaluate-header-right">
                  <ul>
                    <li><span>{{ $t('lang.user.news.orderNum') }}</span><b>{{ evaluate.orderData.order_id }}</b></li>
                    <li><span>{{ $t('lang.common.date') }}</span><b>{{ evaluate.orderData.create_time }}</b></li>
                  </ul>
                </div>
              </h3>
              <div class="evaluate-content">
                <h4 class="evaluate-content-title">{{ orderArr[evaluate.orderData.type] }}</h4>
                <div class="evaluate-content-class">
                  <span>{{ $t('lang.btn.category') }}</span>
                  <b>
                    <template v-if="evaluate.orderData.type === 7">{{ evaluate.orderData.title }}</template>
                    <template v-if="evaluate.orderData.type === 6">{{ evaluate.orderData.data.first }} —— {{
                      evaluate.orderData.data.second }} —— {{ evaluate.orderData.data.title }}
                    </template>
                    <template
                      v-else-if="evaluate.orderData.type === 5 || evaluate.orderData.type === 4 || evaluate.orderData.type === 3">
                      {{ evaluate.orderData.data.category }} —— {{ evaluate.orderData.data.title }}
                    </template>
                    <template v-else-if="evaluate.orderData.type === 2">{{ evaluate.orderData.data.title }} —— {{
                      typearr[evaluate.orderData.data.size] }}（{{ evaluate.orderData.data.people }}）{{ $t('lang.common.person') }}
                    </template>
                    <template v-else-if="evaluate.orderData.type === 1">{{ evaluate.orderData.data.title }} —— {{
                      huiyiarr[evaluate.orderData.data.type] }} —— {{ evaluate.orderData.data.station }}{{ $t('lang.common.station') }}
                    </template>
                  </b>
                </div>
                <div class="evaluate-content-number">
                  <span>{{ $t('lang.user.order.evaluate2') }}</span>
                  <b>{{ evaluate.grade }}<i>{{ $t('lang.user.order.minute') }}</i></b>
                  <i>（{{ evaluate.gradeArr[ evaluate.grade ] }}）</i>
                </div>
                <div class="evaluate-content-slider">
                  <slider v-model="evaluate.grade"></slider>
                </div>
                <div class="evaluate-content-pinjia">
                  <p>{{ $t('lang.user.order.evaluate2') }}</p>
                  <div class="evaluate-content-pinjia-input">
                    <textarea v-model="evaluate.textarea" :placeholder="$t('lang.user.order.talks')"></textarea>
                  </div>
                  <p class="evaluate-content-pinjia-keshutu">{{ $t('lang.user.order.importability') }}{{ 500 - evaluate.textarea.length }}{{ $t('lang.user.order.font') }}</p>
                  <div class="evaluate-content-pinjia-upload">
                    <evaluate-img-load @on-load="uploadFile"></evaluate-img-load>
                    <!--<i class="iconfont icon-tubiaozhizuo-1"></i>-->
                  </div>
                </div>
                <div class="inline-block" @click="submit">
                  <btn-right :text="$t('lang.btn.submit')"/>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="order-pipe">
              <div class="order-pipe-header">
                <table class="order-pipe-header-header-tabel">
                  <thead>
                  <tr>
                    <th :class="{checked: type === ''}" width="57"><span @click="orderStatus('')">{{ $t('lang.user.order.title')[0] }}</span></th>
                    <th :class="{checked: type === 1}" width="122"><span @click="orderStatus(1)">{{ $t('lang.user.order.title')[1] }}</span></th>
                    <th :class="{checked: type === 2}" width="54"><span @click="orderStatus(2)">{{ $t('lang.user.order.title')[2] }}</span></th>
                    <th :class="{checked: type === 3}" width="127"><span @click="orderStatus(3)">{{ $t('lang.user.order.title')[3] }}</span></th>
                    <th :class="{checked: type === 4}" width="52"><span @click="orderStatus(4)">{{ $t('lang.user.order.title')[4] }}</span></th>
                  </tr>
                  </thead>
                </table>
                <p :style="{left: lineLeft}" class="order-pipe-header-line"></p>
              </div>
              <div class="order-pipe-content">
                <table class="order-pipe-header-header-tabel" cellspacing="0" cellpadding="0">
                  <thead>
                  <tr>
                    <th width="95">{{ $t('lang.user.order.titile2')[0] }}</th>
                    <th width="203">{{ $t('lang.user.order.titile2')[1] }}</th>
                    <th width="91">{{ $t('lang.user.order.titile2')[2] }}</th>
                    <th width="206">{{ $t('lang.user.order.titile2')[3] }}</th>
                    <th width="78">{{ $t('lang.user.order.titile2')[4] }}</th>
                    <th width="26"></th>
                    <th width="172">{{ $t('lang.user.order.titile2')[5] }}</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(item, index) in list" :key="index">
                    <td width="95">
                      <p class="tabel-title1">{{ orderArr[item.type] }}</p>
                      <span class="number">{{ $t('lang.user.news.orderNum') }}{{ item.order_id }}</span>
                    </td>
                    <td width="203">
                      <!--类型的位置-->
                      <template v-if="item.type === 7">
                        <p>{{ item.data.title }}</p>
                      </template>
                      <template v-if="item.type === 6">
                        <p>{{ item.data.first }}</p>
                        <p>{{ item.data.second }}</p>
                        <p>{{ item.data.title }}</p>
                      </template>
                      <template v-else-if="item.type === 5 || item.type === 4 || item.type === 3">
                        <p>{{ item.data.category }}</p>
                        <p>{{ item.data.title }}</p>
                      </template>
                      <template v-else-if="item.type === 2">
                        <p>{{ item.data.title }}</p>
                        <p>{{ typearr[item.data.size] }}（{{ item.data.people }}）{{ $t('lang.common.person') }}</p>
                      </template>
                      <template v-else-if="item.type === 1">
                        <p>{{ item.data.title }}</p>
                        <p>{{ huiyiarr[item.data.type] }}</p>
                        <p>{{ item.data.station }}{{ $t('lang.common.station') }}</p>
                      </template>
                    </td>
                    <td width="91">
                      <!--显示时间-->
                      <template v-if="item.data.start || item.data.end">
                        <p>{{ item.data.start }}</p>
                        <p>~</p>
                        <p>{{ item.data.end }}</p>
                      </template>
                      <template v-else>
                        <template v-if="item.type === 6">
                          <p>{{ $t('lang.user.order.needtime') }}</p>
                          <p>{{ item.data.needtimes }}{{ $t('lang.common.day') }}</p>
                        </template>
                        <template v-if="item.type === 1">
                          <p>{{ $t('lang.user.order.rentaltime') }}</p>
                          <p>{{ item.data.times }} {{ $t('lang.common.month') }}</p>
                        </template>
                      </template>
                    </td>
                    <td width="206">
                      ￥{{ item.price }}{{ $t('lang.common.unit') }}
                    </td>
                    <td width="78">{{ orderState[item.state== 5 ? 4 : item.state] }}</td>
                    <td width="26"/>
                    <td width="172">
                      <div class="details-btn" @click="clickOrderDetails(item)">{{ $t('lang.user.order.oerderDetails') }}</div>
                      <template v-if="item.state === 4">
                        <nuxt-link :to="'/user/order?id=' + item.order_id + '&type=evaluate'">
                          <div class="off-btn">{{ $t('lang.user.order.evaluate') }}</div>
                        </nuxt-link>
                      </template>
                      <template v-else>
                        <div v-if="!(item.state === 6 || item.state === 7 || item.state === 5)"
                             class="off-btn"
                             @click="cancelOrder(item.order_id)"
                        >{{ $t('lang.btn.cancelOrder') }}</div>
                      </template>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="count" class="information-page">
                <nuohan-page
                  :current="current"
                  :count="count"
                  :pagesize="pagesize"
                  @on-change="changePage"
                ></nuohan-page>
              </div>
            </div>
          </template>
          <model1
            :title="$t('lang.model.model1.title')"
            :is-show-icon="false"
            :text="$t('lang.model.model1.clause')"
            v-model="isShowModel"
            :type="3"
            :order-id="quxiaoid"
            @orderoff="orderoff"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {_filterDateString} from '~/assets/js/filter';
  import nuohanPage from '~/components/common/page/nuohan-page';
  import slider from '~/components/common/select/slider';
  import btnRight from '~/components/common/button/btn-right';
  import evaluateImgLoad from '~/components/common/upload/evaluateImgLoad';
  import {mapActions} from 'vuex'
  import model1 from '~/components/common/pop/model1';
  import userHead from '~/components/user/userHead'
  import userMenu from '~/components/user/userMenu'

  export default {
    layout: 'layouts2',
    filter: {
      filterDateString(val) {
        return _filterDateString(val)
      }
    },
    components: {
      nuohanPage,
      slider,
      btnRight,
      evaluateImgLoad,
      model1,
      userHead,
      userMenu
    },
    data() {
      return {
        // 取消订单的id
        quxiaoid: '',
        isShowModel: false,
        page: 'order',
        huiyiarr:this.$t('lang.common.huiyiarr'),
        typearr: this.$t('lang.common.typearr'),
        imgsrc: '',
        checkedLeft: [
          '46px',
          '140px',
          '229px',
          '322px',
          '415px'
        ],
        lineLeft: 46,
        type: '',
        idx: 1, // 页数
        current: 1, // 当前页码
        count: 0, // 数据总数
        pagesize: 0, // 每页数据的数量
        list: [], // 列表数据
        orderArr: this.$t('lang.common.orderArr'),
        orderState: this.$t('lang.common.orderState'),
        // 评价页面的数据
        evaluate: {
          grade: 8,
          textarea: '',
          files: [],
          text:this.$t('lang.user.order.satisfaction'),
          uploadId: [],
          gradeArr: [
            this.$t('lang.user.order.unhappy'),
            this.$t('lang.user.order.unhappy'),
            this.$t('lang.user.order.yawp'),
            this.$t('lang.user.order.yawp'),
            this.$t('lang.user.order.yiban'),
            this.$t('lang.user.order.yiban'),
            this.$t('lang.user.order.yiban'),
            this.$t('lang.user.order.satisfaction'),
            this.$t('lang.user.order.satisfaction'),
            this.$t('lang.user.order.satisfaction'),
            this.$t('lang.user.order.greatSatisfaction')
          ],
          id: '',
          orderData: {} // 评价的订单数据
        }
      }
    },
    head(){
      return {
        title:this.$t('lang.title.PersonalCenter')
      }
    },
    watch: {
      'evaluate.textarea'(val, oldval) {
        if (val.length > 500) {
          this.evaluate.textarea = oldval;
        }
      },
      $route(val) {
        if (this.$route.query.id) {
          window.scrollTo(0,0);
          this.orderDetailApi(this.$route.query.id);
        }
      }
    },
    created() {
      if (this.$route.query.id) {
        this.orderDetailApi(this.$route.query.id);
      }
      // 请求所有
      this.orderListApi(this.type, this.current, 8);
    },
    head () {
      return {
        title: '个人中心-订单管理'
      }
    },
    mounted() {
      window.scrollTo(0,0);
    },
    methods: {
      ...mapActions(
        [
          'orderList',
          'evaluateUpload',
          'ordereValuate',
          'orderCancel',
          'orderDetail'
        ]),
      orderoff() {
        // 前端取消删除
        this.list.forEach((v, k) => {
          if (v.order_id === this.quxiaoid) {
            v.state = 7;
            // this.list.splice(k,1);
          }
        })
      },
      orderDetailApi(id) {
        this.orderList({ order_id: id }).then((res) => {
           if (res.code === 200) {
             let data = res.data;
             this.evaluate.orderData = data.list[0];
           } else if (res.code === 400) {
             this.$Message.warning(res.msg);
           } else if (res.code === -1) {
             this.$Message.warning(res.msg);
           } else if (res.code === -2) {
             this.$Message.warning(res.msg);
           }
        })
      },
      orderStatus(type) {
        // 切换类型的位置
        this.current = 1;
        this.type = type;
        this.lineLeft = this.checkedLeft[type];
        // 切换类型翻页
        this.orderListApi(this.type, this.current, 8);
      },
      changePage(idx) {
        this.current = idx;
        this.orderListApi(this.type, this.current, 8);
      },
      // 评价订单
      evaluateOrder(item) {
        this.orderDetailApi()
      },
      // 取消订单
      cancelOrder(id) {
        // 出现取消订单弹窗
        this.quxiaoid = id;
        this.isShowModel = true;
      },
      clickOrderDetails(item) {
        //订单类型，1-办公室，2会议室，3线下会谈，4在线会议，5问题，6预约服务，7预约活动
        var arr = [
          '',
          'office',
          'room',
          'talks',
          'meeting',
          'question',
          'service',
          'activity'
        ]
        this.$router.push({
          path: '/book/order/' + arr[item.type],
          query: {
            id: item.order_id,
            state: 'details',
            isPersonal: 'true'
          }
        })
      },
      orderListApi(type, page, pagesize) {
        /*@type  类型
        * @page 页数 // 不传默认为第一页
        * @pagesize
        * */
        var obj = {};
        if (!type) {
          obj.page = page;
          obj.pagesize = pagesize;
        } else {
          obj.type = type;
          obj.page = page;
          obj.pagesize = pagesize;
        }
        this.orderList(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            this.count = data.count;
            this.pagesize = data.pagesize;
            data.list.forEach((v) => {
              if (v.data.start || v.data.end) {
                v.data.start = _filterDateString(v.data.start * 1000);
                v.data.end = _filterDateString(v.data.end * 1000);
              }
            })
            this.list = data.list;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      uploadFile(file) {
        this.evaluate.files = file;
      },
      ordereValuateApi(obj) {
        this.ordereValuate(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            this.$Message.success(this.$t('lang.user.order.evaluateed'));
            //  切换为订单页面
            this.page = 'order';
            window.location.href = '/user/order'
            this.orderStatus('')
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      // 评价图片提交接口
      submit() {
        var obj = {}
        // 提交之前看下有没有打分 必须打分
        obj.score = this.evaluate.grade;
        obj.content = this.evaluate.textarea;
        obj.id = this.evaluate.orderData.order_id
        if (this.evaluate.files.length >= 1) {
          var uploadId = [];
          //  循环提交图片
          this.evaluate.files.forEach((v) => {
            var p = new FormData();
            p.append('file', v, 'file_' + Date.parse(new Date()) + '.jpg')
            this.evaluateUpload(p).then((res) => {
              if (res.code === 200) {
                let data = res.data;
                if (data.id) {
                  uploadId.push(res.data.id);
                  if (this.evaluate.files.length === uploadId.length) {
                    obj.pic = uploadId;
                    this.ordereValuateApi(obj);
                  }
                }
              } else if (res.code === 400) {
                this.$Message.warning(res.msg);
              } else if (res.code === -1) {
                this.$Message.warning(res.msg);
              } else if (res.code === -2) {
                this.$Message.warning(res.msg);
              }
            })
          })
        } else {
          // 直接提交
          this.ordereValuateApi(obj);
        }
      }
    }
  }
</script>
<style scoped lang='less' type="text/less">
  @import "../../assets/less/common";
  .order-pipe {
    &-header {
      position: relative;
      border-bottom: 1px solid #e5e5e5;
      padding: 0px 45px;
      &-header-tabel {
        padding-top: 15px;
        text-align: center;
        tr {
          th {
            font-size: 14px;
            font-weight: normal;
            border: 0;
            span {
              display: inline-block;
              width: 50px;
              line-height: 48px;
              cursor: pointer;
            }
            &.checked {
              color: #dd7116;
            }
          }
        }
      }
      &-line {
        position: absolute;
        bottom: -1px;
        left: 46px;
        height: 2px;
        width: 56px;
        background: #dd7116;
        transition: 0.2s linear;
      }
    }
    &-content {
      padding: 0px 45px;
      padding-top: 23px;
      table {
        border: 0;
        thead {
          tr {
            th {
              color: #999999;
              font-size: 12px;
              line-height: 30px;
              border: 0;
              border-bottom: 1px solid #e5e5e5;
              border-top: 1px solid #e5e5e5;
              background: #f6f6f6;
              &:first-child {
                border-left: 1px solid #e5e5e5;
              }
              &:last-child {
                border-right: 1px solid #e5e5e5;
              }
            }
          }
        }
        tbody {
          min-height: 100px;
          tr {
            td {
              height: 123px;
              border-bottom: 1px solid #e5e5e5;
            }
            td:nth-child(1) {
              text-align: left;
              p {
                font-size: 14px;
                line-height: 21px;
                font-weight: 700;
                color: #333333;
                &.tabel-title2 {
                  color: #333333;
                  font-weight: 700;
                }
              }
              .number {
                color: #999999;
                font-size: 12px;
                margin-bottom: 10px;
              }
            }
            td:nth-child(2) {
              p {
                font-size: 12px;
                color: #999999;
                line-height: 16px;
              }
            }
            td:nth-child(3) {
              p {
                font-size: 12px;
                color: #999999;
                line-height: 16px;
              }
            }
            td:nth-child(4) {
              font-size: 14px;
              color: #dd7116;
            }
            td:nth-child(5) {
              font-size: 14px;
              font-weight: 700;
              color: #333333;
            }
            td:nth-child(7) {
              color: #999999;
              font-size: 12px;
              div {
                height: 24px;
                width: 86px;
                display: inline-block;
                line-height: 24px;
                cursor: pointer;
                &.details-btn {
                  color: #ffffff;
                  background: #dd7116;
                  margin-bottom: 8px;
                }
              }
            }
            &:last-child {
              td {
                border-bottom: none !important;
              }
            }
          }
        }
      }
    }
  }
  .evaluate {
    &.informationconmmon {
      padding: 0px;
      padding-bottom: 98px;
      h3 {
        padding: 0 64px;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        .evaluate-header-left {
          float: left;
        }
        .evaluate-header-right {
          height: 100%;
          float: right;
          ul {
            height: 100%;
            overflow: hidden;
            li {
              height: 100%;
              float: left;
              &:nth-child(1) {
                margin-right: 80px;
              }
              span {
                font-size: 14px;
                color: #999999;
              }
              b {
                font-size: 14px;
                color: #333333;
                font-weight: normal;
              }
            }
          }
        }
      }
    }
    &-content {
      padding: 0 64px;
      padding-top: 45px;
      &-title {
        font-size: 18px;
        color: #333333;
        line-height: 1;
        margin-bottom: 32px;
      }
      &-class {
        margin-bottom: 20px;
        span {
          font-size: 14px;
          color: #999999;
        }
        b {
          font-weight: normal;
          font-size: 14px;
          color: #333333;
        }
      }
      &-number {
        margin-bottom: 20px;
        span {
          font-size: 14px;
          color: #999999;
        }
        b {
          color: #dd7116;
          font-size: 40px;
          font-weight: 500;
          i {
            font-size: 16px;
            font-style: normal;
          }
        }
        i {
          color: #dd7116;
          font-size: 14px;
          font-style: normal;
        }
      }
      &-slider {
        margin-bottom: 50px;
      }
      &-pinjia {
        margin-bottom: 25px;
        p {
          font-size: 14px;
          color: #999999;
          line-height: 1;
          margin-bottom: 14px;
        }
        &-input {
          textarea {
            outline: none;
            border-radius: 5px;
            padding-left: 24px;
            padding-top: 15px;
            width: 100%;
            height: 168px;
            background: #f7f7f7;
            border: 1px solid #dcdcdc;
            .input-placehoader(#c0c0c0, 14px);
          }
          margin-bottom: 25px;
        }
        &-keshutu {
          text-align: right;
          margin-bottom: 0px;
        }
        &-upload {
          position: relative;
          height: 60px;
          top: -28px;
          /*width: 42px;*/
          /*height: 42px;*/
          /*border: 1px dashed #999999;*/
          /*line-height: 42px;*/
          /*i {*/
          /*color: #999999;*/
          /*position: relative;*/
          /*left: 2px;*/
          /*font-size: 35px;*/
          /*text-align: center !important;*/
          /*}*/
        }
      }
    }
  }
</style>
