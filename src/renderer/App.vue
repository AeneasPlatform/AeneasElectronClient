<template>
  <div id="app" class="fill">
    <Loading v-show="showProgressBar"></Loading>
    <router-view v-show="!showProgressBar"/>
  </div>
</template>

<script>
import Loading from './components/Loading'
export default {
  name: 'App',
  components: {
    'Loading': Loading
  },
  beforeCreate () {
    console.log("beforeCreate in App")
    this.$store.commit('initialiseStore')
  },
  computed: {
    showProgressBar () { return !this.$store.state.socket.isConnected }
  }
}
</script>

<style>
#app {
  font-family: "LatoWeb";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="scss">
@import './styles/latofonts.css';
@import './styles/custom-bootstrap.scss';
@import './styles/aeneas.scss';
@import '../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
