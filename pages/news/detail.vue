<template>
  <div class="detail">
    <!-- 新闻详情 -->
    <div class="newsDetail">
      <!-- 头部 -->
      <div class="detailTop">
        <h6>{{ content.category.title_en || '--' }}</h6>
        <ul>
          <li>{{ content.category.title || '--' }}</li>
          <li @click="prevPage"><a>{{ $t('lang.news.prevPage') }}</a></li>
        </ul>
      </div>
      <!-- 新闻详情的内容部分 -->
      <div class="detaiContainer">
        <div class="detaiContainer-title">
          <h2>{{ content.title || '--' }}</h2>
          <div class="newsfenxiang">
            <span class="newsfenxiang-text">{{ $t('lang.news.share') }}</span>
            <div class="bdsharebuttonbox">
              <a href="#" class="bds_more" data-cmd="more"></a>
              <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
              <a href="#" class="bds_fbook" data-cmd="fbook" title="分享到Facebook"></a>
              <a href="#" class="bds_linkedin" data-cmd="linkedin" title="分享到linkedin"></a>
            </div>
          </div>
        </div>
        <span>{{ content.create_time || '--' }}</span>
        <div class="detailList">
          <div class="content" v-html="content.content"></div>
        </div>
      </div>
      <!-- 新闻详情的翻页部分 -->
      <div class="detailFooter">
        <ul>
          <li v-if="content.prev" class="li-prev"><a :href="'/news/detail?id=' + content.prev.id">{{ $t('lang.news.prev') }}{{ content.prev.title }}</a></li>
          <li v-if="content.next" class="li-next"><a :href="'/news/detail?id=' + content.next.id">{{ $t('lang.news.next') }}{{ content.next.title }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  export default {
    data() {
      return{
        content: {
          category: {

          },
          prev: null,
          next: null
        }
      }
    },
    head(){
      return {
        title:this.$t('lang.title.news')
      }
    },
    created() {
      // $('#share-1').share();
      this.getDetail();
    },
    head () {
      return {
        title: '诺汉咨询-新闻详情'
      }
    },
    mounted() {

    },
    methods:{
      ...mapActions(['getdetail']),
      fenxiang() {
      },
      weixin() {
      },
      getDetail(){
        var id = this.$route.query.id;
        this.getdetail({'id': id}).then((res)=>{
          if(res.code == 200){
            var data = res.data;
            this.content = data
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      prevPage() {
        this.$router.go(-1);
      }
    }

  }
</script>
<style lang="less" type="text/less">
  .newsDetail{
    .content{
      p{
        text-indent: 2em!important;
      }
      p,span{
        font-size: 16px!important;
        line-height: 2!important;
        margin-bottom: 0!important;
        font-weight: normal!important;
        font-style: normal!important;
      }
      span{
        text-indent: 0em!important;
      }
    }
  }
  .detail {
    min-height: 500px;
    .newsDetail {
      width: 1200px;
      > .detailTop {
        width: 100%;
        margin-bottom: 16px;
        margin-top: 94px;
        > h6 {
          color: #ababab;
          font-size: 18px;
          font-weight: normal;
        }
        > ul {
          width: 100%;
          margin-top: 10px;
          margin-bottom: 45px;
          /*overflow: hidden;*/
          > li {
            color: #333;
            font-size: 18px;
            &:first-child {
              float: left;
            }
            &:last-child a {
              color:#dd7116;
              float: right;
            }
          }
        }
      }
      > .detaiContainer {
        width: 100%;
        margin-top: 30px;
        border-top: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        .detaiContainer-title {
          overflow: hidden;
          margin-top: 32px;
          h2 {
            float: left;
            font-size: 36px;
            color:#333;
          }
          .newsfenxiang {
            overflow: hidden;
            float: right;
            &-text {
              line-height: 44px;
              vertical-align: middle;
              display: inline-block;
              font-size: 18px;
              color: #333333 !important;
              margin: 0px;
              margin-right: 12px;
            }
            div {
              vertical-align: middle;
              display: inline-block;
              .bdsharebuttonbox {
                a {
                  margin-right: 20px;
                }
              }
            }
          }
        }
        span{
          margin-bottom: 20px;
          display: inline-block;
          color: #999999;
        }
        .detailList {
          padding-top: 35px;
          padding-bottom: 35px;
          width: 100%;
          img {
            display: block;
            width: 100%;
          }
          p {
            margin-bottom: 34px;
            font-size: 14px;
            color: #999999;
            text-indent: 2em;
            letter-spacing: 1px;
            &:nth-child(4) {
              text-indent: 0em;
            }
          }
          span{
            color:#999999;
          }
        }
      }
      .detailFooter {
        width: 100%;
        ul {
          width: 100%;
          margin-bottom: 88px;
          overflow: hidden;
          > li {
            margin-top: 25px;
            width:200px;
            overflow:hidden;
            text-overflow:ellipsis;
            -o-text-overflow:ellipsis;
            -webkit-text-overflow:ellipsis;
            -moz-text-overflow:ellipsis;
            white-space:nowrap;
            >a{
              color:  #a7a7a7;
              font-size: 14px;
              &:hover {
                color: #dd7116;
              }
            }
            &.li-prev {
              float: left;
            }
            &.li-next {
              float: right;
            }
          }
        }
      }
    }
  }
</style>


