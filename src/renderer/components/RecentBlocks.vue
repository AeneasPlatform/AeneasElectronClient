<template>
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <div class="card" >
                <div class="card-header blocks-header">
                    <translate>Recent blocks</translate>
                </div>
                <div class="card-block blocks horscroll">
                    <table class="table blocksfont">
                        <thead>
                            <tr>
                                <th scope="col"><translate>Height</translate></th>
                                <th scope="col"><translate>ID</translate></th>
                                <th scope="col"><translate>Timestamp</translate></th>
                                <th scope="col"><translate>Generator</translate></th>
                                <th scope="col"><translate>Nonce</translate></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-bind:key="block.id" v-for="block in blocks">
                                <th>{{block.blockHeight}}</th>
                                <th @click="showIt(true)">{{block.id}}</th>
                                <td>{{timeConverter(block.timestamp)}}</td>
                                <td>{{block.address}}</td>
                                <td>{{block.nonce}}</td>
                                <Modal v-bind:txs="block.transactions" v-if="show" @click="showIt(false)" @close="showIt(false)"></Modal>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
     </div>
  </div>
</template>
<script>
import Modal from '@/components/Modal'

export default {
  
  name: 'RecentBlocks',
  props: [ 'showModal' ],
  data() {
    return {
      show: this.showModal
    }
  },
  methods: {
    timeConverter: function (UNIX_timestamp) {
      var a = new Date(UNIX_timestamp)
      var year = a.getFullYear()
      var month = a.getMonth() + 1 < 10 ? '0' + (a.getMonth() + 1) : a.getMonth() + 1
      var date = a.getDate()
      var hour = a.getHours()
      var min = a.getMinutes()
      var sec = a.getSeconds()
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
      return time
    },
    showIt: function (value) {
      this.show = value;
      console.log("NEW VALUE : " + this.show)
    }
  },
  computed: {
    blocks () { return this.$store.state.main.blocks; } 
  }, 
  components: {
    'Modal': Modal
  }
}
</script>
