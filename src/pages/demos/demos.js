import Vue from 'vue'
import App from './app.vue'
import '@/assets/css/base.less'
import axios from '../../http/http' //引入配置的http文件
import '@/assets/iconfont/iconfont.css';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');