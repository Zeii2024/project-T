import App from './App'
import store from './store'
import plugin from './js_sdk/uni-admin/plugin'
import messages from './i18n/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import ViewUIPlus from 'view-ui-plus'
// import 'view-ui-plus/dist/styles/viewuiplus.css'

const lang = uni.getLocale()
// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(ElementUI)
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
	locale: lang, // 设置地区
	messages, // 设置地区信息
})
Vue.use(plugin)
App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	createI18n
} from 'vue-i18n'
export function createApp() {
	const app = createSSRApp(App)
	const i18n = createI18n({
		locale: lang,
		messages
	})
	app.use(i18n)
	app.use(plugin)
	app.use(store)
	app.use(ElementUI)
	app.mount("#app")
	return {
		app
	}
}
// #endif