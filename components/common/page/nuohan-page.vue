<template>
  <div v-if="count" class="nuohan-page">
    <Page
      :prev-text="$t('lang.compon.page.prev')"
      :next-text="$t('lang.compon.page.next')"
      :current="current"
      :total="count"
      :page-size="pagesize"
      @on-change="changepage"
    />
  </div>
</template>

<script>
  export default {
    props: {
      // 数据总数
      count: {
        type: Number,
        default: 0
      },
      // 每页的数据条数
      pagesize: {
        type: Number,
        default: 8
      },
      // 当前页数
      current: {
        type: Number,
        default: 1
      }
    },
    methods: {
      changepage(val) {
        this.$emit('on-change', val);
      }
    }
  }
</script>

<style lang='less' type="text/less">
  .nuohan-page {
    text-align: center;
    .ivu-page {
      display: inline-block;
      li {
        height: 24px;
        line-height: 22px;
        border: 1px solid #dcdcdc;
        border-radius: 0px;
        a {
          color: #999999;
          margin: 0;
        }
      }
      .ivu-page-prev {
        width: 75px;
        margin-right: 18px;
        &.ivu-page-disabled {
          background: #d2d2d2;
          a {
            color: #ffffff;
          }
        }
      }
      .ivu-page-item {
        width: 24px;
        min-width: 24px;
        &.ivu-page-item-active {
          background: #dd7116;
          border-color: #dd7116;
          a {
            color: #ffffff;
          }
        }
        &:hover {
          border-color: #dd7116;
        }
      }
      .ivu-page-next {
        width: 75px;
        margin-left: 18px;
        &.ivu-page-disabled {
          background: #d2d2d2;
          a {
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
