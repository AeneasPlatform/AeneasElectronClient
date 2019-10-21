<template>
  <div class="row justify-content-center motto-title">
    <div class="col-sm-5">
      <div class="row justify-content-center" style="margin:20px 0">
        <div class="col">
          <span class="center-block">
            <div class="panel-heading">
              <translate>Verify your seed phrase or</translate>
                <a href="" @click="cancel"><translate> cancel</translate></a>
            </div>
            <div class="panel panel-grey">
              <div class="panel-body" style = "min-height:200px">
                <button class="btn btn-sm btn-outline-light" 
                        @click="unconfirm(word)" 
                        style="margin:10px 10px;" 
                        v-bind:key="word" 
                        v-for="word in checkPassPhrase">
                  <span>{{word}}</span>
                </button>
              </div>
            </div>
          </span>
        </div>
      </div>
      <div v-show="wordsShow" class="row justify-content-center">
        <div class="col" style = "min-height:200px">
          <span class="center-block">
            <button v-show="canShow(word)"
                    @click="clicked(word)" 
                    class="btn btn-sm btn-outline-light"
                    style="margin:10px 10px;" 
                    v-bind:key="word" 
                    v-for="word in confirmationPassPhrase">
              <span>{{word}}</span>
                </button>
          </span>
        </div>
      </div>
      <div class="row justify-content-center" style="margin-top:10px">
        <div class="col-xs-10">
          <span class="center-block">
            <button v-show="nextStep" class="btn btn-lg btn-outline-light" @click="confirm">
              <translate>CONFIRM</translate>
            </button>
            <div class="alert-fixed ">
              <div v-show="errorComparison" class="alert alert-danger ">
                <translate>Wrong phrase, try again.</translate>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import redirect_to from '../redirect_to'

export default {
  name: 'ConfirmPassPhrase',
  data: function () {
    return {
      checkPassPhrase: [],
      nextStep: false,
      errorComparison: false,
      wordsShow: true
    }
  },
  created: function () {
    console.log(['confirm', this.$store.state.signInStore.passPhrase])
  },
  computed: {
    confirmationPassPhrase () {
      return this.$store.state.signInStore.confirmationPassPhrase
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
    clicked: function (word) {
      this.checkPassPhrase.push(word)
      if (this.checkPassPhrase.length == this.confirmationPassPhrase.length) {
        console.log('HURRRA')
        let phrase1 = this.checkPassPhrase.join('')
        let phrase2 = this.$store.state.signInStore.passPhrase.join('')
        if (phrase1 === phrase2) {
          console.log('equals')
          this.nextStep = true
          this.errorComparison = false
          this.wordsShow = false
        } else {
          console.log('non equals')
          this.nextStep = false
          this.errorComparison = true
        }
      } else {
        this.nextStep = false
        this.errorComparison = false
      }
      console.log(word)
    },
    unconfirm: function (word) {
      this.checkPassPhrase = this.checkPassPhrase.filter(elem => elem !== word)
      if (this.checkPassPhrase.length !== this.confirmationPassPhrase.length) {
        this.nextStep = false
        this.errorComparison = false
      }
      console.log(word)
    },
    canShow: function (word) {
      console.log(this.checkPassPhrase.includes(word))
      return !this.checkPassPhrase.includes(word)
    },
    confirm: function () {
    // eslint-disable-next-line no-unused-vars
      var obj = this.$socket.sendObj({msg: {action: 'ConfirmPassPhrase', passphrase: this.checkPassPhrase}})
    },
    cancel: function () {
      this.$socket.sendObj({msg: {action: 'CancelSignUp'}})
      this.$router.push('/account')
      this.$store.commit('step', 0)
    }
  }
}
</script>
