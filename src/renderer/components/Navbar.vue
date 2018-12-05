<template>
    <b-navbar toggleable="md" class="navbar-expand-lg navbar-inverse dashboard-header">
        <b-navbar-brand class="navbar-brand" href="#"><div class="logo">&nbsp;</div></b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item href="#" @click="hideSendAsh">
                    <span class="icon_db"></span>
                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#" style="margin-right:20px" @click="showSendAsh">
                    <span class="send_icon dashboard-c-light">
                        <translate>Send ASH</translate>
                    </span>
                </b-nav-item>
                <b-nav-item><span class="dashboard-c-light">{{Account}}</span></b-nav-item>
                <b-nav-item-dropdown right no-caret>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <span class="user_icon"></span>
                    </template>
                    <!--<b-dropdown-item href="#">12</b-dropdown-item>
                    <b-dropdown-item href="#">23</b-dropdown-item>-->
                </b-nav-item-dropdown>
                <b-nav-item href="#" v-b-modal.modalout><span class="logout_icon"></span></b-nav-item>
                <b-modal id="modalout" title="" @ok="logout">
                    <p class="my-4"><translate>Are you sure you want to logout?</translate></p>
                </b-modal>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>
<script>
import collapse from 'bootstrap-vue/es/components/collapse/collapse'
import toggle from 'bootstrap-vue/es/directives/toggle/toggle'

export default {
  name: 'Navbar',
  components: {
    'b-collapse': collapse
  },
  directives: {
    'b-toggle': toggle
  },
  data: function () {
    return {
      Account: ''// "Account Name"
    }
  },
  computed: {
    seed () { return this.$store.state.main.seed }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$store.commit('step', 0)
      this.$router.push('/')
      this.$socket.sendObj({msg: {action: 'Logout', seed: this.seed ? this.seed.seed : ''}})
    },
    showSendAsh () {
      this.$store.commit('showSendAsh', true)
    },
    hideSendAsh () {
      this.$store.commit('showSendAsh', false)
    }

  }
}
</script>
