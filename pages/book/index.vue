<template>
  <div class="bookOline">
    <div class="nuohan-container">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <a :href="item.href">
            <div class="bookOline-top"><img :src="item.img"></div>
            <div class="bookOline-bottom">
              <div class="bookOline-bottom-title">
                {{ item.title }}
              </div>
              <div class="bookOline-bottom-content">
                <span>
                  {{ item.intro }}
                </span>
              </div>
              <a :to="item.href" class="bookOline-bottom-reserve">
                <span>{{ $t('lang.book.index.more') }}</span>
                <p/>
              </a>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import item1 from '~/assets/img/book/item1.jpg';
  import item2 from '~/assets/img/book/item2.jpg';
  import item3 from '~/assets/img/book/item3.jpg';
  import item4 from '~/assets/img/book/item4.jpg';
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        urlArr: [
          '/book/consult',
          '/book/field',
          '/book/appt/service',
          '/book/activity'
        ],
        list: [
        ]
      }
    },
    created() {
      this.bookHomeApi();
    },
    head(){
      return {
        title:this.$t('lang.title.book')
      }
    },
    methods: {
      ...mapActions(['bookHome']),
      bookHomeApi() {
        this.bookHome().then((res) => {
           if (res.code === 200) {
             let data = res.data;
             data.forEach((v, index) => {
               v.href = this.urlArr[index]
             })
             this.list = data;
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
    layout: 'layouts4'
  }
</script>

<style lang="less" type="text/less">
  .bookOline {
    padding-top: 120px;
    padding-bottom: 100px;
    background: #eeeeee url("../../assets/img/book/book-bg.jpg");
    ul {
      width: 100%;
      height: 855px;
      background: #ffffff;
      li {
        width: 25%;
        float: left;
        height: 855px;
        border-right: 1px solid #e9e9e9;
        &:hover {
          box-shadow: 0px 0px 50px 0px #ededed;
        }
        .bookOline-top {
          img {
            display: block;
            width: 100%;
            height: 495px;
          }
        }
        .bookOline-bottom {
          padding-top: 66px;
          padding-left: 20px;
          color: #333333;
          &-number {
            span {
              display: inline-block;
              vertical-align: middle;
              line-height: 27px;
              font-size: 14px;
              margin-right: 10px;
            }
            p {
              display: inline-block;
              vertical-align: middle;
              width: 28px;
              height: 1px;
              background: #333333;
            }
          }
          &-title {
            line-height: 45px;
            font-size: 30px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          &-content {
            span {
              font-size: 14px;
              line-height: 32px;
              display: -webkit-box;
              -webkit-box-orient: vertical !important;
              -webkit-line-clamp: 4;
              color: #999999;
              height: 130px;
              overflow: hidden;
              /*! autoprefixer: off */
            }
            width: 254px;
            height: 186px;
          }
          &-reserve {
            display: inline-block;
            color: #333333;
            font-size: 0px;
            span {
              display: inline-block;
              vertical-align: middle;
              font-size: 14px;
              margin-right: 20px;
            }
            p {
              position: relative;
              top: 1px;
              display: inline-block;
              width: 14px;
              height: 1px;
              background: #333333;
              vertical-align: middle;
              &::after {
                content: "";
                position: absolute;
                right: 0px;
                bottom: 3px;
                display: inline-block;
                width: 7px;
                height: 1px;
                background: #333333;
                transform: rotate(45deg);
              }
            }
          }
        }
      }
    }
  }
</style>
