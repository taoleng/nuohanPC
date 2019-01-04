import request from '~/service'
// action 处理
/*接口请求*/
  // 首页接口
export const home = async (store, params) => {
  return await request.get('/home', params)
}
 // 首页底部接口
export const config = async (store, params) => {
  return await request.get('/config', params)
}
// 注册协议 /register_protocols
export const registerProtocols = async (store, params) => {
  return await request.get('/register_protocols', params)
}
 // 登陆接口
export const login = async(store,params) => {
  return await request.post('/user/login', params)
}
//注册接口
export const register = async(store,params) => {
  return await request.post('/user/register', params)
}
// 获取验证码接口
export const phone = async(store,params) => {
  return await request.post('/user/sendcode', params)
}
// 检测id是否有效
export const checked = async(store,params) => {
  return await request.post('/user/register/checkRegId', params)
}
// 完成注册的接口
export const complete = async(store,params) => {
  return await request.post('/user/register/complete', params)
}
// 完善用户信息 /user/complete
export const userComplete = async(store,params) => {
  return await request.post('/user/complete', params)
}
// 改手机号接口
export const changemobile = async(store,params) => {
  return await request.post('/user/changemobile', params)
}
// 修改手机号获取验证码
export const changephoneCode = async(store,params) => {
  return await request.post('/user/changemobile/send', params)
}
//修改邮箱获取验证码
export const changemailCode = async(store,params) => {
  return await request.post('/user/changeemail/send', params)
}
//修改邮箱接口
export const changeEmail = async(store,params) => {
  return await request.post('/user/changeemail', params)
}
//修改密码
export const changepassword = async(store,params) => {
  return await request.post('/user/changepassword', params)
}
//退出登录
export const loginout = async(store,params) => {
  return await request.post('/user/logout', params)
}
// 获取用户信息接口
export const personinfo = async(store,params) => {
  return await request.post('/user/info', params)
}
//修改用户信息接口
export const modinfo = async(store,params) => {
  return await request.post('/user/save', params)
}
//修改头像接口
export const uploadAvatar = async(store,params) => {
  return await request.post('/user/avatar', params)
}
//找回密码
export const findpassword = async(store,params) => {
  return await request.post('/user/findpwd', params)
}
//找回密码发邮件
export const passwordEmail = async(store,params) => {
  return await request.post('/user/findpwd/send', params)
}
//设置密码
export const setpassword = async(store,params) => {
  return await request.post('/user/setpwd', params)
}
//新闻列表
export const getnews = async(store,params) => {
  return await request.post('/news/list', params)
}
export const getdetail = async(store,params) => {
  return await request.post('/news/detail/' + params.id, params)
}
/*--------------------------------------------------------------*/
//预定首页配置 /book/home 一级
export const bookHome = async(store,params) => {
  return await request.post('/book/home', params)
}
//商务会面配置 /book/advisory 二级
export const bookAdvisory = async(store,params) => {
  return await request.post('/book/advisory', params)
}
//预约场地配置 /book/space 二级
export const bookSpace = async(store,params) => {
  return await request.post('/book/space', params)
}
// 预约服务Banner /book/service
export const bookService = async(store,params) => {
  return await request.post('/book/service', params)
}
// 发起活动Banner /book/activity
export const bookActivity = async(store,params) => {
  return await request.post('/book/activity', params)
}
/*--------------------------办公室预约---------------------------*/
// 办公室预定地址
export const address = async(store,params) => {
  return await request.post('/office/address', params)
}
// 办公室预定 通过地址获取办公室列表
export const officeList = async(store,params) => {
  return await request.post('/office/list', params)
}
// 办公室折扣 /office/discount
export const discount = async(store,params) => {
  return await request.post('/office/discount', params)
}
// 办公室下单 /order/office
export const orderOffice = async(store,params) => {
  return await request.post('/order/office', params)
}
/*-------------------------线下会谈预约----------------------------*/
//线下会谈大类 /advisory/category
export const category = async(store,params) => {
  return await request.post('/advisory/category', params)
}
// 线下会谈小类 /advisory/list
export const smallCategory = async(store,params) => {
  return await request.post('/advisory/list', params)
}
// 线下会谈下单 /order/advisory
export const orderAdvisory = async(store,params) => {
  return await request.post('/order/advisory', params)
}

/*---------------------------会议室预约--------------------------*/
// 会议室地址 /meetingroom/address
export const meetingAddress= async(store,params) => {
  return await request.post('/meetingroom/address', params)
}
//通过地址获取会议室列表 /meetingroom/list
export const meetingList= async(store,params) => {
  return await request.post('/meetingroom/list', params)
}
// 会议室下单 /order/meetingroom
export const meetingOrder = async(store,params) => {
  return await request.post('/order/meetingroom', params)
}

/*---------------------------在线会议--------------------------*/
// 在线会议大类 /meeting/category
export const meetingCategory = async(store,params) => {
  return await request.post('/meeting/category', params)
}
// 在线会议小类 /meeting/list
export const meetingSmallCategory = async(store,params) => {
  return await request.post('/meeting/list', params)
}
//在线会议下单 /order/meeting
export const orderMeeting = async(store,params) => {
  return await request.post('/order/meeting', params)
}

/*---------------------------问题解惑--------------------------*/
//问题大类 /question/category
export const questionCategory = async(store,params) => {
  return await request.post('/question/category', params)
}
//问题小类 /question/list
export const questionList = async(store,params) => {
  return await request.post('/question/list', params)
}
//上传图片 /question/upload
export const questionUpload = async(store,params) => {
  return await request.post('/question/upload', params)
}
//问题下单 /order/question
export const orderQuestion= async(store,params) => {
  return await request.post('/order/question', params)
}
/*---------------------------预约服务--------------------------*/
//服务一级分类 /service/category
export const serviceCategory = async(store,params) => {
  return await request.post('/service/category', params)
}
//服务二级分类 /service/second
export const serviceSecond = async(store,params) => {
  return await request.post('/service/second', params)
}
//服务列表 /service/list
export const serviceList = async(store,params) => {
  return await request.post('/service/list', params)
}
//预约订单上传资料 /service/upload
export const serviceUpload = async(store,params) => {
  return await request.post('/service/upload', params)
}
//预约订单资料提交 /order/submit
export const orderSubmit = async(store,params) => {
  return await request.post('/order/information_list', params)
}
//预约服务下单 /order/service
export const orderService = async(store,params) => {
  return await request.post('/order/service', params)
}
/*---------------------------活动--------------------------*/
//活动列表 /activity/list
export const activityList = async(store,params) => {
  return await request.post('/activity/list', params)
}
//活动详情 /activity/detail
export const activityDetail = async(store,params) => {
  return await request.post('/activity/detail', params)
}
// 活动下单 /order/activity
export const orderActivity = async(store,params) => {
  return await request.post('/order/activity', params)
}
//发起活动 /activity/booking
export const activityBooking = async(store,params) => {
  return await request.post('/activity/booking', params)
}
//发起活动-发送验证码 /activity/booking/sendsms
export const actSendsms = async(store,params) => {
  return await request.post('/activity/booking/sendsms', params)
}
/*----------------------------订单详情 与 确认订单 公共接口---------------------------------*/
// 订单详情 /order/detail
export const orderDetail = async(store,params) => {
  return await request.post('/order/detail', params)
}
// 取消订单 /order/detail
export const orderCancel = async(store,params) => {
  return await request.post('/order/cancel', params)
}
//PC微信 支付宝支付 /pay/order
export const wechat = async(store,params) => {
  return await request.post('/pay/order', params)
}
// 支付请求是否成功 /pay/reply
export const reply = async(store,params) => {
  return await request.post('/pay/reply', params)
}
// 使用优惠码 /order/usecoupon
export const orderUsecoupon = async(store,params) => {
  return await request.post('/order/usecoupon', params)
}
/*---------------------------个人中心--------------------------*/
// 订单列表 /order/list
export const orderList = async(store,params) => {
  return await request.post('/order/list', params)
}
// 消息列表 /user/message
export const userMessage = async(store,params) => {
  return await request.post('/user/message', params)
}
// 消息已读 /order/readmsg
export const orderReadmsg = async(store,params) => {
  return await request.post('/order/readmsg', params)
}
//评价上传图片 /evaluate/upload
export const evaluateUpload = async(store,params) => {
  return await request.post('/evaluate/upload', params)
}
//订单评价 /order/evaluate
export const ordereValuate = async(store,params) => {
  return await request.post('/order/evaluate', params)
}
/*--------------------------会员购买--------------------------------*/
// 会员 /clients
export const clients = async(store,params) => {
  return await request.post('/clients', params)
}
// 会员购买 /order/member
export const orderMember = async(store,params) => {
  return await request.post('/order/member', params)
}
//会员微信支付监听成功 /pay/reply/member
export const payReplyMember = async(store,params) => {
  return await request.post('/pay/reply/member', params)
}
/*--------------------------提交成功--------------------------------*/
//支付成功消息 /pay/message
export const payMessage = async(store,params) => {
  return await request.post('/pay/message', params)
}
/*--------------------------联系我们--------------------------------*/
//联系我们 /contactus
export const contactus = async(store,params) => {
  return await request.post('/contactus', params)
}
//联系我们 /contactus
export const payProtocol = async(store,params) => {
  return await request.post('/pay_protocol', params).then((res) => {
    if (res.code === 200) {
      let data = res.data;
      store.commit('seTprotocol', data);
    } else if (res.code === 400) {
      this.$Message.warning(res.msg);
    } else if (res.code === -1) {
      this.$Message.warning(res.msg);
    } else if (res.code === -2) {
      this.$Message.warning(res.msg);
    }
  })
}

/*--------------------------协议--------------------------------*/
//服务协议 /protocol
export const protocol = async(store,params) => {
  return await request.post('/protocol', params).then((res) => {
    if (res.code === 200) {
      let data = res.data;
      store.commit('seTprotocol', data);
    } else if (res.code === 400) {
      this.$Message.warning(res.msg);
    } else if (res.code === -1) {
      this.$Message.warning(res.msg);
    } else if (res.code === -2) {
      this.$Message.warning(res.msg);
    }
  })
}
//支付 /pay_protocol
export const pay_protocol = async(store,params) => {
  return await request.post('/pay_protocol', params).then((res) => {
    if (res.code === 200) {
      let data = res.data;
      store.commit('seTprotocol', data);
    } else if (res.code === 400) {
      this.$Message.warning(res.msg);
    } else if (res.code === -1) {
      this.$Message.warning(res.msg);
    } else if (res.code === -2) {
      this.$Message.warning(res.msg);
    }
  })
}
// 隐私
export const register_Protocols = async(store,obj) => {
  return await request.post('/register_protocols').then((res) => {
    if (res.code === 200) {
      let type = obj.type;
      let data = res.data;
      if (type == 1) {
        data = data[0]
      } else if (type == 2) {
        data = data[1]
      }
      store.commit('seTprotocol', data);
    } else if (res.code === 400) {
      this.$Message.warning(res.msg);
    } else if (res.code === -1) {
      this.$Message.warning(res.msg);
    } else if (res.code === -2) {
      this.$Message.warning(res.msg);
    }
  })
}
