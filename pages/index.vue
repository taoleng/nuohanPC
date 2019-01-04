<!--suppress ALL -->
<template>
  <section
    ref="section"
    :style="{
      height: '100vh'
    }"
    class="index"
  >
    <ul
      :class="{
        'index-btnlist': true,
        'page1': lunbo.idx + 1 === 1,
        'page2': lunbo.idx + 1 === 2,
        'page3': lunbo.idx + 1 === 3,
        'page4': lunbo.idx + 1 === 4,
        'page5': lunbo.idx + 1 === 5,
      }"
    >
      <li
        v-for="(item, index) in btnList"
        :class="{
          checked:lunbo.idx === index
        }"
        :key="index"
        @click="whele(index)"
      />
    </ul>
    <div
      :style="{
        'top': lunbo.top + 'px'
      }"
      class="train"
    >
      <div class="index-item1">
        <div :style="{ 'background-image': 'url(' + homeData.first.bg + ')'}" class="index-item1-bg">
          <div class="index-item1-bg-masking">
            <div class="home-container">
              <div class="index-item1-bg-masking-container">
                <div class="index-item1-bg-masking-container-content">
                  <p class="index-item1-bg-masking-container-content-title">{{ homeData.first.title }}</p>
                  <p class="index-item1-bg-masking-container-content-text">{{ homeData.first.subtitle }}</p>
                  <a :href="homeData.first.links" target="_blank">
                    <more-btn/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index-item2">
        <div :style="{ 'background-image': 'url(' + homeData.second.bg + ')'}" class="index-item2-bg">
          <div class="index-item2-bg-masking">
            <div class="index-item2-bg-masking-content">
              <div class="index-item2-bg-masking-content-bottom">
                <div class="index-item2-bg-masking-content-bottom-left">
                  <h3>{{ homeData.second.subtitle }}</h3>
                  <p>{{ homeData.second.title }}</p>
                  <a :href="homeData.second.links" target="_blank">
                    <more-btn/>
                  </a>
                </div>
                <img :src="homeData.second.img">
                <div class="index-item2-bg-masking-content-bottom-right">
                  <p>
                    {{ homeData.second.intro }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index-item3">
        <div :style="{ 'background-image': 'url(' + homeData.third.bg + ')'}" class="index-item3-bg">
          <div class="index-item3-bg-masking flex-align-center">
            <div class="index-item3-bg-masking-content">
              <div class="index-item3-bg-masking-content-box2">
                <h3>{{ homeData.third.big_title }}</h3>
                <p>{{ homeData.third.title }}</p>
                <div class="c-logo">
                  <img src="~/assets/img/home/c.png">
                  <span/>
                  <p>{{ homeData.third.subtitle }}</p>
                </div>
              </div>
              <div class="index-item3-bg-masking-content-box4">
                <div :style="{ background: box === 'box1' ? 'rgba(250, 250, 250, 0.2)' : '' }"
                     class="index-item3-bg-masking-content-box4-childdiv
                index-item3-bg-masking-content-box4-first-child"
                     @click="clickAppointment('box1')"
                >
                  <img src="~/assets/img/home/city.png">
                  <p/>
                  <span>{{ homeData.third.middle.title }}</span>
                  <transition name="fade">
                    <template v-if="box === 'box1'">
                      <div class="box4-text">
                        <div class="box4-text-content">
                          {{ homeData.third.middle.intro }}
                        </div>
                        <a :href="homeData.third.middle.links" target="_blank">
                          <more-btn class="more-btn"/>
                        </a>
                      </div>
                    </template>
                  </transition>
                </div>
                <div
                  :style="{ background: box === 'box2' ? 'rgba(250, 250, 250, 0.3)' : '' }"
                  class="index-item3-bg-masking-content-box4-childdiv"
                  @click="clickAppointment('box2')"
                >
                  <img src="~/assets/img/home/drawing.png">
                  <p/>
                  <span>{{ homeData.third.right.title }}</span>
                  <transition name="fade">
                    <template v-if="box === 'box2'">
                      <div class="box4-text">
                        <div class="box4-text-content">
                          {{ homeData.third.right.intro }}
                        </div>
                        <a :href="homeData.third.right.links">
                          <more-btn class="more-btn"/>
                        </a>
                      </div>
                    </template>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index-item4">
        <div class="index-item4-bg">
          <div class="index-item4-bg-masking">
            <div class="home-container">
              <div class="index-item4-bg-masking-content flex-align-center">
                <div class="index-item4-bg-masking-content-left">
                  <p>{{ $t('lang.home.look') }}</p>
                  <div class="pull">
                    <pull-down :arr="countryArr"
                               :value="country"
                               class="pull-country"
                               @countryValue="countryValue"
                    />
                    <pull-down
                      :arr="cityArr"
                      :value="city"
                      class="pull-city"
                      @cityValue="cityValue"
                    />
                  </div>
                  <img v-if="continents === '1'" src="../assets/img/home/map/1.png" class="map">
                  <img v-else-if="continents === '2'" src="../assets/img/home/map/2.png" class="map">
                  <img v-else-if="continents === '3'" src="../assets/img/home/map/3.png" class="map">
                  <img v-else-if="continents === '4'" src="../assets/img/home/map/4.png" class="map">
                  <img v-else src="../assets/img/home/map/5.png" class="map">
                </div>
                <div class="index-item4-bg-masking-content-right">
                  <ul>
                    <li v-for="(item, index) in cityImgArr"
                        :key="index"
                        :style="{'background': 'url(' + '\'' + item.background + '\'' +')'}"
                        :class="{checked: item.city === city}"
                    >
                      <div>
                        <p>{{ item.country }}</p>
                        <p>{{ item.city }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="index-item5">
        <div class="index-item5-bg">
          <div class="index-item5-bg-masking">
            <div class="index-item5-bg-masking-top">
              <div class="index-item5-bg-masking-top-header">
                <p class="index-item5-bg-masking-top-header-text">
                  {{ homeData.fifth.slogan }}
                </p>
              </div>
              <ul class="index-item5-bg-masking-top-content">
                <li v-for="(item, index) in homeData.fifth.list" :key="index">
                  <p>
                    <i :class="item.icon" class="iconfont"></i>
                  </p>
                  <h3>{{ item.title }}</h3>
                  <ul v-html="item.intro">
                  </ul>
                </li>
              </ul>
            </div>
            <bottom/>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{
        'index-mouse-tishi': true,
        'page1': lunbo.idx + 1 === 1,
        'page2': lunbo.idx + 1 === 2,
        'page3': lunbo.idx + 1 === 3,
      }"
    >
      <template v-if="lunbo.idx === 0 || lunbo.idx === 2">
        <p/>
        <img src="~/assets/img/home/mouse.png">
      </template>
      <template v-else-if="lunbo.idx === 1">
        <p style="background: black"/>
        <img src="~/assets/img/home/mouse-black.png">
      </template>
      <div v-else/>
    </div>
  </section>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  import moreBtn from '../components/home-com/more-btn';
  import pullDown from '../components/common/pullDown/pull-down';
  import Ajax from '~/service';
  import {dedupe} from '~/assets/js/common';
  import bottom from '../components/common/bottom';
  import {authToken} from '../store/datakey'

  export default {
    components: {
      moreBtn,
      pullDown,
      bottom
    },
    data() {
      return {
        btnList: [
          {},
          {},
          {},
          {}
        ],
        // 适口高度
        windowHeight: 0,
        lunbo: {
          //初始 量
          idx: 0,
          //初始top
          top: 0,
          // 点击的位置
          clickY: 0,
          isClick: false,
          isTransitioning: false
        },
        homeData: {
          fifth: {},
          first: {
            bg: ''
          },
          fourth: [],
          second: {
            bg: ''
          },
          third: {
            bg: '',
            middle: {},
            right: {}
          }
        },
        // 用来匹配的数组
        screen: [],
        countryArr: [],
        cityArr: [],
        cityImgArr: [],
        country: '',
        city: '',
        // 州
        continents: '1',
        //  底部数据
        indexBottom: {},
        box: ''
      }
    },
    head(){
      return {
        title:this.$t('lang.title.home')
      }
    },
    watch: {
      country(val) {
        this.screen.forEach((v, k) => {
          if (v.country === val) {
            this.cityArr = v.arrCity;
            this.cityImgArr = v.arrImg.slice(0, 4);
            this.city = v.arrCity[0];
            // 州
            this.continents = v.continents;
          }
        })
      }
    },
    head () {
      return {
        title: '诺汉咨询'
      }
    },
    created() {
      //  调用地图接口
      this.home().then((res) => {
        if (res.code === 200) {
          let data = res.data;
          this.homeData = data;
          var arr = [];
          //  筛选出国家以及对应的州组成数组
          var arr1 = [];
          this.homeData.fourth.forEach((v, k) => {
            let obj = {}
            obj.continents = v.continents;
            obj.country = v.country;
            arr1.push(v.country);
            arr.push(obj);
          })
          arr.forEach((item, index) => {
            let arrCity = [];
            let arrImg = [];
            this.homeData.fourth.forEach((v, k) => {
              if (v.country === item.country) {
                arrCity.push(v.city)
                arrImg.push({
                  background: v.img,
                  city: v.city,
                  country: v.country
                })
              }
            })
            item.arrCity = arrCity;
            item.arrImg = arrImg;
          })
          this.screen = arr;
          // 传给第一个下拉框的数据
          var arr1 = dedupe(arr1);
          this.countryArr = arr1;
          this.screen.forEach((v, k) => {
            if (v.country === this.country) {
              this.cityArr = v.arrCity;
              this.cityImgArr = v.arrImg.slice(0, 4);
            }
          })
          var arr = [
            'icon-shouye--zhanlveguanli',
            'icon-xinaixincopy',
            'icon-caiwu',
            'icon-shouye--kuajingtouzi',
            'icon-icon-test',
            'icon-shouye--falvshiwu'
          ]
          this.homeData.fifth.list.forEach((v, index) => {
            v.icon = arr[index]
          })


          this.country = arr1[0];
          this.screen.forEach((v, k) => {
            if (v.country === arr1[0]) {
              this.cityArr = v.arrCity;
              this.cityImgArr = v.arrImg.slice(0, 4);
              this.city = v.arrCity[0];
              // 州
              this.continents = v.continents;
            }
          })
        } else {

        }
      })
    },
    mounted() {
      this.windowHeight = document.documentElement.clientHeight;
      var _this = this;
      window.onresize = function (e) {
        _this.windowHeight = document.documentElement.clientHeight;
        _this.lunbo.top = -_this.lunbo.idx * _this.windowHeight;
      }
      if(document.addEventListener){
        this.$refs.section.addEventListener('DOMMouseScroll',_this.onmouseWheel,false);
      }
      this.$refs.section.onmousewheel=document.onmousewheel=_this.onmouseWheel;
    },
    layout: 'home',
    methods: {
      ...mapMutations(['page']),
      ...mapActions(['home']),
      onmouseWheel(e) {
        let detail = e.wheelDelta || -e.detail
        if (!this.isTransitioning) {
          this.isTransitioning = true;
          setTimeout(() => {
            this.isTransitioning = false;
          }, 1000)
        } else {
          return;
        }
        if (detail < 0) {
          //  下滚 火车向上拉
          if (this.lunbo.idx === 4) {
            this.lunbo.idx = 4;
          } else {
            this.lunbo.idx++;
          }
        } else if (detail > 0) {
          // 上滚 火车向下拉
          if (this.lunbo.idx === 0) {
            this.lunbo.idx = 0;
          } else {
            this.lunbo.idx--;
          }
        }
        this.lunbo.top = -this.lunbo.idx * this.windowHeight;
        this.page(this.lunbo.idx);
      },
      whele(index){
        this.lunbo.idx = index;
        this.lunbo.top = -this.lunbo.idx * this.windowHeight;
        this.page(this.lunbo.idx);
      },
      countryValue(data) {
        //  得到国家然后传给
        this.country = data;
      },
      cityValue(data) {
        this.city = data;
      },
      clickAppointment(val) {
        this.box = val;
      }
    }
  }
</script>

<style lang='less' type="text/less">
  .fade-enter-active, .fade-leave-active {
    transition: display .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    display: none;
  }

  .index {
    position: relative;
    overflow: hidden;
    .train {
      position: absolute;
      width: 100%;
      top: 0px;
      transition: all 0.8s ease 0s;
      -webkit-transition:all 0.8s ease 0s;
      > div {
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .home-container {
      position: relative;
      box-sizing: content-box;
      display: flex;
      align-items: stretch;
      min-width: 1200px;
      width: 83.33333%;
      margin: 0 auto;
      padding-top: 120px;
    }
    &-btnlist {
      position: absolute;
      bottom: 50%;
      left: 8.33333%;
      z-index: 5;
      margin-bottom: -74px;
      transition: all 0.8s linear 0s;
      -webkit-transition: all 0.8s linear 0s;
      cursor: pointer;
      li {
        width: 10px;
        height: 10px;
        background: #f3cdae;
        border-radius: 50%;
        margin-bottom: 40px;
        &.checked {
          background: #dd7116;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    /*此处为首屏变动 小圆点的样式*/
    &-btnlist.page1 {
      bottom: 50%;
      li {
        background: #f3cdae;
        &.checked {
          background: #dd7116;
        }
      }
    }
    &-btnlist.page2 {
      bottom: 7.8125%;
      margin-bottom: 0px;
      li {
        background: #f3cdae;
        &.checked {
          background: #dd7116;
        }
      }
    }
    &-btnlist.page3 {
      bottom: 7.8125%;
      margin-bottom: 0px;
      li {
        background: #f3cdae;
        &.checked {
          background: #dd7116;
        }
      }
    }
    &-btnlist.page4 {
      bottom: 7.8125%;
      margin-bottom: 0px;
      li {
        background: #f3cdae;
        &.checked {
          background: #dd7116;
        }
      }
    }
    &-btnlist.page5 {
      display: none;
    }
    &-mouse-tishi {
      position: absolute;
      bottom: 50%;
      right: 8.33333%;
      z-index: 5;
      width: 15px;
      display: flex;
      margin-bottom: -102px;
      flex-wrap: wrap;
      justify-content: center;
      transition: bottom 0.8s linear 0s;
      p {
        height: 158px;
        width: 1px;
        background: #ffffff;
        margin-bottom: 23px;
      }
      img {
        width: 15px;
      }
    }
    &-mouse-tishi.page1 {
      bottom: 50%;
      margin-bottom: -102px;
    }
    &-mouse-tishi.page2 {
      bottom: 6.77%;
      margin-bottom: 0px;
    }
    &-mouse-tishi.page3 {
      bottom: 6.77%;
      margin-bottom: 0px;
    }
    &-item1 {
      &-bg {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: url("../assets/img/home/index_01.jpg") top center;
        background-size: 100% 100%;
        &-masking {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: stretch;
          &-container {
            position: relative;
            width: 100%;
            padding-top: 15%;
            &-content {
              /*width: 731px;*/
              margin: 0 auto;
              color: #ffffff;
              p {
                text-align: center;
              }
              &-title {
                font-size: 60px;
                line-height: 120px;
              }
              &-text {
                font-size: 16px;
                line-height: 60px;
                margin-bottom: 110px;
              }
              .more-btn {
                margin: 0 auto;
              }
            }
            &-bottom {
              position: absolute;
              bottom: 5%;
              width: 100%;
              ul {
                width: 133px;
                margin: 0 auto;
                overflow: hidden;
                li {
                  float: left;
                  margin-right: 28px;
                }
                li:last-child {
                  margin-right: 0px;
                }
              }
            }
          }
        }
      }
    }
    &-item2 {
      &-bg {
        position: relative;
        width: 100%;
        height: 100vh;
        background: url("../assets/img/home/index_02.jpg") top center;
        background-size: 100% 100%;
        &-masking {
          padding-left: 8.33333%;
          display: flex;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.5);
          min-width: 1200px;
          &-content {
            flex: 1;
            margin-bottom: 27px;
            .number {
              display: flex;
            }
            &-bottom {
              display: flex;
              &-left {
                flex: 36.3274;
                padding-top: 29px;
                overflow: hidden;
                h3 {
                  font-size: 24px;
                  font-weight: normal;
                  line-height: 71px;
                  color: #333333;
                }
                p {
                  color: #dd7116;
                  font-size: 85px;
                  line-height: 105px;
                  margin-bottom: 18px;
                  @media screen and (max-width: 1570px) {
                    /*font-size: 140px;*/
                  }
                  @media screen and (max-width: 1460px) {
                    /*font-size: 110px;*/
                  }
                  @media screen and (max-width: 1360px) {
                    /*font-size: 100px;*/
                  }
                  @media screen and (max-width: 1260px) {
                    /*font-size: 90px;*/
                  }
                }

              }
              img {
                flex: none;
                height: 255px;
              }
              &-right {
                flex: 37.8055;
                height: 255px;
                background: #dd7116;
                min-width: 356px;
                p {
                  color: #ffffff;
                  font-size: 16px;
                  line-height: 25px;
                  /*padding-top: 9.77%;*/
                  position: relative;
                  top: 50%;
                  -webkit-transform: translateY(-50%);
                  -moz-transform: translateY(-50%);
                  -ms-transform: translateY(-50%);
                  -o-transform: translateY(-50%);
                  transform: translateY(-50%);
                  padding-left: 9.17%;
                  padding-right: 11.57%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 8;
                  /* autoprefixer: off */
                  -webkit-box-orient: vertical;
                  /* autoprefixer: on */
                }
              }
            }
          }
        }
      }
    }
    &-item3 {
      &-bg {
        position: relative;
        width: 100%;
        height: 100vh;
        background: url("../assets/img/home/index_03.jpg") top center;
        background-size: 100% 100%;
        &-masking {
          overflow: hidden;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          &-content {
            display: flex;
            width: 100%;
            > div {
              min-height: 40px;
              clear: both;
            }
            &-box2 {
              padding-top: 22px;
              flex: 48.07;
              width: 380px;
              padding-left: 150px;
              h3 {
                font-weight: normal;
                font-size: 36px;
                color: #ffffff;
                line-height: 54px;
              }
              p {
                color: #ffffff;
                font-size: 22px;
                line-height: 42px;
              }
              div.c-logo {
                margin-top: 30px;
                white-space: nowrap;
                img {
                  display: inline-block;
                  vertical-align: middle;
                  display: inline-block;
                  width: 68px;
                }
                span {
                  display: inline-block;
                  vertical-align: middle;
                  display: inline-block;
                  height: 1px;
                  width: 15px;
                  background: #ffffff;
                }
                p {
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 72px;
                  line-height: 90px;
                  color: #ffffff;
                  width: 400px;
                  white-space: normal;
                  word-wrap: break-word;
                  max-height: 270px;
                  overflow: hidden;
                }
              }
            }
            &-box4 {
              flex: 51.9;
              display: flex;
              &-first-child {
                position: relative;
                &::after {
                  content: '';
                  display: block;
                  position: absolute;
                  left: 0;
                  top: -33.50339vh;
                  width: 1px;
                  height: 1000vh;
                  background: #ffffff;
                  opacity: 0.2;
                }
                &::before {
                  content: '';
                  display: block;
                  position: absolute;
                  right: 0;
                  top: -33.50339vh;
                  width: 1px;
                  height: 1000vh;
                  background: #ffffff;
                  opacity: 0.2;
                }
              }
              &-childdiv {
                position: relative;
                flex: 1;
                height: 320px;
                background: rgba(0, 0, 0, 0.5);
                padding-top: 50px;
                padding-left: 50px;
                transition: all 0.2s linear;
                &:first-child {
                  /*.more-btn {*/
                  /*position: absolute;*/
                  /*left: 50px;*/
                  /*bottom: -65px;*/
                  /*}*/
                }
                &:hover {
                  background: rgba(250, 250, 250, 0.1) !important;
                }
                img {
                  display: block;
                  margin-bottom: 40px;
                }
                p {
                  display: block;
                  width: 1px;
                  height: 18px;
                  background: #ffffff;
                }
                span {
                  font-size: 16px;
                  line-height: 30px;
                  margin-top: 20px;
                  color: #ffffff;
                  word-break:break-all;
                  display:-webkit-box;
                  -webkit-line-clamp:3;
                  overflow:hidden;
                 /* autoprefixer: off */
                  -webkit-box-orient: vertical;
                /* autoprefixer: on */
                }
                .box4-text {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  padding-left: 50px;
                  padding-right: 62px;
                  left: 0px;
                  bottom: -100%;
                  padding-top: 12%;
                  &-content {
                    background: transparent;
                    font-size: 14px;
                    color: #999999;
                    line-height: 23px;
                    margin-bottom: 27px;
                    overflow : hidden;
                    max-height:120px;
                    @media screen and (max-width: 1560px) {
                      line-height: 16px;
                      font-size: 12px;
                      max-height:80px;
                    }
                    display:-webkit-box;
                    -webkit-box-orient: vertical !important;
                    /*! autoprefixer: off */
                    -webkit-line-clamp: 5;
                    overflow: hidden;
                  }
                }
              }
            }
          }
        }
      }
    }
    &-item4 {
      &-bg {
        position: relative;
        width: 100%;
        height: 100vh;
        background: #ffffff;
        &-masking {
          display: flex;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          .home-container {
            padding-top: 0px;
          }
          &-content {
            display: flex;
            width: 100%;
            &-left {
              flex: 1;
              .number {
                margin-bottom: 36px;
              }
              p {
                width: 360px;
                font-size: 36px;
                line-height: 47px;
                color: #333333;
                margin-bottom: 38px;
              }
              @media screen and (max-width: 1600px) {
                p {
                  font-size: 28px;
                }
              }
              .pull {
                width: 100%;
                /*overflow: hidden;*/
                .pull-country {
                  float: left;
                  margin-right: 10px;
                }
                @media screen and (max-width: 1600px) {
                  .pull-country {
                    margin-bottom: 10px;
                    margin-right: 0px;
                  }
                }
                .pull-city {
                  float: left;
                }
              }
              @media screen and (max-width: 1600px) {
                .pull {
                  display: flex;
                  justify-content: center;
                  flex-wrap: wrap;
                }
              }
              img {
                margin-top: 83px;
              }
              @media screen and (max-width: 1600px) {
                img.map {
                  display: none;
                }
              }
            }
            &-right {
              flex: none;
              width: 925px;
              ul {
                overflow: hidden;
                height: 707px;
                li {
                  float: left;
                  position: relative;
                  height: 340px;
                  background: url("../assets/img/home/map/lundun.jpg");
                  background-size: auto 340px;
                  background-position-x: center;
                  background-repeat: no-repeat;
                  div {
                    position: absolute;
                    left: 25px;
                    top: 45px;
                    z-index: 2;
                    color: #ffffff;
                    :first-child {
                      font-size: 18px;
                      line-height: 30px;
                    }
                    :last-child {
                      font-size: 30px;
                      line-height: 43px;
                    }
                  }
                  &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    display: block;
                    width: 100%;
                    height: 340px;
                    background: #f16f0a;
                    opacity: 0.5;
                  }
                  &:hover::after {
                    display: none;
                  }
                  &.checked::after {
                    display: none;
                  }
                }
                li:nth-child(1) {
                  width: 287px;
                  margin-right: 27px;
                  margin-bottom: 27px;
                }
                li:nth-child(2) {
                  width: 532px;
                }
                li:nth-child(3) {
                  width: 610px;
                  margin-right: 32px;
                }
                li:nth-child(4) {
                  width: 205px;
                }
              }
            }
          }
        }
      }
    }
    &-item5 {
      &-bg {
        position: relative;
        width: 100%;
        height: 100vh;
        background: url("../assets/img/home/index_04.jpg") center top no-repeat;
        background-size: 100% 100%;
        &-masking {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          .bottom-item5-bg-masking-bottom {
            position: absolute;
            background: #202020;
            height: auto;
            padding-bottom: 10px;
            max-height:320px !important;
            &-content-icon {
              padding-top: 16px !important;
            }
          }
          &-top {
            width: 82.33333%;
            text-align: center;
            margin: 0 auto;
            padding-top: 13.6vh;
            &-header {
              width: 330px;
              &-text {
                font-size: 18px;
                width: 330px;
                height: 90px;
                line-height: 30px;
                color: #ffffff;
                text-align: left;
              }
              /*margin-bottom: 9.19vh;*/
              margin-bottom:50px;
            }
            &-content {
              width: 100%;
              overflow: hidden;
              text-align: left;
              > li {
                float: left;
                width: 16.66%;
                min-height: 30px;
                padding: 0 10px;
                color: #ffffff;
                /*word-break: break-all;*/
                word-wrap: break-word;
                p {
                  /*height: 54px;*/
                  line-height: 54px;
                  i {
                    font-size: 36px;
                    color: #ffffff;
                  }
                }
                h3 {
                  font-weight: 500;
                  line-height: 40px;
                  font-size: 30px;

                  margin-bottom: 24px;
                }
                .text {
                  font-size: 14px;
                  line-height: 24px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
