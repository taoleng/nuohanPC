var obj = {
  payedType: '',
  homePageIdx:0,
  src:'',
  lang: 'cn',
  userInfo: {
    vip_data: {}
  },
  protocoldata: {
    title:'',
    content: ''
  }, // 协议
  // 支付请求是否成功 /pay/reply
  payReplyTimer: null,
  // 协议书的提示框
  modelProtocol: false, // 默认false
  // 注册的提示框
  modelRegister : false, // 默认false
  // 订单详情 和 确认订单的数据
  orderData: {
    activity: {}, // 活动数据
    order_id: '--', // 订单号
    homeType: '--', // 办公室类型
    roomType: '--', //会议室类型
    address: '--', // 地址
    place_title: '--', // 会谈地址
    station: '--', // 工位数
    times: '--', //租赁时长
    total_price: '--', //金额
    payType: '--', // 支付方式的字符床 ‘noPay’ 代表未支付
    manage: null, //  受理人
    message: [], // 推送的消息
    isPay: '--', // 是否可以支付
    isQuxiao: '--', // 是否可以取消
    payState: '--', // 订单状态
    type_title: [], //咨询类型,
    place_map_link: '/', // 导航链接
    question: '--', // 问题描述文字
    lang: '--', // 语言
    people: '--', // 人数
    start: '--', //开始时间
    end: '--', // 结束时间
    connect: {
      type: '--',
      account: '--'
    },
    first_title: '--',
    second_title: '--',
    informationList: []
  },
  token:'',
  webToken: '',
  config: {}
}

export default obj;
