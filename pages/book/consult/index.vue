<template>
  <div :style = "{
          'background-image': 'url(' + imageUrl + ')'
        }"
       class="consult appointmentlist">
    <div class="nuohan-container">
      <div
        v-for="(item, index) in list"
        v-if="idx === index"
        :key="index"
      >
        <div class="appointmentlist-title">
          <h3>
            {{ item.title }}
          </h3>
        </div>
        <div class="appointmentlist-content">
          <p>{{ item.intro }}</p>
        </div>
        <a :href="item.to" class="appointmentlist-url">
          <span>{{ $t('lang.btn.reserve') }}</span>
          <p/>
        </a>
      </div>
      <div class="appointmentlist-btn">
        <ul class="appointmentlist-btn-ul">
          <li v-for="(item, index) in list"
              :key="index"
              :class="{'checked': idx == index }"
              class="hoverblack03"
              @click="select(index)"
          >
            <b>{{ item.btn_txt }}</b>
            <p>
              <i/>
              <i/>
              <i/>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        urlArr: [
          '/book/appt/talks',
          '/book/appt/meeting',
          '/book/appt/question'
        ],
        list: [],
        idx: 0,
        imageUrl: ''
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookCon')
      }
    },
    watch: {
      idx(idx) {
        this.imageUrl = this.list[idx].bg;
      }
    },
    head () {
      return {
        title: this.$t('lang.title.bookCon'),
      }
    },
    layout: 'layouts1',
    created() {
      this.bookAdvisoryApi();
    },
    methods: {
      ...mapActions(['bookAdvisory']),
      select(idx) {
        this.idx = idx;
      },
      bookAdvisoryApi() {
        this.bookAdvisory().then((res) => {
          if (res.code === 200) {
            let data = res.data;
            data.forEach((v, k) => {
              v.to = this.urlArr[k];
            });
            this.list = data;
            this.imageUrl = this.list[0].bg;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      }
    }
  }
</script>

<style lang='less' type="text/less">
  .consult {
    background: rgba(0,0,0,0.5) center top no-repeat;
  }
</style>
