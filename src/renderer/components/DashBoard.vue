<template>
  <div class="dashboard-bg">
    <Navbar></Navbar>
    <div class="container fill">
        <WalletInfo></WalletInfo>
        <b-tabs style="margin-top:20px" v-show="!showSendAsh">
            <b-tab title="blocks" active>
                <RecentBlocks></RecentBlocks>
            </b-tab>
            <b-tab title="transactions">
                <RecentTransactions></RecentTransactions>
            </b-tab>
        </b-tabs>
        <SendAshForm v-show="showSendAsh"></SendAshForm>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import WalletInfo from '@/components/WalletInfo'
import RecentTransactions from '@/components/RecentTransactions'
import RecentBlocks from '@/components/RecentBlocks'
import SendAshForm from '@/components/SendAshForm'

export default {
  name: 'DashBoard',
  components: {
    'Navbar': Navbar,
    'WalletInfo': WalletInfo,
    'RecentBlocks': RecentBlocks,
    'RecentTransactions': RecentTransactions,
    'SendAshForm': SendAshForm
  },
  computed: {
    seed () { return this.$store.state.main.seed },
    logged () {
      return this.$store.state.main.logged
    },
    showSendAsh () { return this.$store.state.main.showSendAsh }
  },
  created: function () {
    if (!this.$store.state.main.logged) {
      this.$router.push('/account')
    } else {
      this.$router.push('/dashboard')
      this.$store.commit('login')
      console.log('logged')
      var obj = this
      setTimeout(() => {
        console.log('GetSavedSeeds: ok')
        obj.$socket.sendObj({msg: {action: 'GetSeedWithAddress', publicSeed: obj.$store.state.main.seed.seed}})
      }, 1000)
    }
  },
  methods: {
    importAccount () {

    }
  }
}
</script>
