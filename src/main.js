import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker' // 离线缓存
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload' //图片懒加载
import VueI18n from 'vue-i18n' //国际化中英文翻译
import 'element-ui/lib/theme-chalk/index.css'; //element ui
import 'normalize.css/normalize.css' //CSS重置的现代替代方法

import enLocale from 'element-ui/lib/locale/lang/en' //英文包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' //中文包

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueI18n)
Vue.config.lang = 'zh-cn'
Vue.locale('zh-cn', zhLocale)
Vue.locale('en', enLocale)

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')