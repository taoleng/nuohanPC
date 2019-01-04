<template>
  <div :style="{ 'background-image': data.bgimg ? 'url(' + data.bgimg + ')' : '' }"
       class="callme">
    <div class="nuohan-container">
      <div class="callme-title">
        <h3>{{ data.title }}</h3>
        <p>{{ data.subtitle }}</p>
        <b/>
      </div>
      <div class="callme-list">
        <ul>
          <li v-for="(item, index) in data.block" :key="index">
            <div class="callme-list-left">{{ item.title }}</div>
            <div class="callme-list-right">
              <p>{{ item.email }}</p>
              <p>{{ item.mobile }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="callme-saoma">
        <img :src="data.qrcode">
        <p>{{ $t('lang.contact.learnMore') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
    export default {
      layout: 'layouts2',
      data() {
        return {
          data: {

          }
        }
      },

      head(){
        return {
          title:this.$t('lang.title.contactus')
        }
      },
      created() {
        this.contactus().then((res) => {
           if (res.code === 200) {
             let data = res.data;
             this.data = data;
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
        ...mapActions(['contactus'])
      }
    }
</script>

<style scoped lang='less' type="text/less">
  .callme {
    background: black top center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 937px;
    padding-top: 225px;
    &-title {
      color: #ffffff;
      h3 {
        font-weight: normal;
        font-size: 48px;
        line-height: 58px;
        text-indent: -4px;
      }
      p {
        font-size: 24px;
        line-height: 50px;
      }
      b {
        display: block;
        width: 16px;
        height: 1px;
        font-weight: normal;
        background: #ffffff;
        margin-top: 10px;
      }
    }
    &-list {
      margin-top: 105px;
      margin-bottom: 52px;
      ul {
        overflow: hidden;
        li {
          float: left;
          width: 320px;
          margin-right: 110px;
          border-bottom: 1px solid rgba(250,250,250,0.2);
          overflow: hidden;
          &:last-child {
            margin-right: 0px;
          }
          .callme-list-left {
            float: left;
            line-height: 1;
            color: #ffffff;
            font-size: 18px;
            margin-right: 28px;
          }
          .callme-list-right {
            float: left;
            color: #ffffff;
            line-height: 1;
            :first-child {
              padding-top: 2px;
              padding-bottom: 5px;
              font-size: 14px;
            }
            :last-child {
              padding-top: 10px;
              padding-bottom: 24px;
              font-size: 14px;
            }
          }
        }
      }
    }
    &-saoma {
      padding-bottom: 200px;
      img {
        display: block;
      }
      p {
        color: rgba(250,250,250,0.2);
        font-size: 14px;
        line-height: 1;
        margin-top: 15px;
      }
    }
  }
</style>
