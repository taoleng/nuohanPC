<template>
  <div class="bottom-item5-bg-masking-bottom">
    <div class="bottom-item5-bg-masking-bottom-content">
      <div class="bottom-item5-bg-masking-bottom-content-icon">
        <ul>
          <!--<li><img src="~/assets/img/home/f.png"></li>-->
          <!--<li><img src="~/assets/img/home/weixin.png"></li>-->
          <!--<li><img src="~/assets/img/home/yu.png"></li>-->
          <li v-for="(item, index) in indexBottom.iconList" :key="index">
            <img :src="item.qrcode" alt="" class="erweima">
            <a :href="item.link" target="_blank">
              <img :src="item.icon">
            </a>
          </li>
        </ul>
      </div>
      <div class="bottom-item5-bg-masking-bottom-content-text">
        <div class="bottom-item5-bg-masking-bottom-content-text-left">
          <h3>{{ $t('lang.bottom.incoming') }}</h3>
          <p class="line"/>
          <ul>
            <li><span class="title">{{ $t('lang.bottom.advisoryTel') }}</span><span class="right">{{ indexBottom.advisory_tel }}</span></li>
            <li><span class="title">{{ $t('lang.bottom.bussTel') }}</span><span class="right">{{ indexBottom.buss_tel }}</span></li>
            <li><span class="title">{{ $t('lang.bottom.email') }}</span><span class="right">{{ indexBottom.email }}</span></li>
            <li><span class="title">{{ $t('lang.bottom.address') }}</span><span class="right">{{ indexBottom.address }}</span></li>
          </ul>
          <b>{{ indexBottom.icp }}</b>
        </div>
        <div class="bottom-item5-bg-masking-bottom-content-text-right">
          <ul v-for="(item, index) in indexBottom.business" :key="index">
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.intro }}</p>
            </div>
            <p v-if="index === 0" class="line"/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Ajax from '~/service';
  import {mapState, mapMutations, mapActions} from 'vuex';
  export default {
    data() {
      return {
        indexBottom: {}
      }
    },
    created() {
      this.config().then( (res) => {
        if (res.code === 200) {
          let data = res.data;
          this.indexBottom = data;
        } else {

        }
      })
    },
    methods: {
      ...mapActions(['config'])
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .bottom-item5-bg-masking-bottom {
    /*position: absolute;*/
    bottom: 0;
    width: 100%;
    height: 358px;
    border: 1px solid #4c4c4c;
    &-content {
      box-sizing: content-box;
      min-width: 1200px;
      width: 83.33333%;
      margin: 0 auto;
      &-icon {
        padding-top: 55px;
        ul {
          position: absolute;
          width: 200px;
          margin-bottom: -48px;
          li {
            position: relative;
            float: left;
            height: 30px;
            margin-right: 35px;
            .erweima {
              position: absolute;
              width: 100px;
              height: 100px;
              bottom: 40px;
              left: 50%;
              margin-left: -50px;
              display: none;
            }
            &:hover {
              .erweima {
                display: block;
              }
            }
            img {
              display: inline-block;
              height: 30px;
            }
            &:first-child {
              position: relative;
              top: -1px;
            }
          }
        }
      }
      &-text {
        overflow: hidden;
        width: 100%;
        /*padding-top: 20px;*/
        h3 {
          font-weight: normal;
          font-size: 36px;
          color: #ffffff;
          line-height: 1;
        }
        &-left {
          float: left;
          padding-top: 50px;
          h3 {
            margin-bottom: 24px;
          }
          .line {
            width: 12px;
            height: 2px;
            background: #ffffff;
            margin-bottom: 17px;
          }
          ul {
            margin-top: 15px;
            li {
              margin-bottom: 10px;
              height: 16px;
              span {
                line-height: 1;
              }
              .title {
                width: 112px;
                font-size: 14px;
                color: #999999;
                display: inline-block;
              }
              .right {
                font-size: 14px;
                color: #999999;
              }
            }
          }
          b {
            font-weight: normal;
            color: #999999;
            font-size: 12px;
          }
        }
        &-right {
          float: right;
          text-align: right;
          .line {
            display: inline-block;
            width: 20px;
            height: 1px;
            background: #ffffff;
            margin-top: 18px;
            margin-bottom: 12px;
            margin-right: 10px;
          }
          div {
            h3 {
              line-height: 54px;
              margin-bottom: 5px;
            }
            p {
              width: 440px;
              color: #999999;
              font-size: 12px;
              line-height: 24px;
            }
          }
        }
      }
    }
  }
</style>
