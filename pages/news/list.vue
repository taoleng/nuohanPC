<template>
  <!--新闻列表页面-->
  <div class="news-list">
    <div class="news-list-list news-common">
      <!-- 头部 -->
      <div class="news-common-header">
        <h3>{{ category.title_en }}</h3>
        <p>{{ category.title }}</p>
      </div>
      <!--新闻列表部分 -->
      <ul class="news-common-container">
        <li
          v-for="(item, index) in list" :key="index">
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
      <div class="news-list-list-page">
        <nuohan-page :count="page.count" :pagesize="page.pagesize" @on-change="changePage"></nuohan-page>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex';
  import nuohanPage from '~/components/common/page/nuohan-page';
  export default {
    components: {
      nuohanPage
    },
    data() {
      return {
        category: {},
        list: [],
        page: {
          pagesize: 8,
          current: 1,
          count: 0
        }
      }
    },

    head(){
      return {
        title:this.$t('lang.title.news')
      }
    },
    created() {
      var obj = {
        pagesize: 16,
        page: 1,
        cid: this.$route.query.cid
      }
      this.getlist(obj);
    },
    methods: {
      ...mapActions(['getnews']),
      getlist(obj) {
        this.getnews(obj).then((res) => {
          if (res.code == 200) {
            let data = res.data;
            this.category = data.category;
            this.list = data.list;
            this.page.pagesize = 16;
            // 当前页数
            this.page.count = data.count
            // this.page.current = 8;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      changePage(val) {
        window.scrollTo(0,0);
        var obj = {
          pagesize: 16,
          page: val,
          cid: this.$route.query.cid
        }
        this.page.current = val;
        this.getlist(obj);
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .news-list {
    &-list {
      &-page {

      }
    }
  }
</style>
