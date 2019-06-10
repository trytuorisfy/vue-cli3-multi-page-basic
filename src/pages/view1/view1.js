import Vue from 'vue'
import App from './app.vue'
import axios from '../../http/http' //引入配置的http文件

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');