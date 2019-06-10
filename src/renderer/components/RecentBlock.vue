<template>
  <tr>
    <th>{{block.blockHeight}}</th>
    <th @click="showIt(block, true)">{{block.id}}</th>
    <td>{{timeConverter(block.timestamp)}}</td>
    <td>{{block.address}}</td>
    <td>{{block.transactions.length}}</td>
    <td>{{block.nonce}}</td>
    <Modal v-bind:header="block.id"
           v-bind:transactions="this.parseTransactions(block.transactions, block.id)" 
           v-if="show" 
           @close="showIt(block, false)">
    </Modal>
  </tr>
</template>

<script>
import Modal from '@/components/Modal'
import { send } from 'q';
import timeConverter from '@/components/timeFormat.js';

export default {
  props: [ 'newBlock', 'showModal' ],
  data() {
    return {
      show:  this.showModal,
      block: this.newBlock
    }
  },
  methods: {
    timeConverter : (time) => timeConverter (time),
    parse(blockTx, blockId) {
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
        blockId: blockId,
        id: newId, 
        address: address,
        amount: amount, 
        sender: sender, 
        timestamp: parsed.timestamp
      }
    },
    parseTransactions(transactions, blockId) {
      const result = [];
      for(let i = 0; i < transactions.length; ++i) {
        result.push(this.parse(transactions[i], blockId));
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

