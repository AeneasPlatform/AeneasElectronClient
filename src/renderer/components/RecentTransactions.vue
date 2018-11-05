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
                        <th scope="col"><translate>Height</translate></th>
                        <th scope="col"><translate>Date</translate></th>
                        <th scope="col"><span class="icon_envelope"></span></th>
                        <th scope="col"><translate>Type</translate></th>
                        <th scope="col"><translate>Account</translate></th>
                        <th scope="col"><translate>Amount</translate></th>
                        <th scope="col"><translate>Fee</translate></th>
                        <th scope="col"><translate>Balance</translate></th>
                        <th scope="col"><translate>Confirm</translate></th>
                    </tr>
                </thead>
                <tbody>
                    <!--<tr v-bind:key="tx.id" v-for="tx in transactions">
                        <td>{{tx}}</td>
                        <td>{{tx}}</td>
                        <td>{{tx}}</td>
                        <td>{{tx}}</td>
                        <td>{{tx}}</td>
                        <td>{{tx}}</td>
                        <td>{{tx}}</td>
                        <td>{{tx}}</td>
                        <td>{{tx}}</td>
                        <td>{{tx}}</td>
                    </tr>-->
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
    blocks () {
      return this.$store.state.main.blocks
    }
  }
}
</script>
