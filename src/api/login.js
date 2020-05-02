import service from "@/utils/request.js";
/**
 * 获取验证码
 */
export function GetSms(data){
  service.request({
    method: 'post',
    url: '/getSms/',
    data //es6写法   普通为： data:data 左边data是变量名（key）后台接受的，右边的data是接收的参数，如果两者名字相同，则可简写
  });
}