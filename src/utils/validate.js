/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}
/**
 * 验证用户名
 */
export function validateEmail(value){
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return !reg.test(value) ? true : false;
}
/**
 * 验证密码
 */
export function validatePass(value){
  let reg = /^(?!\D+$)(?![^A-Za-z]+$)\S{6,20}$/;
  return !reg.test(value) ? true : false;
}
/**
 * 验证验证码
 */
export function validateVcode(value){
  let reg = /^[A-Za-z0-9_]{6}$/;
  return !reg.test(value) ? true : false;
}