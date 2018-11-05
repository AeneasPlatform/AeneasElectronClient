import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
import redirect_to from './redirect_to'
import Queue from './queue'

Vue.use(Vuex)
Vue.use(VueCookie)

const moduleMainStore = {
  state: {
    logged: false,
    height: 0,
    balance: 0,
    unconfirmedBalance: 0,
    seed: {}, // TODO add private key for sending messages
    appErrorMsg: '',
    appErrorMsgShow: false,
    blocks: [],
    showSendAsh: false,
    exp: 10000000
  },
  mutations: {
    login (state) {
      state.logged = true
    },
    height (state, h) {
      state.height = h
    },
    balance (state, b) {
      state.balance = b
    },
    unconfirmedBalance (state, b) {
      state.unconfirmedBalance = b
    },
    logout (state) {
      state.logged = false,
      state.step = 0
    },
    seed (state, seed) {
      state.seed = seed
    },
    sendErrorNotification (state, msg) {
      state.appErrorMsg = msg
      state.appErrorMsgShow = true
      setTimeout(() => { state.appErrorMsgShow = false }, 5000)
    },
    showSendAsh (state, value) {
      console.log('show:' + value)
      state.showSendAsh = value
    },
    clearmined (state, obj) {
      state.blocks = []
    },
    addmined (state, obj) {
      /*          if (state.blocks === undefined) state.blocks = new Queue (2)
          console.log (state.blocks) */
      var b = Array.from(state.blocks)
      b.unshift(obj)
      if (b.length > 20) b.pop()
      state.blocks = b
    }
  }
}

const moduleSignInStore = {
  state: {
    passPhrase: [],
    startSignIn: false,
    confirmationPassPhrase: [],
    step: 0,
    route: '',
    fetcherRun: false,
    allSeeds: []
  },
  mutations: {
    newAccount (state) {
      state.startSignIn = true
    },
    passPhrase (state, passPhrase) {
      state.passPhrase = passPhrase
    },
    confirmationPassPhrase (state, passPhrase) {
      state.confirmationPassPhrase = passPhrase
    },
    allSeeds (state, seeds) {
      state.allSeeds = seeds
    },
    step (state, value) {
      state.step = value
    },
    fetcher (state, value) {
      state.fetcherRun = value
    },
    route (state, value) {
      console.log('value:' + value)
      if (value === '' || value == undefined) {
        state.route = '/'
      } else {
        state.route = value
      }
    }
  },
  getters: {
    getStep: state => state.step,
    getRoute: state => state.route
  }
}

const store = new Vuex.Store({
  modules: {
    signInStore: moduleSignInStore,
    main: moduleMainStore
  },
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    }
  },
  mutations: {
    SOCKET_ONOPEN (state, event) {
      state.socket.isConnected = true
      console.log(['state.socket.isConnected', state.socket.isConnected])
    },
    SOCKET_ONCLOSE (state, event) {
      state.socket.isConnected = false
      console.log(['state.socket.isConnected', state.socket.isConnected])
    },
    SOCKET_ONERROR (state, event) {
      console.error(state, event)
      console.log(['state.socket.isConnected', state.socket.isConnected])
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message) {
      console.log(message)
      state.message = message
    },
    initialiseStore (state) {
      if (Vue.cookie.get('storage')) {
        this.replaceState(
          Object.assign(state, JSON.parse(Vue.cookie.get('storage')))
        )
      }
    }
  },
  actions: {
    ErrorResponse (context, message) {
      console.log(message)
      context.commit('sendErrorNotification', message.msg)
    },
    Logout (context, message) {
      // TODO
    },
    PassPhrase (context, message) {
      console.log(message)
      context.commit('passPhrase', message.phrase)
      context.commit('step', 1)
      context.commit('route', 'accept')
    },
    ConfirmationPassPhrase (context, message) {
      console.log(message)
      context.commit('confirmationPassPhrase', message.phrase)
      context.commit('step', 2)
      context.commit('route', 'confirm')
    },
    Seed (context, message) {
      console.log(message)
      context.commit('step', 3)
      context.commit('seed', {seed: message.seed, address: ''})
    },
    PwdConfirmed (context, message) {
      console.log(message)
      context.commit('step', 4)
      // context.commit ("seed", message.seed)
      context.commit('login')
      context.commit('clearmined')
      console.log(context)
    },
    SavedSeeds (context, message) {
      console.log('WOW SavedSeeds')
      console.log(message)
      context.commit('allSeeds', message.seeds)
      context.commit('height', message.height)
      context.commit('balance', message.balance)
      context.commit('unconfirmedBalance', message.unconfirmedBalance)
      if (message.loggedIn === false && context.state.step === 4) {
        console.log('logout')
        context.commit('logout')
        context.commit('step', 0)
        location.reload()
      }
    },
    ReturnPowBlock (context, message) {
      console.log('WOW mined block!')
      console.log(message)
      context.commit('addmined', message)
    },
    ReturnSeedWithAddress (context, message) {
      console.log('WOW ReturnSeedWithAddress!')
      console.log(message)
      context.commit('seed', message.seed)
    }
  }
})

function merge (a, b, prop) {
  var reduced = a.filter(function (aitem) {
    return !b.find(function (bitem) {
      return aitem[prop] === bitem[prop]
    })
  })
  return reduced.concat(b)
}

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  Vue.cookie.set('storage', JSON.stringify(state), {expires: 3, domain: 'localhost'})
})

export default store
