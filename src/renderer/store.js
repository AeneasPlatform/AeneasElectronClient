/* eslint-disable no-undef,no-multi-spaces */
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookie from 'vue-cookie'
// import redirect_to from './redirect_to'
// import Queue from './queue'
import {BigNumber} from 'bignumber.js'

Vue.use(Vuex)
Vue.use(VueCookie)

let moduleMainStore = {
  state: {
    appErrorMsg: '',
    appErrorMsgShow: false,
    exp: new BigNumber(10).pow(8),
    logged: false,
    height: 0,
    peers:[],
    balance: 0,             // but BigNumber
    unconfirmedBalance: 0,  // but BigNumber
    fullBalance: 0,         // but BigNumber
    showSendAsh: false,
    seed: {}, // TODO add private key for sending messages
    blocks: [],
    balances : [],
    transactions: [],
    lastBlockSearch : {}
  },
  mutations: {
    login (state) {
      state.logged = true
    },
    height (state, h) {
      state.height = h
    },
    peers (state, p) {
      state.peers = p
    },
    balance (state, b) {
      let newBalance = new BigNumber(b)
      state.balance = newBalance
    },
    unconfirmedBalance (state, b) {
      state.unconfirmedBalance = new BigNumber(b).dividedBy(state.exp)
    },
    fullBalance (state, b) {
      let newBalance = new BigNumber(b)
      state.fullBalance = newBalance
    },
    transactions (state, transactions) {
      state.transactions = transactions
    },
    logout (state) {
      state.logged = false
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
    },
    lastSearch (state, obj) {
      /*          if (state.blocks === undefined) state.blocks = new Queue (2)
          console.log (state.blocks) */
      state.lastBlockSearch = obj
    },
    setBalances(state, arrBalance){
      state.balances = arrBalance
      console.log ([state.balances, arrBalance])
    },
    mergeBlocks (state, blocks) {
      console.log('merging blocks')
      state.blocks = merge(state.blocks, blocks, 'id').sort(function (a, b) {
        return a.height > b.height ? -1 : (a.height < b.height ? 1 : 0)
      }).reverse()
    },
    // mergeTransactions (state, transactions) {
    //   console.log('merging transactions')
    //   // TODO: cut recent transactions to 50 items. (flystyle)
    //   state.transactions = merge(state.transactions, transactions, 'id').sort((a, b) => {
    //     return a.timestamp > b.timestamp ? -1 : (a.timestamp < b.timestamp ? 1 : 0)
    //   }).reverse()
    // }
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
      console.log (seeds)
      state.allSeeds = seeds
    },
    step (state, value) {
      state.step = value
    },
    fetcher (state, value) {
      console.log ("FETCHER CALLED  ")
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
    getRoute: state => state.route,
    getFetcher: state => state.fetcherRun
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
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
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
      console.log(["Your seed", message])
      context.commit('step', 3)
      context.commit('seed', {seed: message.seed, address: ''})
      context.commit('route', 'setpwd')
    },
    PwdConfirmed (context, message) {
      console.log(message)
      context.commit('step', 4)
      // context.commit ("seed", message.seed)
      context.commit('login')
      context.commit('clearmined')
      console.log(context)
    },
    Balances (context, message){
      console.log (['WOW balances', message.balances])
      context.commit('setBalances', message.balances)
    },
    ReturnSeedWithAddress (context, message){
    },
    ReturnPowBlock (context, message){
      console.log (['ReturnPowBlock', message])
      context.commit("addmined", message)
    },
    SearchPowBlock (context, message){
      console.log (['SearchPowBlock', message])
      context.commit("lastSearch", message.pb)
    },
    SavedSeeds (context, message) {
      console.log('WOW SavedSeeds')
      context.commit('allSeeds', message.seeds)
      context.commit('height', message.height)
      context.commit('balance', message.balance.available)
      context.commit('fullBalance', message.balance.available + message.balance.unconfirmed)
      context.commit('unconfirmedBalance', message.balance.unconfirmed)
      context.commit('mergeBlocks', message.lastBlocks)
      context.commit('peers', message.peers)
      console.log ([message.loggedIn, context.getters.getStep])
      if (message.loggedIn === false && context.getters.getStep === 4) {
        console.log('logout')
        context.commit('logout')
        context.commit('step', 0)
        location.reload()
      }
    },
    AddressBalance(context, message) {
      console.log('User transactions incoming')
      context.commit('transactions', processTransactions(message.balance))
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

function processTransactions(data) {
  // data = JSON.parse(data)
  const transactions = [];
  console.log(data.txs);
  for(let tx = 0; tx < data.txs.length; ++tx) {
    let from = data.txs[tx].from === undefined || data.txs[tx].from === null? "Network" : data.txs[tx].from
    transactions.push({
      blockId: data.txs[tx].blockid,
      id: data.txs[tx].txid, 
      address: data.txs[tx].to,
      amount: data.txs[tx].value, 
      sender: from, 
      timestamp: data.txs[tx].timestamp
    });
  }
  return transactions;
}

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  Vue.cookie.set('storage', JSON.stringify(state), {expires: 3, domain: 'localhost'})
})

export default store
