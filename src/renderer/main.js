// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import GetTextPlugin from 'vue-gettext'
import App from './App'
import router from './router'
import translations from './translations.json'
import VueNativeSock from 'vue-native-websocket'
import VueClipboard from 'vue-clipboard2'
import store from './store'
import redirect_to from './redirect_to'

/** bootstrap vue components */
import {Modal} from 'bootstrap-vue/es/components'
import {Navbar} from 'bootstrap-vue/es/components'
import {Dropdown} from 'bootstrap-vue/es/components'
import {Form, FormInput, FormTextarea, InputGroup, FormGroup, Button, Tabs} from 'bootstrap-vue/es/components'

Vue.use(Modal)
Vue.use(Navbar)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(FormInput)
Vue.use(InputGroup)
Vue.use(FormTextarea)
Vue.use(FormGroup)
Vue.use(Button)
Vue.use(Tabs)

Vue.use(VueClipboard)

Vue.use(VueNativeSock, 'ws://localhost:9085/aeneas', {
  store: store,
  format: 'json',
  reconnection: true,
  // reconnectionAttempts: 5,
  reconnectionDelay: 5000
})

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
  translations: translations,
  silent: true
})

Vue.config.productionTip = false

const errorMsgs = [
  // $gettext("")
]

/* eslint-disable no-new */
let vue = new Vue({
  el: '#app',
  router,
  store,

  components: { App },
  template: '<App/>'
})

let getErrorMsg = function (msg) {
  let m = vue.__proto__.$gettext(msg)
  store.commit('appErrorMsg', m)
  return m
}
