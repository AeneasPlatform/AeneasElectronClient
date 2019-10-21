<template>
  	  <div class="row justify-content-center motto-title">
            <div class="col-sm-5">
                <div class="row justify-content-center">
                    <div class="col">
                        <a class="copy-btn" v-clipboard:copy="passPhraseCopy" v-clipboard:success="copySucess" v-clipboard:error="copyError">
                            <span></span>
                        </a>
                        <div class="block-selection" style="display:inline-block;margin:0 10px;" v-bind:key="word" v-for="word in passPhrase">
                            <h5>
                                <span class="badge badge-grey badge-light">
                                    {{word}}
                                </span>
                            </h5>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center" style="margin-top:20px">
                    <div class="col-xs-10 text-center">
                        <span class="center-block">
                            <button type="button" v-show="phraseCopied" class="btn btn-outline-light ae-border" @click="copied">
                                <translate>I've written it down</translate>
                            </button>
                        </span>
                        <b-button type="button" variant="default" @click="cancel" class="btn btn-outline-light ae-border"><translate>CANCEL</translate></b-button>
                    </div>
                </div>
            </div>
  	  </div>
</template>
<script>
import redirect_to from '../redirect_to'

export default {
  name: 'AcceptPassPhrase',
  data: function () {
    return {
      showTips: false,
      arialabel: 'Copied!',
      phraseCopied: false
    }
  },
  created: function () {
    console.log('logged:' + this.$store.state.main.logged)
    console.log('created!')
  },
  computed: {
    passPhrase () {
      console.log(this.$store.state.signInStore.passPhrase)
      return this.$store.state.signInStore.passPhrase
    },
    passPhraseCopy () {
      return this.$store.state.signInStore.passPhrase.join(' ')
    },
    step () {
      return this.$store.state.signInStore.step
    }
  },
  /*watch: {
    step (newValue) {
      console.log('SUCH WOW' + newValue)
      redirect_to(this.$router, newValue)
    }
  },*/
  methods: {
    copySucess: function () {
      this.arialabel = 'Copied!'
      this.showTips = true
      this.phraseCopied = true
      console.log('copy sucess')
    },
    copyError: function () {
      console.log('copy error')
      this.showTips = true
      this.arialabel = fallbackMessage()
    },
    handlerL: function () {
      this.showTips = false
    },
    copied: function () {
      this.$socket.sendObj({msg: {action: 'PassPhraseSaved'}})
    },
    cancel: function () {
      this.$socket.sendObj({msg: {action: 'CancelSignUp'}})
      this.$router.push('/account')
      this.$store.commit('step', 0)
    }
  }
}

function fallbackMessage (action) {
  let actionMsg = ''
  let actionKey = (action === 'cut' ? 'X' : 'C')

  if (/iPhone|iPad/i.test(navigator.userAgent)) {
    actionMsg = 'No support :('
  } else if (/Mac/i.test(navigator.userAgent)) {
    actionMsg = 'Press ⌘-' + actionKey + ' to ' + action
  } else {
    actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action
  }

  return actionMsg
}
</script>
