<template>
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <div class="card" >
                <div class="card-header blocks-header">
                    <!--<translate>Recent transactions</translate>-->
                    <translate>Recent transactions</translate>
                </div>
                <div class="card-block blocks">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"><translate>Transaction ID</translate></th>
                            <th scope="col"><translate>Account</translate></th>
                            <th scope="col"><translate>Amount</translate></th>
                            <th scope="col"><translate>Fee</translate></th>
                            <th scope="col"><translate>Timestamp</translate></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-bind:key="tx.id" v-for="tx in transactions">
                            <td>{{tx.id}}</td>
                            <td>{{tx.account}}</td>
                            <td>{{tx.amount}}</td>
                            <td>{{tx.fee}}</td>
                            <td>{{tx.timestamp}}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'RecentTransactions',
  methods: {
  },
  computed: {
    transactions () {
      return this.$store.state.main.transactions
    }
  }
}
</script>
