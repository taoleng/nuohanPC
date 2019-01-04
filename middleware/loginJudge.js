import { personinfo } from '../store/actions'
import { getLoalLang } from '../store/mutations'
import { authToken, lang, webToken } from '../store/datakey'
import { _filterUserInfo } from '../assets/js/filter';
import store from '../store/state';
function getcookiesInServer(req) {
  let service_cookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    let parts = val.split('=');
    service_cookie[parts[0].trim()] = (parts[1] || '').trim();
  });
  return service_cookie;
}
// 不需要登录跳转的路由
// 记得会员点击购买时 需要弹到登录
let noNeedJudge = [
  '/',
  '/news',
  '/news/detail',
  '/contact',
  '/user/forget',
  '/user/login',
  '/user/pw',
  '/user/login/phone',
  '/user/register',
  '/clients',
  '/user/reset',
  '/user/pw',
  '/book',
  '/book/consult',
  '/book/field',
  '/book/appt/service',
  '/book/appt/talks',
  '/book/appt/meeting',
  '/book/appt/question',
  '/book/appt/office',
  '/book/appt/room',
  '/book/appt/service',
  'book/appt/activity',
  '/book/activity',
  '/book/activity/detail',
  '/book/order/talks',
  '/book/order/meeting',
  '/book/order/question',
  '/book/order/office',
  '/book/order/room',
  '/book/order/service',
  '/book/order/activity',
  '/protocol'
];
export default function ({route, store, req, redirect, app}) {
  if (process.server) {
    let cookies = getcookiesInServer(req);
    store.state.token = cookies[authToken] ? cookies[authToken] : '';
    store.state.lang = cookies[lang] ? cookies[lang] : 'cn';
    store.state.webToken = cookies[webToken] ? cookies[webToken] : '';
    let flag = false;
    let url = route.fullPath.split('?')[0]
    noNeedJudge.forEach(item => {
      if (url === item ) {
        flag = true;
      }
    });
    return personinfo().then(res => {
      if (res.code === -1 || res.code === -2) {
        // 没登陆的情况下 会员卡 显示零
        store.state.userInfo = {
          vip_data: {}
        };
        if (!flag) {
          redirect('/user/login');
        }
      } else if (res.code === 200) {
        // 有登录状态 判断是否完善，没完善跳转
        store.state.userInfo = _filterUserInfo(res.data);
        if (!res.data.complete) {
          redirect('/user/replenish');
        }
      }
    });
  }
}
