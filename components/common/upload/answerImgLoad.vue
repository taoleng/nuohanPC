<template>
  <div class="answer-img-load">
    <header>{{ $t('lang.compon.up.title1') }}</header>
    <div class="answer-img-load-content">
      <ul class="answer-img-load-content-list">
        <li v-for="(item, index) in uploadList" :key="index">
          <img :src="item.url" alt="图片加载失败" @click="viewImg(item.url)">
          <div class="mengban" @click="viewImg(item.url)">
            <i class="iconfont icon-quxiao" @click.stop="handleRemove(item)"/>
          </div>
        </li>
      </ul>
      <div class="answer-img-load-content-upload">
        <div class="answer-img-load-content-upload-look">
          <i class="iconfont icon-jia"></i>
        </div>
        <input ref="upload" type="file" accept="image/*" @change="handleBeforeUpload">
      </div>
    </div>
    <div v-if="bigImg"
         :style="'background-image: url(' + bigImg + ')'"
         class="big-img"
         @click="bigImg= ''">
    </div>
  </div>
</template>

<script>
  import bigImg from '../pop/big-img';
  import { photoCompress, convertBase64UrlToBlob } from '~/assets/js/fileCompress'
    export default {
      components: {
        bigImg
      },
      data() {
        return {
          uploadList: [],
          bigImg: ''
        }
      },
      methods: {
        uploadFile(file) {
          this.$emit('on-change', file);
        },
        handleRemove(file) {
          this.uploadList.splice(this.uploadList.indexOf(file), 1);
        },
        viewImg(url) {
          this.bigImg = url;
        },
        handleBeforeUpload() {
          let file = this.$refs.upload.files[0];
          if (!this.repeatJudge(file)) {
            return false;
          }
          if (file.size / 1024 > 1025) {
            photoCompress(file, {
              quality: 0.8
            }, function (base64Codes) {
              file = convertBase64UrlToBlob(base64Codes);
              _this.$emit('on-load', _this.uploadList);
            });
          } else {
            // 小于等于1M 原图上传
            this.$emit('on-load', this.uploadList);
          }
          let _this = this;
          // 创建一个 FileReader 对象
          let reader = new FileReader();
          // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
          // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
          // 读取文件作为 URL 可访问地址
          reader.readAsDataURL(file);
          reader.onloadend = function (e) {
            file.url = reader.result;
            _this.uploadList.push(file);
          }
        },
        repeatJudge(file) {
          let flag = true;
          (this.uploadList || []).forEach(item => {
            if (file.name === item.name) {
              this.$Message.warning(this.$t('lang.compon.up.tishi'));
              flag = false;
            }
            if (!flag) {
              return false;
            }
          });
          if (this.uploadList.length >= 5) {
            this.$Message.warning(this.$t('lang.compon.up.more'));
            return false;
          }
          return flag;
        }
      }
    }
</script>

<style lang='less' type="text/less">
  .answer-img-load {
    header {
      font-size: 14px;
      color: #d9d9d9;
      line-height: 1;
      margin-bottom: 12px;
    }
    &-content {
      overflow: hidden;
      &-list {
        float: left;
        overflow: hidden;
        li {
          position: relative;
          float: left;
          width: 160px;
          height: 108px;
          background: #ffffff;
          margin-right: 20px;
          text-align: center;
          overflow: hidden;
          line-height: 108px;
          img {
            display: inline-block;
            vertical-align: middle;
            width: 100%;
          }
          /*.mengban {*/
            /*position: absolute;*/
            /*display: none;*/
            /*content: '';*/
            /*left: 0px;*/
            /*top: 0px;*/
            /*right: 0px;*/
            /*bottom: 0px;*/
            /*background: rgba(0,0,0,0.3);*/
            /*i {*/
              /*position: absolute;*/
              /*right: 8px;*/
              /*top: -40px;*/
              /*color: #ffffff;*/
            /*}*/
          /*}*/
          &:hover {
            .mengban {
              display: inline-block;
            }
          }
        }
      }
      &-upload {
        position: relative;
        float: left;
        width: 160px;
        height: 108px;
        border: 1px dashed #999999;
        &-look {
          text-align: center;
          i {
            color: #666666;
            line-height: 108px;
            font-size: 38px;
          }
        }
        input {
          cursor: pointer;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 3;
          outline: none;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }
</style>
