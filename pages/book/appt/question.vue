<template>
  <!--问题解惑预定-->
  <!--如果state="xiugai" 此页将为修改页面-->
  <div class="answer">
    <div>
      <p class="list-header">
        <i class="iconfont icon-qiapianxingshi"/><b/><span>{{ $t('lang.book.appt.meeting.item1') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="bigProject" v-model="bigProjectId" :placeholder="$t('lang.book.appt.meeting.item1place')"/>
      </div>
    </div>
    <div class="margintop45">
      <p class="list-header">
        <i class="iconfont icon-muluxiangmu"/><b/><span>{{ $t('lang.book.appt.meeting.item2') }}</span>
      </p>
      <div class="select-ee-width570">
        <select-ee :list="smallProject" v-model="smallProjectId"
                   :placeholder="$t('lang.book.appt.meeting.item2place')"/>
      </div>
    </div>
    <div class="margintop45 answer-zixun">
      <p class="list-header">
        <b class="jianyigeshi" @click="isShowModel = true">{{ $t('lang.model.model1.title4') }}<em>?</em></b>
        <i class="iconfont icon-shuoming"/><b/><span>{{ $t('lang.book.appt.question.item1') }}</span>
      </p>
      <div class="select-ee-width570">
        <inputEe :placeholder="$t('lang.book.appt.question.item1place')" v-model="taskContent"/>
      </div>
    </div>
    <div class="answer-uploading margintop45">
      <answer-img-load @on-load="uploadFile"></answer-img-load>
    </div>
    <div class="answer-language margintop45">
      <p class="list-header">
        <i class="iconfont icon-yuyan"/><b/><span>{{ $t('lang.book.appt.question.item2') }}</span>
      </p>
      <ul class="multiple-choice">
        <li :class="{ checked: language === 'cn' }" @click="language = 'cn'">{{ $t('lang.book.appt.question.chinese')
          }}
        </li>
        <li :class="{ checked: language === 'en' }" @click="language = 'en'">English</li>
      </ul>
    </div>
    <div class="answer-language margintop45">
      <p class="list-header">
        <i class="iconfont icon-youxiang"/><b/><span>{{ $t('lang.book.appt.question.email') }}</span>
      </p>
      <div class="select-ee-width570">
        <inputEe1 :placeholder="''" v-model="emailSide"/>
      </div>
    </div>
    <div class="reserve-price margintop45">
      <p class="list-header">
        <i class="iconfont icon-jine"/><b/><span>{{ $t('lang.common.pricetatol') }}</span><em>￥{{ price }}</em>
      </p>
    </div>
    <div class="reserve-btn">
      <div>
        <!--/book/order/question-->
        <clause v-model="single"></clause>
        <div @click="submit">
          <btn-right :text="$t('lang.btn.submit')"/>
        </div>
      </div>
    </div>
    <model1 :text="$t('lang.model.model1.text4')" v-model="isShowModel" :title="$t('lang.model.model1.title4')"
            :btn-text="$t('lang.btn.off2')"/>
  </div>
</template>

<script>
  import btnRight from '~/components/common/button/btn-right';
  import selectEe from '~/components/common/pullDown/select-ee';
  import inputEe from '~/components/common/input/input-ee';
  import inputEe1 from '~/components/common/input/input-ee1';
  import datePicker from '~/components/common/timer/date-picker';
  import clause from '~/components/common/select/clause';
  import answerImgLoad from '~/components/common/upload/answerImgLoad';
  import model1 from '~/components/common/pop/model1';
  import config from '~/service/config';
  import {isEmail} from '~/assets/js/tool';
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default {
    components: {
      selectEe,
      btnRight,
      inputEe,
      inputEe1,
      datePicker,
      clause,
      answerImgLoad,
      model1
    },
    data() {
      return {
        single: false,
        isShowModel: false,
        bigProject: [], // 大项
        bigProjectId: '', // 大项ID
        smallProject: [], // 小项下拉
        smallProjectId: '', // 小项ID
        taskContent: '', // 上传文本内容,
        language: '', // 选择的语言
        emailSide: '', // 邮件地址
        price: 0, // 价格
        files: []
      }
    },
    head(){
      return {
        title:this.$t('lang.title.bookConQuestion')
      }
    },
    watch: {
      bigProjectId(id) {
        this.smallProjectId = '';
        this.questionListApi({id: Number(id)});
      },
      smallProjectId(id) {
        this.smallProject.forEach((v, k) => {
          if (v.value === id) {
            this.price = v.price;
          }
        })
      },
    },
    created() {
      this.categoryApi();
    },
    methods: {
      ...mapActions(['questionCategory', 'questionList', 'questionUpload', 'getphoto', 'orderQuestion']),
      submit() {
        if (!this.bigProjectId) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.item1place'));
          return;
        }
        if (!this.smallProjectId) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.item2place'));
          return;
        }
        if (!this.taskContent) {
          this.$Message.warning(this.$t('lang.book.appt.meeting.shuomingplace'));
          return;
        }
        if (!this.language) {
          this.$Message.warning(this.$t('lang.book.appt.question.item2'));
          return;
        }
        if (!isEmail(this.emailSide)) {
          this.$Message.warning(this.$t('lang.common.emailMsg'));
          return;
        }
        if (!this.single) {
          this.$Message.warning(this.$t('lang.model.model1.clause'));
          return;
        }
        this.upimglistApi();
      },
      categoryApi() {
        this.questionCategory().then((res) => {
          if (res.code === 200) {
            var data = res.data;
            var arr = [];
            data.forEach((v, k) => {
              arr.push({
                title: v.title,
                value: v.id + ''
              })
            })
            this.bigProject = arr;
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      questionListApi(obj) {
        this.questionList(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            var arr = [];
            data.forEach((v, k) => {
              arr.push({
                title: v.title,
                value: v.id + '',
                price: v.price
              })
            })
            this.smallProject = arr;
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
        this.files = file;
      },
      orderQuestionApi(obj) {
        this.orderQuestion(obj).then((res) => {
          if (res.code === 200) {
            let data = res.data;
            this.questionUpload()
            this.$router.push({
              path: '/book/order/question',
              query: {
                id: data.order_id
              }
            })
          } else if (res.code === 400) {
            this.$Message.warning(res.msg);
          } else if (res.code === -1) {
            this.$Message.warning(res.msg);
          } else if (res.code === -2) {
            this.$Message.warning(res.msg);
          }
        })
      },
      dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
      },
      upimglistApi() {
        // 循环提交图片
        let obj = {
          id: this.smallProjectId,
          question: this.taskContent,
          lang: this.language,
          email: this.emailSide,
        }
        let uploadId = [];
        if (this.files.length >= 1) {
          this.files.forEach((v, k) => {
            var p = new FormData();
            p.append('file', v, 'file_' + Date.parse(new Date()) + '.jpg')
            this.questionUpload(p).then((res) => {
              if (res.code === 200) {
                if (res.data.id) {
                  uploadId.push(res.data.id);
                  if (this.files.length === uploadId.length) {
                    obj.imgs = uploadId;
                    this.orderQuestionApi(obj);
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
          this.orderQuestionApi(obj);
        }
      }
    }
  }
</script>

<style scoped lang='less' type="text/less">
  .answer {
    .answer-list-header {
      line-height: 1;
      color: #ffffff;
      margin-bottom: 20px;
    }
    &-uploading {
      overflow: hidden;
      &-text {
        line-height: 1;
        color: #d9d9d9;
        font-size: 14px;
        margin-bottom: 10px;
      }
      &-vessel {
        overflow: hidden;
        float: left;
        margin-right: 5px;
        li {
          float: right;
          img {
            display: block;
            height: 130px;
          }
        }
      }
      .up-img {
        float: left;
      }
    }
    &-zixun {
      .list-header {
        position: relative;
        .jianyigeshi {
          cursor: pointer;
          width: 126px;
          height: 38px;
          display: inline-block;
          font-weight: normal;
          position: absolute;
          right: -357px;
          margin-left: 0px;
          margin-right: 0px;
          background: transparent;
          padding: 0px 18px;
          line-height: 34px;
          font-size: 14px;
          em {
            margin-left: 10px;
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            color: #ffffff;
            font-style: normal;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
  }
</style>
