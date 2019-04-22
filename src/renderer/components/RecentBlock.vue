<template>
  <tr>
    <th>{{block.blockHeight}}</th>
    <th @click="showIt(block, true)">{{block.id}}</th>
    <td>{{timeConverter(block.timestamp)}}</td>
    <td>{{block.address}}</td>
    <td>{{block.nonce}}</td>
    <Modal v-bind:blockId="block.id"
           v-bind:transactions="this.parseTransactions(block.transactions)" 
           v-if="show" 
           @close="showIt(block, false)">
    </Modal>
  </tr>
</template>

<script>
import Modal from '@/components/Modal'
export default {
  props: [ 'newBlock', 'showModal' ],
  data() {
    return {
      show:  this.showModal,
      block: this.newBlock
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
    parse(blockTx) {
      const parsed = JSON.parse(blockTx);
      const amount = parsed.to[0].value;
      let address = parsed.to[0].proposition;
      let newId = parsed.id.toString();
      address = address.substring(address.length - 6);
      newId = newId.substring(newId.length - 7);
      return {
        id: newId, 
        address: address,
        amount: amount, 
        timestamp: this.timeConverter(parsed.timestamp)
      }
    },
    parseTransactions(transactions) {
      const result = [];
      for(let i = 0; i < transactions.length; ++i) {
        result.push(this.parse(transactions[i]));
      }
      return result;
    },
    showIt(block, newValue) {
      this.show = newValue;
      console.log("NEW VALUE : " + newValue);
    }
  },
  components: {
    'Modal': Modal
  }
}
</script>

