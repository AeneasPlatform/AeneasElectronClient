<template>
  <tr>
    <th>{{block.blockHeight}}</th>
    <th @click="showIt(block, true)">{{block.id}}</th>
    <td>{{timeConverter(block.timestamp)}}</td>
    <td>{{block.address}}</td>
    <td>{{block.transactions.length}}</td>
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
import { send } from 'q';
export default {
  props: [ 'newBlock', 'showModal' ],
  data() {
    return {
      show:  this.showModal,
      block: this.newBlock
    }
  },
  methods: {
    timeConverter (UNIX_timestamp) {
      const date = new Date(UNIX_timestamp)
      const year = date.getFullYear()
      const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const _date = date.getDate()
      const hour = date.getHours()
      const min = date.getMinutes()
      const sec = date.getSeconds()
      const time = _date + '-' + month + '-' + year+ ' ' + hour + ':' + min + ':' + sec;
      return time;
    },
    parse(blockTx) {
      const parsed = JSON.parse(blockTx);
      const to = parsed.to.filter(x => x.value > 0)[0];
      const amount = to.value;
      let address = to.proposition;
      let newId = parsed.id.toString();
      let sender = parsed.from[0];
      if (sender == null || sender == undefined)
        sender = "Network";
      else sender = sender.proposition;
      return {
        id: newId, 
        address: address,
        amount: amount, 
        sender: sender, 
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

