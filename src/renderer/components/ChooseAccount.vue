<template>
  	  <div class="row justify-content-center motto-title">
            <div class="col-sm-5">
                <div class="row justify-content-center">
                    <div class=" col-lg-5 col-md-6 col-xs-8 text-center">
                        <div class="ae-glyph"></div>
                        <translate class="dashboard-c-light">ACCOUNTS</translate>
                        <div class="ae-glyph"></div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-14 text-center">
                        <div class="seed ae-monospace" @click="clicked(seed)" v-bind:key="seed.address" v-for="seed in allSeeds">{{seed.address}}</div>
                    </div>
                </div>
                <div class="row justify-content-center" style="margin-top:20px;">
                    <div class="col-md-14 text-center">
                        <button type="button" class="btn btn-outline-light ae-border" @click="importAccount">
                            <translate>IMPORT ACCOUNT</translate>
                        </button>
                        <div style="display:inline-block; width:5px">&nbsp;</div>
                        <button type="button" class="btn btn-outline-light ae-border" @click="newAccount">
                            <translate>NEW ACCOUNT</translate>
                        </button>

                    </div>
                </div>
            </div>
  	  </div>
</template>
<script>
import redirect_to from '../redirect_to'

export default {
  name: 'ChooseAccount',
  created: function () {
    console.log('ChooseAccount logged:' + this.$store.state.main.logged)
    console.log('ChooseAccount created!')
  },
  computed: {
    step () {
      return this.$store.state.signInStore.step
    },
    allSeeds () {
      return this.$store.state.signInStore.allSeeds
    }
  },
  watch: {
    step (newValue) {
      console.log('SUCH WOW' + newValue)
      redirect_to(this.$router, newValue)
    }
  },
  methods: {
    newAccount () {
      console.log('new Account')
      this.$socket.sendObj({msg: {action: 'Signup'}})
    },
    importAccount () {
      // this.$socket.sendObj({msg:{action:"Signup"}})
      this.$router.push('/import')
    },
    clicked (seed) {
      // this.$store.commit ("step", 11)//go to Login
      this.$store.commit('seed', seed)// go to Login
      this.$router.push('/login')
    }
  }
}
</script>
