<template>
    <div class="ae-enter-page h-100 mh-100">
       <div class="gradient">
        <div class="container fill">
            <div class="row">
                <div class="col text-center">
                    <h1 class="logotype"><a name="logo">&nbsp;</a></h1>
                </div>
            </div>
            <div class="row client-title">
                <div class="col-sm-12 text-center">
                    <translate>Aeneas Sanctum Client. Version</translate> 1.3
                </div>
            </div>
            <div class="row motto-title">
                <div class="col text-center">
                    WORK HARD AND SUCCEED
                </div>
            </div>
            <router-view/>
            <div class="row motto-title">
                <div class="col text-center">
                    <translate>Select language</translate>
                    <b-dropdown name="language" id="lang" v-model="$language.current" class="m-md-2 ae-dropdown" :text="$language.available[$language.current]" >
                        <b-dropdown-item v-on:click="$language.current=key" v-bind:key="(language, key)" v-for="(language, key) in $language.available" :value="key">{{ language }}</b-dropdown-item>
                    </b-dropdown>
                </div>
                <div class="alert-fixed ">
                    <div v-show="showError" class="alert alert-danger ">
                        {{errorMsg}}
                    </div>
                </div>
            </div>
        </div>
       </div>
    </div>
</template>
<script>
import redirect_to from '../redirect_to'

console.log('start view')

export default {
  name: 'Start',
  computed: {
    errorMsg () {
      return this.$store.state.main.appErrorMsg
    },
    showError () {
      return this.$store.state.main.appErrorMsgShow
    },
    step () {
      return this.$store.state.signInStore.step
    },
    fetcherRun () {
      return this.$store.state.main.fetcherRun
    }
  },
  created: function () {
    console.log('logged:' + this.$store.state.main.logged)
    if (this.$store.state.main.logged) { this.$router.push('/dashboard') } else {
      if (this.$store.state.signInStore.passPhrase.length == 0) { this.$router.push('/account') } else {
        var step = this.$store.state.signInStore.step
        console.log('step:' + step)
        redirect_to(this.$router, step)
      }
    }
    this.fetchSeed()
  },
  methods: {
    fetchSeed: function () {
      console.log('fetch seeds')
      setTimeout(() => {
        this.$socket.sendObj({msg: {action: 'GetSavedSeeds'}})
      }, 1000)
      if (!this.fetcherRun) {
        this.$store.commit('fetcher', true)
        setInterval(() => {
          this.$socket.sendObj({msg: {action: 'GetSavedSeeds'}})
        }, 10000)
      }
    }
  }
}

</script>
