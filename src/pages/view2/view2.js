import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue'
import $ from 'jquery'
import '@/assets/css/base.css'

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
    render: h => h(App)
}).$mount('#app');