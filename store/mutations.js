import { _filterDateString } from '~/assets/js/filter';
import {setCookie, getCookie, removeCookie} from '../assets/js/cookie'
import * as key from './datakey';
import { wechat, reply, orderCancel , personinfo } from './actions'
import { _filterUserInfo } from '~/assets/js/filter';
export function page(state, idx) {
  state.homePageIdx = idx
}
export function getsrc(state,imgsrc){
  state.src= imgsrc
}

export function mutationGetCookie(key, state, filed) {
  let info = getCookie(key);
  if (info) {
    state[filed] = info;
  }
  return info;
}
export function SET_WEB_TOKEN(state, webToken) {
  if (webToken) {
    setCookie(key.webToken, webToken,1);
    state.webToken = webToken;
  }
}
export function GET_WEB_TOKEN(state) {
  var tokenweb = mutationGetCookie(key.webToken,state, 'webToken');
  state.webToken = tokenweb;
}
// token
export function SET_TOKEN(state, token) {
  if (token) {
    setCookie(key.authToken, token,1);
    state.token = token;
  }
}
export function REMOVE_TOKEN(state, token) {
  removeCookie(key.authToken);
  state.userInfo = {};
}
export function GET_TOKEN(state) {
  mutationGetCookie(key.authToken, state, 'token');
}
// // lang
export function SET_LANG(state, lang) {
  if (lang) {
    setCookie(key.lang, lang,2);
    state.lang = lang;
  }
}
export function REMOVE_LANG(state, lang) {
  removeCookie(key.lang);
  state.lang = '';
}
export function setModelProtocol(state, bool){
  state.modelProtocol = bool;
}
export function setUserInfo(state, obj){
  state.userInfo = obj;
}
// 处理 订单详情 and 确认订单 的数据接口
export function setOrderData(state, obj){
  var _this = obj.this;
  var payState = [
    _this.$t('lang.compon.busin.arr[0]'),
    _this.$t('lang.compon.busin.arr[1]'),
    _this.$t('lang.compon.busin.arr[2]'),
    _this.$t('lang.compon.busin.arr[3]'),
    _this.$t('lang.compon.busin.arr[4]'),
    _this.$t('lang.compon.busin.arr[5]'),
    _this.$t('lang.compon.busin.arr[6]'),
    _this.$t('lang.compon.busin.arr[7]'),
  ];
  var hometype = ['', '独立办公室', '固定工位', '流动工位'];
  var roomtype = ['', '小型会议室', '中型会议室', '大型会议室'];
  var paytype = ['noPay', 'zhifubao', 'weixin', 'paypal','vip', 'youhuima'];
  var connectType = {
    'weixin': '微信',
    'skype': 'skype'
  };
  var langObj = {
    en: 'English',
    cn: '中文'
  }
  if (obj.lang) {
    var lang = langObj[obj.lang] || '--'
  }
  if (obj.connect) {
    var connect = {
      type: connectType[obj.connect.type],
      account: obj.connect.account
    }
  }
  var start = '--';
  var end = '--';
  if (obj.start && obj.end) {
    start = _filterDateString(obj.start*1000);
    end = _filterDateString(obj.end*1000);
  }
  if (obj.start_time && obj.end_time) {
    start = _filterDateString(obj.start_time*1000);
    end = _filterDateString(obj.end_time*1000);
  }
  var h="";
  if(obj.state==5){
    h =payState[4]
  }else{
    h =payState[obj.state]
  }
  var data = {
    office_type: obj.office_type,
    needtimes: obj.needtimes,
    activity: obj.activity,
    connect: obj.connect,// 沟通方式
    order_id: obj.order_id || '--', // 订单号
    homeType: hometype[obj.office_type] || '--', // 办公室类型
    roomType: roomtype[obj.size] + '(' + obj.people + ')' || '--', // 会议室类型
    address: obj.address || '--', // 地址
    place_title: obj.place_title || '--', // 会谈地址
    station: obj.station || '--', // 工位数
    times: obj.times || '--', //租赁时长
    total_price: obj.total_price || 0, //金额
    payType: paytype[obj.paytype] || '--', // 支付方式的字符床 ‘noPay’ 代表未支付
    manage: obj.manage, //  受理人
    message: obj.message, // 推送的消息
    isPay: obj.pay || '--', // 是否可以支付
    isQuxiao: obj.cancel || '--', // 是否可以取消
    payState: h || '--', // 订单状态 0待支付，1待审核，2已审核，3进行中，4待评价，5已完成
    numstate: obj.state, // 订单状态文字
    type_title: obj.type_title, //咨询类型
    place_map_link: obj.place_map_link || '/', // 导航链接
    question: obj.question || '--', // 问题描述文字,
    lang: lang, // 语言
    start: start,
    end: end,
    people: obj.people, // 人数
    cover: obj.cover, // 图片
    title: obj.title, // 活动标题
    content: obj.content, // 活动内容
    first_title: obj.first_title, // 服务项目内容
    second_title: obj.second_title, // 服务项目类别
    imgs: obj.imgs, // 图片列表
    information: obj.information,// 资料上传的要求
    informationList: obj.informationList// 资料上传的要求
  }
  state.orderData = data;
}
export function priceYouhui(state, obj) {
  state.orderData.total_price = obj.total_price;
}
// 微信 支付宝 支付
export function payPc(state, obj) {
  // obj 对象
  /*
  *@ _this VUE页面对象
  *@type 支付方式 1 微信 2 支付宝 3papel
  *@order_id 订单号
  * @fun 支付成功之后执行的回调函数
  * */
  var _this = obj._this;
  // 支付接口调用
  wechat(state,{ order_id: obj.order_id, type: obj.type }).then((res) => {
    if (res.code === 200) {
      state.payReplyTimer = null;
      var data = res.data;
      var obj2 = {
        isShow: true,
        type: obj.type,
        erweima: data && data.url,
        price: _this.orderData.total_price,
        order_id: obj.order_id
      }
      if (obj.type === 4) {
        //  会员卡不用监听直接判断
        _this.$router.push({
          path: '/book/payed',
          query: {
            id: _this.orderData.order_id,
            type: obj.payedType
          }
        })
        return;
      }
      if (obj.type === 3) {
        //papel支付 新开papel页面 当前页面弹出弹窗
        console.log(data.url)
        // window.location.href = data.url
        var a = document.createElement("a");
        a.target="_blank";
        a.href = data.url;
        a.click();

        //回到本页面
        var hiddenProperty = 'hidden' in document ? 'hidden' :
          'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' :
              null;
        var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        var onVisibilityChange = function(){
          if (!document[hiddenProperty]) {
            // console.log('')
          }else{
            _this.$emit('show-papel', true);
          }
        }
        document.addEventListener(visibilityChangeEvent, onVisibilityChange);

      } else {
        // 弹出支付页界面
        if(obj.payedType == 'room'){
          if(parseFloat(obj.orderPrice)){
            _this.$emit('childPay', obj2)
          }
        }else {
          _this.$emit('childPay', obj2)
        }
      }
      clearInterval(state.payReplyTimer);
      // 判断支付是否成功 定时器
      state.payReplyTimer = setInterval(() => {
        if (state.payReplyTimer === null) {
          return;
        }
        payPcIsEd(state, { order_id: obj2.order_id }, () => {
          if (obj.fun) {
            obj.fun();
          }
          if (obj.type === 3) {
            _this.$emit('show-papel', false)
          } else {
            _this.$emit('childPay', false)
          }
          _this.$router.push({
            path: '/book/payed',
            query: {
              id: _this.orderData.order_id,
              type: obj.payedType
            }
          })
          clearInterval(state.payReplyTimer)
          state.payReplyTimer = null;
        })
      },500)
    } else if(res.code === 400) {
      _this.$Message.warning(res.msg);
    }
  })
}
// 微信 支付宝 支付成功判断接口
export function payPcIsEd(state, obj, fun) {
 //obj.order_id 订单ID
  reply(state, obj).then((res) => {
    if (res.code === 200) {
      fun();
    }
  })
}
// 微信 支付宝 支付成功判断接口定时器state.payReplyTimer
export function setPayReplyTimer(state, obj) {
  if (!obj.str) {
    return;
  }
  if (obj.str === 'open') {
    clearInterval(state.payReplyTimer);
    state.payReplyTimer = setInterval(() => {
      // 执行传进来的函数
      obj.fun();
    }, 500)
  }
  // 关闭定时器
  if (obj.str === 'off') {
    clearInterval(state.payReplyTimer);
  }
}

/*
* 取消订单 此方法 可以用在 详情页 也可以用在确认订单页面
* 情况1 确认订单页面取消 跳 上一级
*情况2 订单详情取消 {
*   1： 如果上一级是登陆成功页 那么返回 对应的预约
*   2： 如果上一级是个人中心页 那么返回 个人中心
* }
* 参数 obj {
*   @order_id: 取消订单的ID
*   @str：跳转的服务页面
*   @_this: 对应的page页面组建对象
* }
* **/
export function orderCancelCommon(state, obj) {
  var _this = obj._this;
  var str = obj.str;
  var obj1 = {
    order_id: obj.order_id
  }
  orderCancel(state, obj1).then((res) => {
    if (res.code === 200) {
      _this.$Message.success(res.msg);
    //  取消成功
      if (_this.$route.query.user) {
        this.$router.push({
          path: '/user/order',
          query: {
            idx: 1
          }
        })
      } else if (!_this.$route.query.user) {
        if (str === 'activity') {
        //  活动跳列表
          //  跳转
          this.$router.push({
            path: '/book/activity'
          })
        } else {
          //  跳转
          this.$router.push({
            path: '/book/appt/' + str
          })
        }
      }
    } else if (res.code === 400) {
      _this.$Message.warning(res.msg);
    } else if (res.code === -1) {
      _this.$Message.warning(res.msg);
    } else if (res.code === -2) {
      _this.$Message.warning(res.msg);
    }
  })
}

// 用户信息 初始化
export function initUserInfo(state, obj) {
  personinfo(state).then((res) => {
     if (res.code === 200) {
       state.userInfo = _filterUserInfo(res.data);
     } else if (res.code === 400) {
       this.$Message.warning(res.msg);
     } else if (res.code === -1) {
       this.$Message.warning(res.msg);
     } else if (res.code === -2) {
       this.$Message.warning(res.msg);
     }
  })
}

export function setHint(state, obj) {
  state.hint = obj;
}
export function seTpayedType(state, obj) {
  state.payedType = obj.payedType;
}
export function seTprotocol(state, obj) {
  state.protocoldata = obj;
}
export function setLoalLang(state, obj) {
  localStorage.setItem('lang',obj.lang)
  state.lang = obj.lang;
}
export function getLoalLang(state, obj) {
  return localStorage.getItem('lang')
}
