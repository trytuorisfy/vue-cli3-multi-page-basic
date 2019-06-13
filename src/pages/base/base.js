import Vue from 'vue'
import App from './app.vue'
import '@/assets/css/base.css'

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');