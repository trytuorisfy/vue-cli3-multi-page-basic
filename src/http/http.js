import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 10000
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
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    let data = response.data;
    if(data.code == '200'){
      return data;
    }else{
      let error = new Error(data.description)

      error.data = data;
      error.response = response;

      throw error
    }
  }, 
  error => {
    console.log('error 区域')
    // Do something with response error
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
        document.getElementById('alert-msg').style.display = 'block';
        document.getElementById('alert-msg').innerHtml = '请求失败,请重试';
        setTimeout(() => {
          document.getElementById('alert-msg').style.display = 'none';
          document.getElementById('alert-msg').innerHtml = '';          
        },2000)
      }   
    return Promise.reject(error);
  });

export default axios
