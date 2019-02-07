<template>
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <div class="card" >
                <div class="card-header blocks-header">
                    <!--<translate>Recent transactions</translate>-->
                    <translate>Balances</translate>
                </div>
                <div class="card-block blocks">
                    <b-button type="button" variant="default" @click="loadBalances" class="btn btn-outline-dark ae-border">
                        <translate>LOAD BALANCES</translate>
                    </b-button>
                    {{balances}}
                </div>
                <div class="card-block blocks horscroll">
                    <table class="table blocksfont">
                        <thead>
                            <tr>
                                <th @click="sort('addr')" scope="col"><translate>Addres</translate></th>
                                <th scope="col"><translate>Balance</translate></th>
                                <th @click="sort('blocksCount')" scope="col"><translate>Blocks count</translate></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-bind:key="b.addr" v-for="b in balances">
                                <td>{{b.addr}}</td>
                                <td>{{b.balance.available}}</td>
                                <td>{{b.blocksCount}}</td>
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
  name: 'RecentBalances',
  data: function (){ return {
        currentSort:'name',
        currentSortDir:'asc'
    }
  },  
  methods: {
    loadBalances () {
        this.$socket.sendObj({msg: {action: 'GetBalances'}})
    } ,
    sort:function(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
    }
  },
  computed: {
    blocks () { return this.$store.state.main.blocks },
    balances () { 
        if (this.$store.state.main.balances != undefined){
         return this.$store.state.main.balances.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
         }); 
        }else return []
    },
  }
}
</script>
