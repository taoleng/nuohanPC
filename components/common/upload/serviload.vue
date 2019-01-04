<template>
  <!--评论上传-->
  <div>
    <div class="evaluate-img-load">
      <!--这俩边会有-->
      <ul class="evaluate-img-load-imgs">
        <li v-for="(item, index) in uploadList" :style="{ 'background-image': 'url(' + item.url + ')' }" :key="index">
          <div class="mengban" @click="viewImg(item.url)">
            <i class="iconfont icon-quxiao" @click.stop="handleRemove(item)"/>
          </div>
        </li>
      </ul>
      <div class="evaluate-img-load-upload">
        <i class="iconfont icon-tubiaozhizuo-1"></i>
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
  import { photoCompress, convertBase64UrlToBlob } from '~/assets/js/fileCompress'
  export default {
    components: {
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
        this.$emit('on-load', this.uploadList);
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

<style scoped lang='less' type="text/less">
  .evaluate-img-load {
    overflow: hidden;
    height: 60px;
    &-upload {
      float: left;
      position: relative;
      width: 60px;
      height: 60px;
      border: 1px dashed #999999;
      input {
        cursor: pointer;
        display: inline-block;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      i {
        position: absolute;
        top: -2px;
        left: 8px;
        color: #999999;
        font-size: 40px;
        text-align: center !important;
      }
    }
    &-imgs {
      float: left;
      overflow: hidden;
      li {
        position: relative;
        float: left;
        height: 60px;
        width: 60px;
        background: white;
        background-size: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        margin-right: 12px;
        &:hover {
          .mengban {
            display: inline-block;
            i {
              cursor: pointer;
              position: absolute;
              right: 0px;
              top: 0px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
</style>

