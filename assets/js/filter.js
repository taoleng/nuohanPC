// 时间戳转换成时间字符串
function _filterDateString(stamp) {
  // 根据时间戳生成的时间对象
  let d = new Date(stamp);
  let date = (d.getFullYear()) + '-' +
    (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-' +
    (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' ' +
    (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' +
    (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' +
    (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
  return date;
}
function _filterDateString2(stamp) {
  // 根据时间戳生成的时间对象
  let d = new Date(stamp);
  let date = (d.getFullYear()) + '年' +
    (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '月' +
    (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + '日' + ' ' +
    (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' +
    (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' +
    (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
  return date;
}
function _filterSecond(msd) {
  // 根据时间戳生成 天 时 分 秒
  var time = msd
  var obj = {
    day: '',
    hours: '',
    minute: '',
    second: ''
  }
  if (null != time && "" != time) {

    if (time > 60 && time < 60 * 60) {
      obj.minute = parseInt(time / 60.0);
      obj.second = parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60);
    }
    else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      obj.hours = parseInt(time / 3600.0);
      obj.minute = parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60);
      obj.second =  parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60)
    } else if (time >= 60 * 60 * 24) {
      obj.day = parseInt(time / 3600.0/24);
      obj.hours = parseInt((parseFloat(time / 3600.0/24)-
        parseInt(time / 3600.0/24))*24)
      obj.minute = parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60)
      obj.second = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60)
    }
    else {
      obj.second = parseInt(time)
    }
  }

  return obj;
}
function _dayFilter(time) {
  time = _filterSecond(time);
  if (time.day) {
    return time.day + '';
  } else if (time.hours) {
    return time.hours + '时';
  } else if (time.minute) {
    return time.minute + '分';
  } else if (time.second) {
    return time.second + '秒';
  }
}
function _filterUserInfo(userInfo) {
  var sexArr = ['未设置', '男', '女'];
  var type = ['', '个人账户', '企业账户']
  userInfo.nickname = userInfo.nickname || '未设置';
  userInfo.sex = sexArr[userInfo.sex];
  userInfo.mobile = userInfo.mobile || '未设置';
  userInfo.weixin = userInfo.weixin || '未设置';
  userInfo.skype = userInfo.skype || '未设置';
  userInfo.type = type[userInfo.type];
  userInfo.vip_data.meeting_room = userInfo.vip_data.meeting_room && _dayFilter(userInfo.vip_data.meeting_room - userInfo.timestamp);
  // userInfo.vip_data.service = userInfo.vip_data.service && _dayFilter(userInfo.vip_data.service - userInfo.timestamp)
  // userInfo.vip_data.legal = userInfo.vip_data.legal && _dayFilter(userInfo.vip_data.legal - userInfo.timestamp)
  // userInfo.vip_data.tax = userInfo.vip_data.tax && _dayFilter(userInfo.vip_data.tax - userInfo.timestamp)
  return userInfo;
}
export {
  _filterDateString,
  _filterUserInfo,
  _filterSecond,
  _filterDateString2
}
