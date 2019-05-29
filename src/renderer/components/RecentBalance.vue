<template>
  <tr>
    <td @click="showIt(balance, true)">{{balance.addr}}</td>
    <td>{{balance.balance.available}}</td>
    <td>{{balance.blocksCount}}</td>
    <td>{{balance.txsInCount}}</td>
    <td>{{balance.txsOutCount}}</td>
    <Modal v-bind:accId="balance.addr"
           v-bind:transactions="transactions"
           v-if="show" 
           @close="showIt(balance, false)">
    </Modal>
  </tr>
</template>

<script>
import Modal from '@/components/Modal'
import { send } from 'q';
export default {
  name: "RecentBalance",
  props: [ 'showModal', 'newBalance' ],
  data() {
    return {
      show: this.showModal,
      balance: this.newBalance
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
    showIt(balance, newValue) {
      this.show = newValue;
      console.log("NEW VALUE : " + newValue);
      if (this.show) {
        this.$socket.sendObj({msg: {
          action: 'GetAddressBalance',
          address: balance.addr
        }});
      }
    }
  },
  computed: {
    transactions() {
      return this.$store.state.main.transactions;
    }
  },
  components: {
    'Modal': Modal
  }
}
</script>

