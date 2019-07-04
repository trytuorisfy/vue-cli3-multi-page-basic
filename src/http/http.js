import axios from 'axios'
import qs from 'qs'
// Loading
import { Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'https://easy-mock.com/mock/5b7a296e2a67c635a14e910f/example';

// var loadinginstace
// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    //判断下是否需要序列化,先隐藏
    /*
    if (config.method.toLocaleLowerCase() === 'post' 
      || config.method.toLocaleLowerCase() === 'put' 
      || config.method.toLocaleLowerCase() === 'delete') {
      config.data = qs.stringify(config.data)
    }
    */ 
    // loadinginstace = Loading.service({ fullscreen: true })
    if (localStorage.token) { //判断token是否存在
      config.headers.Authorization = localStorage.token;  //将token设置成请求头
    }
    return config;
  },
  error => {
    // loadinginstace.close()
    Message({
      showClose: true,
      message: error,
      type: 'error'
    });
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // loadinginstace.close()
    let data = response.data;
    if(data.code == '200'){
      return data;
      
    }else{
      /*
        let error = new Error(data.description)
        error.data = data;
        error.response = response;
        throw error
      */
      let msg = data.err_msg;
      Message({
        //  饿了么的消息弹窗组件,类似toast
        showClose: true,
        message: msg,
        type: 'error'
      });      
    }
  }, 
  error => {
    // loadinginstace.close()
    // Do something with response error
    //如果是未登录的状态码,则调用getLoginBackUrl()
      if (error && error.response) {
        /*
        switch (error.response.status) {
          case 400:
          error.message = '请求错误'
          break
      
          case 401:
          error.message = '未授权，请登录'
          break
      
          case 403:
          error.message = '拒绝访问'
          break
      
          case 404:
          console.log(404)
          error.message = `请求地址出错: ${error.response.config.url}`
          break
      
          case 408:
          error.message = '请求超时'
          break
      
          case 500:
          error.message = '服务器内部错误'
          break
      
          case 501:
          error.message = '服务未实现'
          break
      
          case 502:
          error.message = '网关错误'
          break
      
          case 503:
          error.message = '服务不可用'
          break
      
          case 504:
          error.message = '网关超时'
          break
      
          case 505:
          error.message = 'HTTP版本不受支持'
          break
      
          default:
        }
        */
        Message({
          showClose: true,
          message: error,
          type: 'error'
        });
      }   
    return Promise.reject(error);
  });

  function getLoginBackUrl(){
    console.log('getLoginBackUrl')
    //计算href需要的字段起始值
    var protocolLen = window.location.protocol.length;
    var hostLen = window.location.host.length;
    var href = window.location.href;

    var startNum = protocolLen + 2 + hostLen + 1;
    var backurl = window.location.href.substring(startNum);
    if(backurl){
        window.location.href = './login.html?backurl='+ backurl;
    }else{
        window.location.href = './login.html';
    }    
  }
export default axios
