// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
console.log("in main.js entry")

import Vue from 'vue'

import GetTextPlugin from 'vue-gettext'
import App from './App'
import router from './router'
import translations from './translations.json'
import VueNativeSock from 'vue-native-websocket'
import VueClipboard from 'vue-clipboard2'
import store from './store'
import redirect_to from './redirect_to'

// Vue.use(BootstrapVue);
/** bootstrap vue components */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import VueTabs from 'vue-nav-tabs/dist/vue-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
Vue.use(VueTabs)

Vue.use(VueClipboard)

Vue.use(VueNativeSock, 'ws://localhost:9085/aeneas', {
    store: store,
    format: 'json',
    reconnection: true,
    // reconnectionAttempts: 5,
    reconnectionDelay: 5000
})

console.log("in main.js before GetTextPlugin")

Vue.use(GetTextPlugin, {
    translations: translations,
    availableLanguages: {
        en_US: 'English',
        uk_UA: 'Українська',
        ru_RU: 'Русский'
    },
    defaultLanguage: 'en_US',
    languageVmMixin: {
        computed: {
            currentKebabCase: function () {
                return this.current.toLowerCase().replace('_', '-')
            }
        }
    },
    silent: true
})

console.log("in main.js before Vue.config.productionTip = false")

Vue.config.productionTip = false

const errorMsgs = [
    // $gettext("")
]

console.log("in main.js before let vue = new Vue({")

/* eslint-disable no-new */
let vue = new Vue({
    el: '#app',
    router,
    store,

    components: {App},
    template: '<App/>'
}).$mount()

let getErrorMsg = function (msg) {
    let m = vue.__proto__.$gettext(msg)
    store.commit('appErrorMsg', m)
    return m
}

console.log("in main.js after all")