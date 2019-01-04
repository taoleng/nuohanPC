<template>
  <div class="news">
    <!-- 新闻咨询部分 -->
    <div v-if="isShowNew" class="news-consult news-common">
      <!-- 头部 -->
      <div class="news-common-header">
        <h3>{{ news }}</h3>
        <p>{{ newsName }}</p>
      </div>
      <!--新闻列表部分 -->
      <ul class="news-common-container">
        <li
          v-for="(item, index) in newsList" :key="index">
          <a :href="'/news/detail?id=' + item.id">
            <img :src="item.cover">
            <div>
              <span>{{ item.create_time }}</span>
              <h5>{{ item.title }}</h5>
              <p>{{ item.intro }}</p>
            </div>
          </a>
        </li>
      </ul>
      <!-- 查看更多按钮 -->
      <div v-if="newsHasmore" class="news-common-morebtn hoverblack03" @click="lookMore(newsCid)">{{ $t('lang.btn.lookmore') }}</div>
    </div>
    <!-- 相关政策部分 -->
    <div v-if="isShowPolicy" class="news-policy news-common">
      <!-- 头部 -->
      <div class="news-common-header">
        <h3>{{ policyName }}</h3>
        <p>{{ policy }}</p>
      </div>
      <!-- 相关政策列表 -->
      <ul class="news-common-container">
        <li
          v-for="(item, index) in newsp" :key="index">
          <a :href="'/news/detail?id=' + item.id">
            <img :src="item.cover"/>
            <div>
              <span>{{ item.create_time }}</span>
              <h5>{{ item.title }}</h5>
              <p>{{ item.intro }}</p>
            </div>
          </a>
        </li>
      </ul>
      <!-- 查看更多按钮 -->
      <div v-if="policyHasmore" class="news-common-morebtn hoverblack03" @click="lookMore(policyCid)">{{ $t('lang.btn.lookmore') }}</div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapMutations, mapActions} from 'vuex';

  export default {
    data() {
      return {
        data: [],
        news: '',
        newsName: '',
        policy: '',
        policyName: '',
        newsList: [],
        newsp: [],
        newsCid: '',
        policyCid: '',
        newsHasmore: false,
        policyHasmore: false,
        newsIdx: 1,
        policyIdx: 1,
        isShowPolicy: true,
        isShowNew: true
      }
    },
    head(){
      return {
        title:this.$t('lang.title.news')
      }
    },
    created() {
      this.getlist();
    },
    head () {
      return {
        title: '诺汉咨询-新闻首页'
      }
    },
    methods: {
      ...mapActions(['getnews']),
      // 首次请求
      getlist() {
        this.getnews().then((res) => {
          if (res.code == 200) {
            let data = res.data;
            // 新闻
            this.newsName = data[0].catname;
            this.news = data[0].catname_en;
            this.newsList = data[0].list;
            this.newsCid = data[0].cid;
            this.newsHasmore = data[0].hasmore;
            // 政策
            this.policy = data[1].catname;
            this.policyName = data[1].catname_en;
            this.newsp = data[1].list;
            this.policyCid = data[1].cid;
            this.policyHasmore = data[1].hasmore;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      // 翻页
      // pageTurn(obj) {
      //   this.getnews(obj).then((res) => {
      //     if (res.code == 200) {
      //       let data = res.data;
      //       if (obj.cid === 1) {
      //         this.newsHasmore = data.hasmore;
      //         data.list.forEach(v => {
      //           this.newsList.push(v)
      //         })
      //       } else if (obj.cid === 2) {
      //         this.policyHasmore = data.hasmore;
      //         data.list.forEach(v => {
      //           this.newsp.push(v)
      //         })
      //       }
      //     } else if (res.code === 400) {
      //       this.$Message.warning(res.msg);
      //     } else if (res.code === -1) {
      //       this.$Message.warning(res.msg);
      //     } else if (res.code === -2) {
      //       this.$Message.warning(res.msg);
      //     }
      //   })
      // },
      lookMore(cid) {
        this.$router.push({
          path: '/news/list',
          query: {
            cid: cid
          }
        })
      }
    },
  }
</script>
<style lang="less" type="text/less">
  .news {
    padding-top: 38px;
    min-height: 500px;
    /*咨询*/
    &-consult {

    }
    /*政策*/
    &-policy {

    }
  }
</style>

