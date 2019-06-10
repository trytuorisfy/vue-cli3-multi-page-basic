import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 10000
// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    //判断下是否需要序列号,先隐藏
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
    // Do something with response data
    if(response.data.success){
      return response.data.data
    }else{
      console.log('aaa')
      // window.location.href = './home.html'
    }

    // return response; //原来
  }, 
  error => {
    // Do something with response error
      if (error && error.response) {
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
      }   
    return Promise.reject(error);
  });

export default axios
